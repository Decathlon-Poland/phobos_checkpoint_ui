import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  REQUEST_FAILURE_COUNT,
  RECEIVE_FAILURE_COUNT,
  REQUEST_FAILURE_COUNT_FAILED
} from 'actions'

import { fetchFailureCount } from 'actions/dashboard/failure-count'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/dashboard/failure-count', () => {
  describe('#fetchFailureCount', () => {
    describe('when it succeeds', () => {
      let apiResponse, store
      beforeEach(() => {
        apiResponse = { count: 7 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: '/api/v1/failures/count' })
          .response(apiResponse)
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(fetchFailureCount()).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_COUNT })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURE_COUNT, data: apiResponse })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('when it fails', () => {
      it('creates REQUEST and REQUEST_FAILED actions', (done) => {
        const store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: '/api/v1/failures/count' })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })

        store.dispatch(fetchFailureCount()).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_COUNT })
          expect(actions[1]).toEqual({ type: REQUEST_FAILURE_COUNT_FAILED, error: 'some error' })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})

import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  REQUEST_FAILURE_DETAILS,
  RECEIVE_FAILURE_DETAILS,
  REQUEST_FAILURE_DETAILS_FAILED
} from 'actions'

import { fetchFailureDetails } from 'actions/failures/details'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/failure-details', () => {
  describe('#fetchFailureDetails', () => {
    describe('when it succeeds', () => {
      let failure, store
      beforeEach(() => {
        failure = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures/${failure.id}` })
          .response(failure)
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(fetchFailureDetails(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_DETAILS, failure })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURE_DETAILS, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('when it fails', () => {
      it('creates REQUEST and REQUEST_FAILED actions', (done) => {
        const failure = { id: 1 }
        const store = mockStore({})
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures/${failure.id}` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })

        store.dispatch(fetchFailureDetails(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_DETAILS, failure })
          expect(actions[1]).toEqual({ type: REQUEST_FAILURE_DETAILS_FAILED, failure, error: 'some error' })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})

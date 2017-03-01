import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  REQUEST_FAILURE_RETRY,
  RECEIVE_FAILURE_RETRY,
  ADD_FLASH_MESSAGE,
  FAILURE_HIDE_OVERVIEW,
  DELETE_FAILURE
} from 'actions'

import {
  showFailureRetry,
  hideFailureRetry,
  performFailureRetry
} from 'actions/failures/retry'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/failures/retry', () => {
  describe('#showFailureRetry', () => {
    it('creates an action to show failure retry', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_SHOW_RETRY, failure }
      expect(showFailureRetry(failure)).toEqual(expectedAction)
    })
  })

  describe('#hideFailureRetry', () => {
    it('creates an action to hide failure retry', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_HIDE_RETRY, failure }
      expect(hideFailureRetry(failure)).toEqual(expectedAction)
    })
  })

  describe('#performFailureRetry', () => {
    describe('when it succeeds', () => {
      let failure, store
      beforeEach(() => {
        failure = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('post')
          .matching({ url: `/api/v1/failures/${failure.id}/retry` })
          .response({ acknowledged: true })
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_RETRY, failure })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURE_RETRY, failure, acknowledged: true })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to hide the failure retry', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[2]).toEqual({ type: FAILURE_HIDE_RETRY, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('create an action to add a success flash message', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[3]).toEqual({ type: ADD_FLASH_MESSAGE, message: {
            id: jasmine.any(String),
            type: 'success',
            text: 'Failure retried with success. Acknowledged: true',
            autoClose: true
          }})
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to hide the failure overview', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[4]).toEqual({ type: FAILURE_HIDE_OVERVIEW, failure: failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to delete the failure from state', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[5]).toEqual({ type: DELETE_FAILURE, failure: failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('when it fails', () => {
      let store, failure

      beforeEach(() => {
        failure = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('post')
          .matching({ url: `/api/v1/failures/${failure.id}/retry` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })
      })

      it('creates REQUEST and REQUEST_FAILED actions', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_RETRY, failure })
          expect(actions[1]).toEqual({ type: FAILURE_HIDE_RETRY, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('create an action to add an error flash message', (done) => {
        store.dispatch(performFailureRetry(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[2]).toEqual({ type: ADD_FLASH_MESSAGE, message: {
            id: jasmine.any(String),
            type: 'error',
            text: `Failure retried with error: some error`,
            autoClose: false
          }})
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})

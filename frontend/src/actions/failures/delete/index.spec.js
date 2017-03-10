import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  FAILURE_SHOW_DELETE,
  FAILURE_HIDE_DELETE,
  REQUEST_FAILURE_DELETE,
  RECEIVE_FAILURE_DELETE,
  REQUEST_FAILURE_DELETE_FAILED,
  ADD_FLASH_MESSAGE,
  FAILURE_HIDE_OVERVIEW,
  DELETE_FAILURE
} from 'actions'

import {
  showFailureDelete,
  hideFailureDelete,
  performFailureDelete
} from 'actions/failures/delete'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/failures/delete', () => {
  describe('#showFailureDelete', () => {
    it('creates an action to show failure delete', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_SHOW_DELETE, failure }
      expect(showFailureDelete(failure)).toEqual(expectedAction)
    })
  })

  describe('#hideFailureDelete', () => {
    it('creates an action to hide failure delete', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_HIDE_DELETE, failure }
      expect(hideFailureDelete(failure)).toEqual(expectedAction)
    })
  })

  describe('#performFailureDelete', () => {
    describe('when it succeeds', () => {
      let failure, store
      beforeEach(() => {
        failure = { id: 1 }
        store = mockStore({})
        Mappersmith.Env.Fixture
          .define('delete')
          .matching({ url: `/api/v1/failures/${failure.id}` })
          .response({ acknowledged: true })
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_DELETE, failure })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURE_DELETE, failure, acknowledged: true })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to hide the failure delete', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[2]).toEqual({ type: FAILURE_HIDE_DELETE, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('create an action to add a success flash message', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[3]).toEqual({ type: ADD_FLASH_MESSAGE, message: {
            id: jasmine.any(String),
            type: 'success',
            text: 'Failure deleted with success. Acknowledged: true',
            autoClose: true
          }})
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to hide the failure overview', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[4]).toEqual({ type: FAILURE_HIDE_OVERVIEW, failure: failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to delete the failure from state', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
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
          .define('delete')
          .matching({ url: `/api/v1/failures/${failure.id}` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })
      })

      it('creates REQUEST and REQUEST_FAILED actions', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURE_DELETE, failure })
          expect(actions[1]).toEqual({ type: FAILURE_HIDE_DELETE, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to add an error flash message', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[2]).toEqual({ type: ADD_FLASH_MESSAGE, message: {
            id: jasmine.any(String),
            type: 'error',
            text: 'Failure delete failed: some error',
            autoClose: false
          }})
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })

      it('creates an action to clear the loading status', (done) => {
        store.dispatch(performFailureDelete(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[3]).toEqual({ type: REQUEST_FAILURE_DELETE_FAILED, failure })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })
})

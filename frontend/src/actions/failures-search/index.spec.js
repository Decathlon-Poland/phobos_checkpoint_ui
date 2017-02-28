import 'babel-polyfill'
import Mappersmith from 'mappersmith'
import 'mappersmith/fixtures'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { EVENTS_SEARCH_LIMIT } from 'api'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {
  TRIGGER_FAILURES_SEARCH,
  REQUEST_FAILURES_SEARCH_RESULTS,
  RECEIVE_FAILURES_SEARCH_RESULTS,
  REQUEST_FAILURES_SEARCH_RESULTS_FAILED,
  ADD_FLASH_MESSAGE,
  LOAD_MORE_FAILURES_SEARCH_RESULTS
} from 'actions'

import {
  triggerSearch,
  fetchSearchResults,
  loadMoreSearchResults
} from 'actions/failures-search'

beforeEach(() => {
  Mappersmith.Env.Fixture.clear()
})

describe('actions/failures-search', () => {
  describe('#fetchSearchResults', () => {
    describe('without filters', () => {
      let failure, initialState, store
      beforeEach(() => {
        initialState = { eventsFilters: {}, xhrStatus: { currentEventsOffset: 0 } }
        store = mockStore(initialState)
        failure = { id: 1 }
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&offset=0` })
          .response([failure])
      })

      it('creates REQUEST and RECEIVE actions', (done) => {
        store.dispatch(fetchSearchResults(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: [failure], offset: 0 })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('with specific filters', () => {
      let failure, initialState, store
      beforeEach(() => {
        initialState = {
          eventsFilters: { type: 'event_type', value: 'new' },
          xhrStatus: { currentEventsOffset: 0 }
        }
        store = mockStore(initialState)
        failure = { id: 1 }
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&event_type=new&offset=0` })
          .response([failure])
      })

      it('creates REQUEST and RECEIVE actions using the filters', (done) => {
        store.dispatch(fetchSearchResults(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: [failure], offset: 0 })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('with a different offset', () => {
      let failure, initialState, store
      beforeEach(() => {
        initialState = {
          eventsFilters: { },
          xhrStatus: { currentEventsOffset: 4 }
        }
        store = mockStore(initialState)
        failure = { id: 1 }
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&offset=4` })
          .response([failure])
      })

      it('creates REQUEST and RECEIVE actions pointing to the correct offset', (done) => {
        store.dispatch(fetchSearchResults(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
          expect(actions[1]).toEqual({ type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: [failure], offset: 4 })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })

    describe('when it fails', () => {
      let failure, initialState, store
      beforeEach(() => {
        initialState = { eventsFilters: {}, xhrStatus: { currentEventsOffset: 0 } }
        store = mockStore(initialState)
        failure = { id: 1 }
        Mappersmith.Env.Fixture
          .define('get')
          .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&offset=0` })
          .failure()
          .response({
            responseText: JSON.stringify({
              error: true,
              message: 'some error'
            })
          })
      })

      it('creates REQUEST and RECEIVE actions pointing to the correct offset', (done) => {
        store.dispatch(fetchSearchResults(failure)).then(() => {
          const actions = store.getActions()
          expect(actions[0]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
          expect(actions[1]).toEqual({
            type: REQUEST_FAILURES_SEARCH_RESULTS_FAILED,
            query: { offset: 0 }, error: 'some error'
          })
          expect(actions[2]).toEqual({
            type: ADD_FLASH_MESSAGE,
            message: { id: jasmine.any(String), type: 'error', text: 'Failures search failed. "some error"' }
          })
          done()
        })
        .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
      })
    })
  })

  describe('#triggerSearch', () => {
    let failure, initialState, store
    beforeEach(() => {
      initialState = {
        eventsFilters: {},
        xhrStatus: { currentEventsOffset: 0 }
      }
      store = mockStore(initialState)
      failure = { id: 1 }
      Mappersmith.Env.Fixture
        .define('get')
        .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&offset=0` })
        .response([failure])
    })

    it('creates TRIGGER_FAILURES_SEARCH and REQUEST actions', (done) => {
      store.dispatch(triggerSearch()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({ type: TRIGGER_FAILURES_SEARCH })
        expect(actions[1]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
        expect(actions[2]).toEqual({ type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: [failure], offset: 0 })
        done()
      })
      .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
    })
  })

  describe('#loadMoreSearchResults', () => {
    let failure, initialState, store
    beforeEach(() => {
      initialState = {
        eventsFilters: {},
        xhrStatus: { currentEventsOffset: 4 }
      }
      store = mockStore(initialState)
      failure = { id: 1 }
      Mappersmith.Env.Fixture
        .define('get')
        .matching({ url: `/api/v1/failures?limit=${EVENTS_SEARCH_LIMIT}&offset=4` })
        .response([failure])
    })

    it('creates LOAD_MORE_FAILURES_SEARCH_RESULTS and REQUEST actions', (done) => {
      store.dispatch(loadMoreSearchResults()).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual({ type: LOAD_MORE_FAILURES_SEARCH_RESULTS, offset: 4 + EVENTS_SEARCH_LIMIT })
        expect(actions[1]).toEqual({ type: REQUEST_FAILURES_SEARCH_RESULTS })
        expect(actions[2]).toEqual({ type: RECEIVE_FAILURES_SEARCH_RESULTS, failures: [failure], offset: 4 })
        done()
      })
      .catch((e) => done.fail(`test failed with promise error: ${e.message}`))
    })
  })
})

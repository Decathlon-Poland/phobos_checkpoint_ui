import reducer from 'reducers'

describe('reducers', () => {
  it('without actions returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      xhrStatus: {
        isFetchingEvents: false,
        isRetryingEvent: false,
        isFetchingEventDetails: false,
        currentEventsOffset: 0,
        lastEventsLoadSize: 0
      },
      flashMessages: [],
      eventsFilters: { type: 'entity_id' },
      eventDetails: {},
      events: [],
      failures: [],
      routing: { locationBeforeTransitions: null }
    })
  })
})

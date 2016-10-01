import { EVENT_SHOW_OVERVIEW, EVENT_HIDE_OVERVIEW } from 'actions'
import { showEventOverview, hideEventOverview } from 'actions/event-overview'

describe('actions/event-overview', () => {
  describe('#showEventOverview', () => {
    it('creates an action to show event overview', () => {
      const event = { id: 1 }
      const expectedAction = { type: EVENT_SHOW_OVERVIEW, event: event }
      expect(showEventOverview(event)).toEqual(expectedAction)
    })
  })

  describe('#hideEventOverview', () => {
    it('creates an action to hide event overview', () => {
      const event = { id: 1 }
      const expectedAction = { type: EVENT_HIDE_OVERVIEW, event: event }
      expect(hideEventOverview(event)).toEqual(expectedAction)
    })
  })
})

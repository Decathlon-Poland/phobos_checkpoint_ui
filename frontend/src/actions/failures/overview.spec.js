import { FAILURE_SHOW_OVERVIEW, FAILURE_HIDE_OVERVIEW } from 'actions'
import { showFailureOverview, hideFailureOverview } from 'actions/failures/overview'

describe('actions/failures/overview', () => {
  describe('#showFailureOverview', () => {
    it('creates an action to show failure overview', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_SHOW_OVERVIEW, failure: failure }
      expect(showFailureOverview(failure)).toEqual(expectedAction)
    })
  })

  describe('#hideFailureOverview', () => {
    it('creates an action to hide failure overview', () => {
      const failure = { id: 1 }
      const expectedAction = { type: FAILURE_HIDE_OVERVIEW, failure: failure }
      expect(hideFailureOverview(failure)).toEqual(expectedAction)
    })
  })
})

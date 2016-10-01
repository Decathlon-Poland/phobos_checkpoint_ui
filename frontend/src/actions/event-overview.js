import { EVENT_SHOW_OVERVIEW, EVENT_HIDE_OVERVIEW } from 'actions'

export const showEventOverview = (event) => ({
  type: EVENT_SHOW_OVERVIEW,
  event
})

export const hideEventOverview = (event) => ({
  type: EVENT_HIDE_OVERVIEW,
  event
})

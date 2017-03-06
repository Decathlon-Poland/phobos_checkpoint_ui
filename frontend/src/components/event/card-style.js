import moment from 'moment'
const TIME_FORMAT = 'h:mm:ss a'
const EMPTY_TYPE = '<no type>'

export function formatTime (time) {
  if (!time) return null
  const timeDate = new Date(time)
  return moment(timeDate).format(TIME_FORMAT)
}

export function formattedEventType (eventType) {
  return eventType || EMPTY_TYPE
}

export default {
  card: {
    width: '490px',
    overflow: 'hidden'
  },
  cardHeader: {
    title: {
      fontWeight: 'lighter'
    }
  },
  cardTitle: {
    fontSize: '38px',
    fontWeight: 'lighter'
  }
}

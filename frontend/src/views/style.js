import {
  grey200,
  grey50,
  blueGrey300
} from 'material-ui/styles/colors'

export const style = {
  view: {
    maxWidth: '1020px',
    minHeigh: '100%',
    backgroundColor: grey200,
    margin: '0 auto'
  },
  title: {
    padding: '20px 20px',
    color: grey50,
    backgroundColor: blueGrey300,
    fontSize: '20px',
    fontWeight: 'lighter',
    fontFamily: 'Roboto',
    marginBottom: '20px'
  },
  body: {
    display: 'flex',
    padding: '0 20px',
    justifyContent: 'center'
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start'
  }
}

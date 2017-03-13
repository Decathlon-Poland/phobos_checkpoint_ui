import {
  grey200,
  grey50,
  blueGrey300
} from 'material-ui/styles/colors'

export const style = {
  view: {
    'max-width': '1020px',
    'min-height': '100%',
    'background-color': grey200,
    'margin': '0 auto'
  },
  title: {
    'padding': '20px 20px',
    'color': grey50,
    'background-color': blueGrey300,
    'font-size': '20px',
    'font-weight': 'lighter',
    'font-family': 'Roboto',
    'margin-bottom': '20px'
  },
  body: {
    display: 'flex',
    padding: '0 20px',
    'justify-content': 'center'
  },
  row: {
    display: 'flex',
    'align-items': 'flex-start'
  },
  heading: {
    'font-size': '24px',
    'font-weight': 'lighter',
    'font-family': 'Roboto'
  },
  altHeading: {
    'font-size': '24px',
    'font-weight': 'lighter',
    'font-family': 'Roboto',
    'align-self': 'flex-end'
  }
}

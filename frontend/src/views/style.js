import {
  grey200,
  blueGrey50,
  blueGrey400
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
    'color': blueGrey50,
    'background-color': blueGrey400,
    'font-size': '30px',
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

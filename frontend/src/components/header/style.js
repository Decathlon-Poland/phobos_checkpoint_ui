import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  blueGrey800,
  cyan500,
  grey100,
  grey500,
  yellowA100
} from 'material-ui/styles/colors'

export const theme = getMuiTheme({
  palette: {
    accent1Color: cyan500
  },
  ripple: {
    color: grey100
  }
})

export const style = {
  bar: {
    backgroundColor: blueGrey800
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'lighter'
  },
  envLabel: {
    marginLeft: 20,
    backgroundColor: yellowA100
  },
  innerTitle: {
    marginLeft: 10
  },
  menuInner: {
    display: 'flex'
  },
  menuItem: {
    color: grey500,
    fontFamily: 'Roboto',
    fontWeight: 'lighter'
  }
}

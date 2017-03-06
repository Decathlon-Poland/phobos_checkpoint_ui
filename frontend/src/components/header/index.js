import React, { Component } from 'react'
import { connect } from 'react-redux'
import configs from 'configs'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import { Link } from 'react-router'

import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import EventsIcon from 'material-ui/svg-icons/communication/call-received'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
  blueGrey800,
  cyan500,
  grey100,
  grey500,
  yellowA100
} from 'material-ui/styles/colors'
import { navigateTo } from 'actions/navigation'

const DEFAULT_TITLE = 'Phobos Checkpoint'
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: cyan500
  },
  ripple: {
    color: grey100
  }
})

const style = {
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

export class Header extends Component {
  render () {
    return (
      <AppBar
        title={this.logo()}
        showMenuIconButton={false}
        style={style.bar}
        titleStyle={style.title}
      />
    )
  }

  logo () {
    const { title, logo, env_label } = configs()
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='header'>
          <Link className='header--title' to='/'>
            {logo && <img className='logo' src={logo} />}
            <span className='title' style={style.innerTitle}>{title || DEFAULT_TITLE}</span>
            <Chip className='env-label' style={style.envLabel}>{env_label}</Chip>
          </Link>
          <Menu
            disableAutoFocus={!false}
            value={this.props.routing.locationBeforeTransitions.pathname}
            listStyle={style.menuInner}>
            <MenuItem
              value='/events'
              style={style.menuItem}
              primaryText='Events'
              leftIcon={<EventsIcon />}
              onTouchTap={() => this.props.navigateTo('/events')}
            />
            <MenuItem
              value='/failures'
              style={style.menuItem}
              primaryText='Failures'
              leftIcon={<FailuresIcon />}
              onTouchTap={() => this.props.navigateTo('/failures')}
            />
          </Menu>
        </div>
      </MuiThemeProvider>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const actionsToConnect = {
  navigateTo
}

export default connect(
  mapStateToProps,
  actionsToConnect
)(Header)

import React, { Component } from 'react'
import configs from 'configs'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import Chip from 'material-ui/Chip'
import Menu from 'material-ui/Menu'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'
import EventsIcon from 'material-ui/svg-icons/communication/call-received'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { navigateTo } from 'actions/navigation'
import { style, theme } from 'components/header/style'

const DEFAULT_TITLE = 'Phobos Checkpoint'

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
      <MuiThemeProvider muiTheme={theme}>
        <div className='header'>
          <Link className='header--title' to='/'>
            {logo && <img className='logo' src={logo} />}
            <span className='title' style={style.innerTitle}>{title || DEFAULT_TITLE}</span>
            <Chip className='env-label' style={style.envLabel}>{env_label}</Chip>
          </Link>
          <Menu
            disableAutoFocus
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

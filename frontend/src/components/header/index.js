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
import { navigateTo } from 'actions/navigation'
import { red500, green200, blueGrey600 } from 'material-ui/styles/colors'

const DEFAULT_TITLE = 'Phobos Checkpoint'

const style = {
  bar: {
    backgroundColor: blueGrey600
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'lighter'
  },
  envLabel: {
    marginLeft: 30
  },
  menuInner: {
    display: 'flex'
  },
  menuItem: {
    color: '#fff',
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
      <div className='header'>
        <Link className='header--title' to='/'>
          {logo && <img className='logo' src={logo} />}
          <span className='title'>{title || DEFAULT_TITLE}</span>
          <Chip className='env-label' style={style.envLabel}>{env_label}</Chip>
        </Link>
        <Menu className='header--menu' listStyle={style.menuInner}>
          <MenuItem
            focusState='focused'
            style={style.menuItem}
            primaryText='Events'
            leftIcon={<EventsIcon color={green200} />}
            onTouchTap={() => this.props.navigateTo('/events')}
          />
          <MenuItem
            style={style.menuItem}
            primaryText='Failures'
            leftIcon={<FailuresIcon color={red500} />}
            onTouchTap={() => this.props.navigateTo('/failures')}
          />
        </Menu>
      </div>
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

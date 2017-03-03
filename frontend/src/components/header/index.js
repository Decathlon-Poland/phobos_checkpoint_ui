import React, { Component } from 'react'
import { connect } from 'react-redux'
import configs from 'configs'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import EventsIcon from 'material-ui/svg-icons/communication/call-received'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'
import { navigateTo } from 'actions/navigation'
import { red500, green200 } from 'material-ui/styles/colors'

const DEFAULT_TITLE = 'Phobos Checkpoint'

const style = {
  bar: {
    backgroundColor: '#302e3a'
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'lighter'
  },
  envLabel: {
    marginLeft: 30
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
        iconElementRight={
          <IconMenu
            iconButtonElement={<IconButton><MenuIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem
              primaryText='Events'
              leftIcon={<EventsIcon color={green200} />}
              onTouchTap={() => this.props.navigateTo('/events')}
            />
            <MenuItem
              primaryText='Failures'
              leftIcon={<FailuresIcon color={red500} />}
              onTouchTap={() => this.props.navigateTo('/failures')}
            />
          </IconMenu>
        }
      />
    )
  }

  logo () {
    const { title, logo, env_label } = configs()
    return (
      <Link className='header' to='/'>
        {logo && <img className='logo' src={logo} />}
        <span className='title'>{title || DEFAULT_TITLE}</span>
        <Chip className='env-label' style={style.envLabel}>{env_label}</Chip>
      </Link>
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

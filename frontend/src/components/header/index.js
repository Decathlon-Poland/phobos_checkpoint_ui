import React, { Component } from 'react'
import { connect } from 'react-redux'
import configs from 'configs'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import ContentSend from 'material-ui/svg-icons/content/send'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import { navigateTo } from 'actions/navigation'

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
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
            <MenuItem primaryText='Dashboard' leftIcon={<RemoveRedEye />} onTouchTap={() => this.props.navigateTo('/dashboard')}/>
            <MenuItem primaryText='Events' leftIcon={<ContentSend />} onTouchTap={() => this.props.navigateTo('/events')} />
            <MenuItem primaryText='Errors' leftIcon={<ActionAssignment />} onTouchTap={() => this.props.navigateTo('/failures')} />
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

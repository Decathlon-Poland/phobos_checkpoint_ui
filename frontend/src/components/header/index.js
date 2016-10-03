import React, { Component } from 'react'
import configs from 'configs'
import AppBar from 'material-ui/AppBar'
import Chip from 'material-ui/Chip'
import { Link } from 'react-router'

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

export default class extends Component {
  render () {
    return (
      <AppBar
        title={this.logo()}
        showMenuIconButton={false}
        style={style.bar}
        titleStyle={style.title}/>
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

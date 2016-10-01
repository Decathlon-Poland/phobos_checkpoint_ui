import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

const style = {
  bar: {
    backgroundColor: '#302e3a'
  },
  title: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'lighter'
  }
}

export default class extends Component {
  render () {
    return (
      <AppBar
        title='PhobosCheckpoint'
        showMenuIconButton={false}
        style={style.bar}
        titleStyle={style.title}/>
    )
  }
}

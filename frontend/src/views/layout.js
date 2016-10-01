import React, { Component } from 'react'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from 'components/header'
import FlashMessageList from 'components/flash-message-list'

const theme = getMuiTheme(lightBaseTheme)

export default class extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div className='layout'>
          <Header />
          <FlashMessageList />
          {React.cloneElement(this.props.children)}
        </div>
      </MuiThemeProvider>
    )
  }
}

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { deleteFlashMessage } from 'actions/flash-messages'

import FlashMessage from 'components/flash-message'

class FlashMessageList extends Component {
  static get propTypes () {
    return {
      deleteFlashMessage: PropTypes.func.isRequired
    }
  }

  render () {
    return (
      <div className='flash-message-list'>
        {
          this.props.flashMessages.map((message) => (
            <FlashMessage
              key={message.id}
              onClose={this.props.deleteFlashMessage}
              {...message}/>
          ))
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({flashMessages: state.flashMessages}), {
    deleteFlashMessage
  }
)(FlashMessageList)

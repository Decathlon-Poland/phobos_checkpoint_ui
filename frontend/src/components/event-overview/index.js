import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import JSONPretty from 'react-json-pretty'
import 'react-json-pretty/src/JSONPretty.monikai.css'

import Attribute from 'components/attribute'

const EVENT_TIME_FORMAT = 'MMMM Do YYYY, h:mm:ss a'

export function formatEventTime (eventTime) {
  if (!eventTime) return null
  const eventTimeDate = new Date(eventTime)
  return moment(eventTimeDate).format(EVENT_TIME_FORMAT)
}

export default class extends Component {
  static get propTypes () {
    return {
      id: PropTypes.number,
      group_id: PropTypes.string,
      topic: PropTypes.string,
      entity_id: PropTypes.string,
      event_type: PropTypes.string,
      event_time: PropTypes.string,
      event_version: PropTypes.string,
      checksum: PropTypes.string,
      payload: PropTypes.object
    }
  }

  render () {
    return (
      <div className='event-overview'>
        <Attribute label='Group ID' value={this.props.group_id} />
        <Attribute label='Topic' value={this.props.topic} />
        <Attribute label='Entity ID' value={this.props.entity_id} />
        <Attribute label='Event Type' value={this.props.event_type} />
        <Attribute label='Event Time' value={formatEventTime(this.props.event_time)} />
        <Attribute label='Event Version' value={this.props.event_version} />
        <Attribute label='Checksum' value={this.props.checksum} />
        <Attribute label='Payload'>
          <JSONPretty className='json-pretty' json={this.props.payload} />
        </Attribute>
      </div>
    )
  }
}

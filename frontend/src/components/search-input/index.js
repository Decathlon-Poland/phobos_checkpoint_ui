import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  changeSearchInputFilterType,
  changeSearchInputFilterValue
} from 'actions/search-input-filter'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SearchSVG from 'material-ui/svg-icons/action/search'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import { DEFAULT_FILTER_TYPE } from 'reducers/events-filters'

export const ENTER_KEY = 13
const FILTER_TYPES = [
  'entity_id',
  'event_type',
  'group_id',
  'topic'
]

export class SearchInput extends Component {
  static get propTypes () {
    return {
      onChangeFilterType: PropTypes.func,
      onChangeFilterValue: PropTypes.func,
      isFetchingEvents: PropTypes.bool,

      triggerSearch: PropTypes.func.isRequired,
      filterType: PropTypes.string,
      filterValue: PropTypes.string
    }
  }

  render () {
    return (
      <div className='search-input'>
        <SelectField
          style={{width: '140px'}}
          value={this.props.filterType || DEFAULT_FILTER_TYPE}
          onChange={(e, index, value) => this.changeFilterType(value)}>
          {
            FILTER_TYPES.map((type) => (
              <MenuItem
                key={type}
                value={type}
                primaryText={type} />
            ))
          }
        </SelectField>
        <TextField
          name='filterValue'
          style={{width: '100%'}}
          onChange={(e) => this.changeFilterValue(e.target.value)}
          onKeyDown={(e) => this.search(e)}
          value={this.props.filterValue || ''}
          hintText='Press ENTER to search' />
        <RaisedButton
          primary
          onClick={() => this.search()}
          style={{height: '50px', marginLeft: '20px'}}
          icon={this.getButtonIcon()} />
      </div>
    )
  }

  changeFilterType (value) {
    this.props.onChangeFilterType(value)
  }

  changeFilterValue (value) {
    this.props.onChangeFilterValue(value)
  }

  search (e) {
    if (e && e.keyCode === ENTER_KEY || !e) {
      this.props.triggerSearch()
    }
  }

  getButtonIcon () {
    return this.props.isFetchingEvents
      ? <CircularProgress size={0.4}/>
      : <SearchSVG color={'#fff'} style={{width: 30, height: 50}}/>
  }
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({
    isFetchingEvents: state.xhrStatus.isFetchingEvents
  }, ownProps)
)

export default connect(mapStateToProps, {
  onChangeFilterType: changeSearchInputFilterType,
  onChangeFilterValue: changeSearchInputFilterValue
})(SearchInput)

import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Helpers
import Moment from '../helpers/react-moment'

// Component
import Radium from 'radium'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import RaisedButton from './RaisedButton'
// import BittEditor from './BittEditor'

const propTypes = {
  id:         PropTypes.string.isRequired,
  details:    PropTypes.object.isRequired,
  bittAmount: PropTypes.number.isRequired,
  updateBitt: PropTypes.func.isRequired,
  deleteBitt: PropTypes.func.isRequired
}

class Bitt extends Component {
  constructor() {
    super()

    this.state = {
      isExpanded:       false,
      isShowingOptions: false,
      zDepth:           1
    }

    this.updateBitt = this.updateBitt.bind(this)
    this.handleKeyPressUpdateBitt = this.handleKeyPressUpdateBitt.bind(this)
    this.deleteBitt = this.deleteBitt.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.hideOptions = this.hideOptions.bind(this)
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  updateBitt(e, details) {
    e.preventDefault()

    const timestamp = Date.now()

    const bitt = details

    if (this.state.isExpanded) {
      const bittTitle = this.title.value
      bittTitle.length === 0 ?
      bitt.title = 'Untitled Bitt' :
      bitt.title = this.title.value.trim()

      const bittBody = this.body.value
      bittBody.length === 0 ?
      bitt.body = 'Write a bitt...' :
      bitt.body = this.body.value

      bitt.updatedAt = timestamp

      bitt.isFirstSubmit = false

      this.props.updateBitt(bitt)
    } else {
      const bittTitle = this.title.value
      bittTitle.length === 0 ?
      bitt.title = 'Untitled Bitt' :
      bitt.title = this.title.value.trim()

      bitt.updatedAt = timestamp

      bitt.isFirstSubmit = false

      this.props.updateBitt(bitt)
    }
  }

  handleKeyPressUpdateBitt(e, details) {
    if (e.key === 'Enter') {
      this.updateBitt(e, details)

      this.title.blur()
    }
  }

  deleteBitt(e, id) {
    e.stopPropagation()

    this.props.deleteBitt(id)
  }

  showOptions() {
    this.setState({
      isShowingOptions: true,
      zDepth: this.state.isExpanded ? 3 : 2
    })
  }

  hideOptions() {
    this.setState({
      isShowingOptions: false,
      zDepth: this.state.isExpanded? 3 : 1
    })
  }

  toggleExpand(e) {
    e.stopPropagation()

    this.setState({
      isExpanded: !this.state.isExpanded,
      zDepth: this.state.isExpanded ? 1 : 3
    })

    setTimeout(() => {
      const bittCardHeader = document.getElementById('bitt-card-header')
      const bittCardHeaderRect = bittCardHeader.getBoundingClientRect()
      const absolutebittCardHeaderTop = bittCardHeaderRect.top + window.pageYOffset
      const middle = absolutebittCardHeaderTop - (window.innerHeight / 2)

      window.scrollTo(0, middle)
    }, 10)
  }

  render() {
    const styles = {
      bittCard: {
        overflow: 'hidden',
        margin: '0 4vw 20px 4vw'
      },

      bittOptionsContainer: {
        float: 'right',
        background: 'white'
      },

      bittDeleteButton: {
        float: 'right'
      },

      bittTitle: {
        color: '#146D8F'
      },

      bittTitleInput: {
        width: '59vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        margin: '0',
        outline: 'none',
        border: 'none',
        borderRadius: '3px',
        padding: '0',
        background: 'transparent',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#146D8F',
        textOverflow: 'ellipsis'
      },

      bittBodyPreview: {
        width: '59vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '12px 0 0 0'
      },

      bittDivider: {
        color: '#e0e0e0'
      },

      bittTextarea: {
        resize: 'none',
        width: '95%',
        minHeight: '25.5vh',
        outline: 'none',
        border: 'none',
        padding: '20px 20px 0 20px',
        fontSize: '13px',
        fontWeight: '500',

        '@media (max-width: 999px)': {
          minHeight: '16vh',
          fontSize: '16px'
        }
      },

      bittDoneButton: {
        float: 'right',
        margin: '20px 4px 20px 0'
      }
    }

    const {
      id,
      details,
      bittAmount
    } = this.props

    let isShowingOptions
    if (this.state.isShowingOptions) {
      isShowingOptions = (
        <IconButton
          id="bitt-delete-button"
          style={styles.bittDeleteButton}
          onTouchTap={(e) => this.deleteBitt(e, id)}
        >
          <ActionDelete
            color="#757575"
            hoverColor="#424242"
          />
        </IconButton>
      )
    } else {
      isShowingOptions = null
    }

    let isShowingBittBody
    if (this.state.isExpanded === false) {
      isShowingBittBody = (
        <div
          id="bitt-body-preview"
          style={styles.bittBodyPreview}
        >
          {details.body}
        </div>
      )
    } else {
      isShowingBittBody = null
    }

    let bittState
    if (details.isFirstSubmit) {
      bittState = (
        <Card
          id="bitt-card"
          style={styles.bittCard}
          zDepth={this.state.zDepth}
        >
          <CardHeader
            id="bitt-card-header"
            style={styles.bittHeader}
            title={
              <input
                id="bitt-title-input"
                style={styles.bittTitleInput}
                placeholder="Bitt Title..."
                defaultValue=""
                autoFocus={true}
                autoComplete="off"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onKeyPress={(e) => this.handleKeyPressUpdateBitt(e, details)}
                onBlur={(e) => this.updateBitt(e, details)}
              />
            }
          />
        </Card>
      )
    } else {
      bittState = (
        <Card
          id="bitt-card"
          style={styles.bittCard}
          zDepth={this.state.zDepth}
          expanded={this.state.isExpanded}
          onMouseEnter={this.showOptions}
          onMouseLeave={this.hideOptions}
          onTouchTap={(e) => this.toggleExpand(e)}
        >
          <div
            id="bitt-options-container"
            style={styles.bittOptionsContainer}
          >
            {bittAmount > 1 ? isShowingOptions : null}
          </div>

          <CardHeader
            id="bitt-card-header"
            style={styles.bittHeader}
            actAsExpander={true}
            title={
              <input
                id="bitt-title-input"
                style={styles.bittTitleInput}
                placeholder="Bitt Title..."
                defaultValue={details.title}
                autoComplete="off"
                ref={(input) => this.title = input}
                onTouchTap={e => e.stopPropagation()}
                onChange={(e) => this.updateBitt(e, details)}
                onKeyPress={(e) => this.handleKeyPressUpdateBitt(e, details)}
                onBlur={(e) => this.updateBitt(e, details)}
              />
            }
            subtitle={
              <div
                id="bitt-subtitle-container"
              >
                <Moment
                  fromNow
                  style={styles.bittMomentDate}
                >
                  {details.updatedAt}
                </Moment>
                ...

                {isShowingBittBody}
              </div>
            }
          />

          <CardText
            expandable={true}
            style={styles.bittCardText}
          >
            <Divider
              style={styles.bittDivider}
            />

            <textarea
              id="bitt-textarea"
              style={styles.bittTextarea}
              placeholder="Write a bitt..."
              defaultValue={
                details.body === 'Write a bitt...' || details.body === 'Click here to edit...' ?
                '' : details.body
              }
              autoFocus={
                (document.documentElement.clientWidth <= 999 || window.innerWidth <= 999) ?
                false : true
              }
              ref={(input) => this.body = input}
              onTouchTap={e => e.stopPropagation()}
              onChange={(e) => this.updateBitt(e, details)}
            />

            {/* <div
              id="bitt-editor-container"
              onTouchTap={e => e.stopPropagation()}
            >
              <BittEditor/>
            </div> */}

            <RaisedButton
              id="bitt-done-button"
              style={styles.bittDoneButton}
              primary={true}
              label="Done"
              onTouchTap={this.hideOptions}
            />
          </CardText>
        </Card>
      )
    }

    return bittState
  }
}

Bitt.propTypes = propTypes

export default Radium(Bitt)

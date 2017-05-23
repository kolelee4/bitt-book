import React, {Component} from 'react'
import PropTypes from 'prop-types'

// Database
import base from '../base'

// Components
import FABContainer from '../components/FABContainer'
import BittBook from '../components/BittBook'

class BittBooks extends Component {
  constructor() {
    super()

    this.state = {
      bittBooks: {}
    }

    this.createBittBook = this.createBittBook.bind(this)

    this.updateBittBook = this.updateBittBook.bind(this)

    this.deleteBittBook = this.deleteBittBook.bind(this)
  }

  componentWillMount() {
    this.ref = base.syncState('bitt-books', {
      context: this,
      state: 'bittBooks'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  createBittBook() {
    const bittBooks = {...this.state.bittBooks}

    const timestamp = Date.now()

    const bittBook = {
      title: 'Bitt Book Title',
      createdAt: timestamp,
      updatedAt: timestamp,
      isFirstSubmit: true,
      bitts: {}
    }

    const bitt = {
      title: 'First Bitt',
      createdAt: timestamp,
      updatedAt: timestamp
    }

    bittBooks[`bittBook-${timestamp}`] = bittBook

    bittBook.bitts[`bitt-${timestamp}`] = bitt

    this.setState({
      bittBooks
    })
  }

  updateBittBook(bittBook) {
    const bittBooks = {...this.state.bittBooks}

    // eslint-disable-next-line
    bittBooks[bittBook]

    this.setState({
      bittBooks
    })
  }

  deleteBittBook(id) {
    const bittBooks = {...this.state.bittBooks}

    bittBooks[id] = null

    this.setState({
      bittBooks
    })
  }

  render() {
    const styles = {
      main: {
        overflow: 'hidden',
        padding: '0 0 0 60px'
      },

      noBittBooksMessage: {
        fontWeight: '500'
      }
    }

    const {bittBooks} = this.state

    const bittBookAmount = Object.keys(bittBooks).length

    let bittBooksState
    if (bittBookAmount === 0) {
      bittBooksState =
      <h4
        style={styles.noBittBooksMessage}
      >
        {this.props.noBittBooks}
      </h4>
    } else {
      bittBooksState =
      Object
        .keys(bittBooks)
        .map(key =>
          <BittBook
            key={key}
            id={key}
            details={bittBooks[key]}
            updateBittBook={this.updateBittBook}
            deleteBittBook={this.deleteBittBook}
          />
        )
    }

    return (
      <div
        id="bitt-books-route"
        style={styles.main}
      >
        {bittBooksState}

        <FABContainer
          createBittBook={this.createBittBook}
        />
      </div>
    )
  }
}

BittBooks.defaultProps = {
  noBittBooks: `You currently have 0 bitt books.`
}

BittBooks.propTypes = {
  noBittBooks: PropTypes.string.isRequired
}

export default BittBooks

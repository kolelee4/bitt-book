import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

// Auth
import {firebaseAuth} from '../config/base'

// Containers
import Layout from '../containers/Layout'

// Routes
import Signup from '../routes/Signup'
import Signin from '../routes/Signin'
import Home from '../routes/Home'
import BittBooks from '../routes/protected/BittBooks'
import Account from '../routes/protected/Account'

// Components
import ApplicationBar from '../components/ApplicationBar'
import CircularProgress from 'material-ui/CircularProgress'

const PrivateRoute  = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authenticated === true ?
        <Component {...props} /> :
        <Redirect
          to={{pathname: '/', state: {from: props.location}}}
        />
      }
    />
  )
}

const PublicRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authenticated === false ?
        <Component {...props} /> :
        <Redirect
          to='/bitt-books'
        />
      }
    />
  )
}

class Template extends Component {
  constructor() {
    super()

    this.state = {
      authenticated: false,
      loading:       true
    }
  }

  componentDidMount() {
    this.authListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const styles = {
      circularProgressContainer: {
        width: '80px',
        margin: '48vh auto 0 auto'
      }
    }

    return this.state.loading === true ? (
      <Layout>
        <ApplicationBar
          authenticated={this.state.authenticated}
        />

        <div
          id="circular-progress-container"
          style={styles.circularProgressContainer}
        >
          <CircularProgress
            size={80}
            thickness={6}
          />
        </div>
      </Layout>
    ) : (
      <Layout>
        <ApplicationBar
          authenticated={this.state.authenticated}
        />

        <Switch>
          <Route
            exact path="/"
            component={Home}
          />

          <PublicRoute
            authenticated={this.state.authenticated}
            exact path="/sign-up"
            component={Signup}
          />

          <PublicRoute
            authenticated={this.state.authenticated}
            exact path="/sign-in"
            component={Signin}
          />

          <PrivateRoute
            authenticated={this.state.authenticated}
            exact path="/bitt-books"
            component={BittBooks}
          />

          <PrivateRoute
            authenticated={this.state.authenticated}
            exact path="/account"
            component={Account}
          />

          <Route
            render={() => <h3>No Match</h3>}
          />
        </Switch>
      </Layout>
    )
  }
}

export default Template

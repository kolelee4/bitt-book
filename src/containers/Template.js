import React, {Component} from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

// Auth
import {firebaseAuth} from '../config/base'

// Containers
import RouteContainer from '../containers/RouteContainer'
import Layout from '../containers/Layout'

// Routes
import Signup from '../routes/Signup'
import Signin from '../routes/Signin'
import Home from '../routes/Home'
import BittBooks from '../routes/protected/BittBooks'
import Account from '../routes/protected/Account'

// Components
import NavigationBar from '../components/NavigationBar'

const PrivateRoute  = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authenticated === true ?
        <Component {...props} /> :
        <Redirect
          to={{pathname: '/signin', state: {from: props.location}}}
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
      loading: true
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
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
    this.removeListener()
  }

  render() {
    return this.state.loading === true ?
    <RouteContainer>
      <Layout>
        <NavigationBar
          authenticated={this.state.authenticated}
        />

        <h2>Loading...</h2>
      </Layout>
    </RouteContainer> :
    (
      <RouteContainer>
        <Layout>
          <NavigationBar
            authenticated={this.state.authenticated}
          />

          <Switch>
            <Route
              exact path='/'
              component={Home}
            />

            <PublicRoute
              authenticated={this.state.authenticated}
              exact path='/signup'
              component={Signup}
            />

            <PublicRoute
              authenticated={this.state.authenticated}
              exact path='/signin'
              component={Signin}
            />

            <PrivateRoute
              authenticated={this.state.authenticated}
              exact path='/bitt-books'
              component={BittBooks}
            />

            <PrivateRoute
              authenticated={this.state.authenticated}
              exact path='/account'
              component={Account}
            />

            <Route
              render={() => <h3>No Match</h3>}
            />
          </Switch>
        </Layout>
      </RouteContainer>
    )
  }
}

export default Template

import React from 'react'
import {NavLink} from 'react-router-dom'

// Components
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

const styles = {
  appBar: {

  },

  titleStyle: {
    marginLeft: '-4px',
  },

  titleLinkStyle: {
    textDecoration: 'none',
    color: 'white'
  },

  menuItem: {
    color: 'white'
  },

  accountSettings: {
    margin: '0',
    color: 'white'
  }
}

const titleLink = (
  <NavLink to="/bitt-books"
    style={styles.titleLinkStyle}
  >
    Bitt Book
  </NavLink>
)

const NavBar = () => {
  return (
    <div id="navbar">
      <AppBar
        title={titleLink}
        titleStyle={styles.titleStyle}
        zDepth={2}
        style={styles.appBar}
        showMenuIconButton={false}
        iconElementRight={
          <IconMenu
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            iconButtonElement={
              <IconButton>
                <ActionAccountCircle
                  style={styles.accountSettings}
                />
              </IconButton>
            }
          >
            <MenuItem
              value="1"
              primaryText="Account"
              containerElement={<NavLink to="/account"/>}
            />
            <MenuItem
              value="2"
              primaryText="Logout"
            />
          </IconMenu>
        }
      />
    </div>
  )
}

export default NavBar

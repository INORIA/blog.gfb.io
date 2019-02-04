import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { Link, StaticQuery, graphql } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const styles = theme => ({
  drawerPepper: {
    height: '100%',
    minHeight: '100vh',
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      maxWidth: drawerWidth,
      position: 'relative'
      // height: '100%',
    }
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    [theme.breakpoints.up('md')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
    }
  },
  titleTypography: {
    fontSize: '1.3125rem',
    color: 'rgba(0, 0, 0, 0.6)',
    margin: 0,
    fontWeight: 500
  },
  titleLink: {
    boxShadow: 'none',
    color: theme.palette.text.secondary
  },
  drawerHeader: theme.mixins.toolbar,
  footer: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
})

const Header = ({ classes }) => (
  <AppBar className={classes.appBar} color="default">
    <Toolbar>
      <IconButton aria-label="open drawer" className={classes.navIconHide}>
        <MenuIcon />
      </IconButton>
      <StaticQuery
        query={query}
        render={data => {
          return (
            <Typography
              className={classes.titleTypography}
              color="inherit"
              noWrap
            >
              <Link className={classes.titleLink} to="/">
                {data.site.siteMetadata.title}
              </Link>
            </Typography>
          )
        }}
      />
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)

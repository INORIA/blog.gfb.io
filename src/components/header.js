import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Link, StaticQuery, graphql } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import Image from 'gatsby-image'

const drawerWidth = 240

const query = graphql`
  query HeaderQuery {
    logo: file(absolutePath: { regex: "/gfb-logo.png/" }) {
      childImageSharp {
        fluid(maxWidth: 64, maxHeight: 64) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
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
    fontSize: '1.3125em',
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
  },
  logo: {
    marginRight: '10px',
    width: '32px',
    height: '32px'
  }
})

const Header = ({ classes }) => (
  <AppBar className={classes.appBar} color="default">
    <Toolbar>
      <StaticQuery
        query={query}
        render={data => {
          return (
            <>
              <Image
                className={classes.logo}
                fluid={data.logo.childImageSharp.fluid}
                alt=""
              />
              <Typography
                className={classes.titleTypography}
                color="inherit"
                noWrap
              >
                <Link className={classes.titleLink} to="/">
                  {data.site.siteMetadata.title}
                </Link>
              </Typography>
            </>
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

import React from 'react'
import Header from './header'
import PropTypes from 'prop-types'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import Base from './base'
import ExternalAssets from '../components/external-assets'
import './global.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: purple,
    secondary: green
  },
  status: {
    danger: 'orange'
  },
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: '1.9em',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.7)'
    },
    h2: {
      fontSize: '1.8em',
      // margin: `${8 * 1}px 0`,
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 400
    },
    h3: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 500
    },
    body1: {
      // fontSize: '1em',
      color: 'rgba(0, 0, 0, 0.7)'
    },
    subtitle2: {
      color: 'rgba(0, 0, 0, 0.7)'
    },
    caption: {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  }
})

const styles = () => ({
  mainWrapper: {
    width: '100%'
  },
  main: {
    width: '100%',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
    marginTop: '56px',
    boxSizing: 'border-box',
    minHeight: 'calc(100vh - 56px * 2)',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 'calc(100vh - 64px * 2)'
    }
  }
})

const Layout = ({ classes, children }) => (
  <MuiThemeProvider theme={theme}>
    <ExternalAssets />
    <Base>
      <Header />
      <div className={classes.mainWrapper}>
        <main className={classes.main}>{children}</main>
      </div>
    </Base>
  </MuiThemeProvider>
)

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default withStyles(styles)(Layout)

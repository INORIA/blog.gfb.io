import React from 'react'
import Header from './header'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Base from './base'
import ExternalAssets from '../components/external-assets'

const styles = theme => ({
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
  <>
    <ExternalAssets />
    <Base>
      <Header />
      <div className={classes.mainWrapper}>
        <main className={classes.main}>{children}</main>
      </div>
    </Base>
  </>
)

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default withStyles(styles)(Layout)

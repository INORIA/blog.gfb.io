import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  interactiveBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: theme.palette.primary[500],
    zIndex: theme.zIndex.layer
  },
  appFrame: {
    display: 'flex'
  }
})

const Base = ({ classes, children }) => (
  <div className={classes.appFrame}>
    <div className={classes.interactiveBar} />
    {children}
  </div>
)

Base.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default withStyles(styles)(Base)

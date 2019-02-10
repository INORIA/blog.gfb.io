import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'gatsby'

const styles = theme => ({
  content: {
    width: '100%',
    maxWidth: '700px'
  },
  subheading: {
    margin: `${theme.spacing.unit}px 0`
  },
  paper: theme.mixins.gutters({
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0),0px 2px 2px 0px rgba(0, 0, 0, 0),0px 4px 5px -2px rgba(0, 0, 0, 0.17)',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 5,
    '&:first-child': {
      marginTop: 0
    }
  }),
  [theme.breakpoints.down('sm')]: {
    bodyTextWrapper: {
      overflow: 'hidden'
    },
    bodyText: {
      display: 'box',
      boxOrient: 'vertical',
      lineClamp: 3
    }
  }
})

const PostList = ({ classes, posts }) => {
  return (
    <div className={classes.content}>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Paper className={classes.paper} key={node.fields.slug}>
            <Link style={{ boxShadow: `none` }} to={node.frontmatter.slug}>
              <Typography variant="h2" gutterBottom>
                {title}
              </Typography>
              <Typography
                className={classes.subheading}
                variant="caption"
                gutterBottom
              >
                {node.frontmatter.date}
              </Typography>
              <div className={classes.bodyTextWrapper}>
                <Typography
                  className={classes.bodyText}
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                />
              </div>
            </Link>
          </Paper>
        )
      })}
    </div>
  )
}

export default withStyles(styles)(PostList)

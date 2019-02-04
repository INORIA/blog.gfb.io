import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { StaticQuery, graphql } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2em',
    marginBottom: '3em'
  },
  content: {
    paddingLeft: theme.spacing.unit * 2
  },
  typography: {
    lineHeight: 1
  },
  avatar: {
    width: 60,
    height: 60
  }
})

const Bio = ({ classes, className, title, date }) => {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div className={`${classes.main} ${className}`}>
            <Avatar
              alt="writer icon"
              src={`//github.com/${author}.png`}
              className={classes.avatar}
            />
            <div className={classes.content}>
              <Typography className={classes.typography} noWrap gutterBottom>
                {author}
              </Typography>
              <Typography
                className={classes.typography}
                variant="caption"
                noWrap
                gutterBottom
              >
                {title}
              </Typography>
              <Typography
                className={classes.typography}
                variant="caption"
                noWrap
              >
                {date}
              </Typography>
            </div>
          </div>
        )
      }}
    />
  )
}

Bio.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default withStyles(styles)(Bio)

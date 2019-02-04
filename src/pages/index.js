import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
  })
})

const BlogIndex = ({ data, location, classes }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <div className={classes.content}>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Paper className={classes.paper} key={node.fields.slug}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
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
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: node.excerpt }}
                />
              </Link>
            </Paper>
          )
        })}
      </div>
    </Layout>
  )
}

BlogIndex.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlogIndex)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`

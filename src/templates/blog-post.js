import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  content: {
    width: '100%',
    maxWidth: '700px',
    marginBottom: theme.spacing.unit * 8,
    '& img': {
      maxWidth: '100%'
    }
  },
  avatar: {
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 8
  },
  headline: {
    margin: `${theme.spacing.unit * 4}px 0`
  }
})

const BlogPostTemplate = ({ data, pageContext, location, classes }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div className={classes.content}>
        <Bio title="Software Developer" date={post.frontmatter.date} />

        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            display: `block`
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{}} />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </div>
    </Layout>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
    }
  }
`

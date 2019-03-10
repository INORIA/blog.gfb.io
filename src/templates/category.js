import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

class PostListing extends React.Component {
  getPostList () {
    return this.props.postEdges.map(postEdge => {
      console.log(postEdge)
      return {
        path: `/${postEdge.node.frontmatter.slug}`,
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        category: postEdge.node.category,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      }
    })
  }

  render () {
    const postList = this.getPostList()
    return (
      <Layout>
        <section>
          <h2>カテゴリー一覧</h2>

          <ul className="categories">
            {postList.map(post => (
              <li key={post.title}>
                <Link to={post.path}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    )
  }
}

export default class CategoryTemplate extends React.Component {
  render () {
    const category = this.props.pathContext.category
    const postEdges = this.props.data.allMarkdownRemark.edges
    return (
      <section className="category-container">
        <Helmet title={`Posts in category "${category}"`} />
        <PostListing postEdges={postEdges} />
      </section>
    )
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            slug
            title
            tags
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`

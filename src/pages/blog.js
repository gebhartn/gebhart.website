import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import BlogCardContainer from '../containers/BlogCardContainer'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { bContainer } from './pages.module.scss'

const Blog = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const title = `${siteTitle} - Blog`

  return (
    <Layout>
      <Helmet title={title} />
      <div className={bContainer}>
        <section>
          <BlogCardContainer posts={edges} />
        </section>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            path
            featuredImage {
              childImageSharp {
                fixed(width: 75, height: 75, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          timeToRead
        }
      }
    }
  }
`

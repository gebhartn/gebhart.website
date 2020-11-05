import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PostListing from '../components/PostListing'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { bContainer } from './pages.module.scss'

export default ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark
  const title = `${siteTitle} - Blog`

  return (
    <Layout>
      <Helmet title={title} />
      <div className={bContainer}>
        <section>
          <PostListing posts={edges} />
        </section>
      </div>
    </Layout>
  )
}

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
                fixed(width: 75, height: 75) {
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

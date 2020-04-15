import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PostListing from '../components/PostListing'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { container, pageHeader } from './blog.module.scss'

export default ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark

  return (
    <Layout>
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
      <div className={container}>
        <section>
          <header className={pageHeader}>
            <h1>Blog</h1>
          </header>
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
            date
          }
          timeToRead
        }
      }
    }
  }
`

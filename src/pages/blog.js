import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import PostListing from '../components/PostListing'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { bContainer, bPageHeader } from './pages.module.scss'

export default ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark
  const title = `${siteTitle} - Blog`

  return (
    <Layout>
      <Helmet title={title} />
      <div className={bContainer}>
        <section>
          <header className={bPageHeader}>
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

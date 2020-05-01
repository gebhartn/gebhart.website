import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import ProjectListing from '../components/ProjectListing'
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
            <h1>Work</h1>
          </header>
          <ProjectListing projects={edges} />
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`

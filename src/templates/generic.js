import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import { container, pageHeader, page } from './generic.module.scss'

export default ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO />
      <Helmet>
        <title>{`${frontmatter.title} - ${config.siteTitle}`}</title>
      </Helmet>
      <div className={container}>
        <section>
          <header className={pageHeader}>
            <h1>{frontmatter.title}</h1>
          </header>
          <div className={page} dangerouslySetInnerHTML={{ __html: html }} />
        </section>
      </div>
    </Layout>
  )
}

// Execute query here to pass props into component
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
        template
      }
    }
  }
`

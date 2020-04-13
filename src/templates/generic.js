import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { container, pageHeader, page } from './generic.module.scss'

export default ({ data: { markdownRemark } }) => {
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
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

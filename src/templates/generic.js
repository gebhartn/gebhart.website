import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'
import { container, pageHeader, page } from './generic.module.scss'

export default ({ data: { markdownRemark } }) => {
  const { frontmatter, html } = markdownRemark
  const title = `${siteTitle} - ${frontmatter.title}`

  return (
    <Layout>
      <Helmet title={title} />
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
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        template
      }
    }
  }
`

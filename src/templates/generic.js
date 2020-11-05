import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import Dink from '../components/Dink'
import { siteTitle } from '../../data/SiteConfig'
import {
  inContainer,
  outer,
  content,
  container,
  inSection,
  text,
} from './generic.module.scss'

export default ({ data: { markdownRemark } }) => {
  const { frontmatter, html } = markdownRemark
  const title = `${siteTitle} - ${frontmatter.title}`

  return (
    <Layout>
      <Helmet title={title} />
      <div className={inContainer}>
        <section className={inSection}>
          <div id={frontmatter.path} className={outer} key={title}>
            <div className={container}>
              <Dink
                className={text}
                path={frontmatter.path}
                title={frontmatter.title}
              />
              <div
                className={content}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
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
        path
        title
        template
      }
    }
  }
`

import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import Hero from '../components/Hero'
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
        <Hero />
        <section className={inSection}>
          <div id={frontmatter.path} className={outer} key={title}>
            <div className={container}>
              <Link className={text} to={frontmatter.path}>
                <h3>{frontmatter.title}</h3>
              </Link>
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

import React from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../layout'
import { siteTitle } from '../../data/SiteConfig'

export default ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark

  return (
    <Layout>
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
      {edges.map(({ node: { timeToRead, frontmatter } }) => {
        return (
          <div key={frontmatter.title}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
            <h2>
              {frontmatter.date} {timeToRead}
            </h2>
          </div>
        )
      })}
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
          frontmatter {
            title
            path
            date
          }
          timeToRead
        }
      }
    }
  }
`

import * as React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { siteTitle } from '../../data/SiteConfig'
import { inContainer, inSection } from './pages.module.scss'

export default ({ data: { cards } }) => {
  const { edges: cardsData } = cards

  return (
    <Layout>
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
      <div className={inContainer}>
        <Hero />
        <div className={inSection} />
        <Card cards={cardsData} />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    cards: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "card" } } }
      limit: 5
    ) {
      edges {
        node {
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
          html
        }
      }
    }
  }
`

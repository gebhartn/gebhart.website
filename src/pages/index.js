import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import Hero from '../components/Hero'
import Project from '../components/Project'
import Post from '../components/Post'
import { siteTitle } from '../../data/SiteConfig'
import { inContainer, inSection, inTitleText } from './pages.module.scss'

export default ({ data: { posts, projects } }) => {
  const { edges: postsData } = posts
  const { edges: projectsData } = projects

  return (
    <Layout>
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
      <div className={inContainer}>
        <Hero />
        <div className={inSection}>
          <h2 className={inTitleText}>Recent Projects</h2>
          <Project projects={projectsData} />
        </div>
        <div className={inSection}>
          <h2 className={inTitleText}>Recent Posts</h2>
          <Post posts={postsData} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "project" } } }
      limit: 5
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            source
            description
            path
            template
            date
          }
        }
      }
    }

    posts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
      limit: 5
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

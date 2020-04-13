import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Project from '../components/Project'
import Post from '../components/Post'
import { siteTitle } from '../../data/SiteConfig'
import { container, section, titleText } from './index.module.scss'

export default ({ data: { posts, projects } }) => {
  const { edges: postsData } = posts
  const { edges: projectsData } = projects

  return (
    <Layout>
      <SEO />
      <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
      <div className={container}>
        <Hero />
        <div className={section}>
          <h2 className={titleText}>Recent Projects</h2>
          <Project projects={projectsData} />
        </div>
        <div className={section}>
          <h2 className={titleText}>Recent Posts</h2>
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
          frontmatter {
            title
            source
            path
            description
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

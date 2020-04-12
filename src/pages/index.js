import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Project from '../components/Project'
import { siteTitle } from '../../data/SiteConfig'
import projects from '../../data/projects'
import { container, section, titleText } from './index.module.scss'

export default () => (
  <Layout>
    <SEO />
    <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
    <div className={container}>
      <Hero />
      <section className={section}>
        <h2 className={titleText}>Recent Projects</h2>
        <Project projects={projects} />
      </section>
    </div>
  </Layout>
)

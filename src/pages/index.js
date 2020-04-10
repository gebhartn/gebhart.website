import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Card from '../components/Card'
import { siteTitle } from '../../data/SiteConfig'
import projects from '../../data/projects'
import { container, section } from './index.module.scss'

export default () => (
  <Layout>
    <SEO />
    <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
    <div className={container}>
      <Hero />
      <section className={section}>
        <h2>Recent Projects</h2>
        <Card content={projects} />
      </section>
      <section className={section}>
        <h2>Recent Articles</h2>
        <Card content={projects} />
      </section>
    </div>
  </Layout>
)

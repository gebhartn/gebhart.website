import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import { siteTitle } from '../../data/SiteConfig'
import projects from '../../data/projects'
import { container, section } from './index.module.scss'

export default () => (
  <Layout>
    <SEO />
    <Helmet title={`${siteTitle} - Full Stack Software Developer`} />
    <div className={container}>
      <Hero />
    </div>
  </Layout>
)

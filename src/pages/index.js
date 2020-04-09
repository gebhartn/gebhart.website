import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'

export default () => (
  <Layout>
    <SEO />
    <Helmet title={`${config.siteTitle} - Full Stack Software Developer`} />
    <div>Hello World!</div>
  </Layout>
)

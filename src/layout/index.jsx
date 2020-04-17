import React from 'react'
import Helmet from 'react-helmet'
import SEO from '../components/SEO'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.ico'
import { container, content } from './layout.module.scss'

export default ({ children }) => (
  <>
    <SEO />
    <Helmet>
      <html lang="en" />
      <meta name="description" content={config.siteDescription} />
      <link rel="shortcut icon" type="image/png" href={favicon} />
    </Helmet>
    <div className={container}>
      <div className={content}>
        <Navigation />
        <main id="main">{children}</main>
      </div>
      <Footer />
    </div>
  </>
)

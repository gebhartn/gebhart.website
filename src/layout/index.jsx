import React from 'react'
import Helmet from 'react-helmet'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.webp'
import { container, content } from './layout.module.scss'

export default ({ children }) => (
  <>
    <Helmet>
      <meta name="description" content={config.siteDescription} />
      <link rel="shortcut icon" type="image/png" href={favicon} />
      <html lang="en" />
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

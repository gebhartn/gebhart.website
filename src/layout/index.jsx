import * as React from 'react'
import Helmet from 'react-helmet'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import { container, content } from './layout.module.scss'
import appletouch from '../images/apple-touch-icon.png'
import thirtytwo from '../images/favicon-32x32.png'
import sixteen from '../images/favicon-16x16.png'

export default ({ children }) => (
  <>
    <SEO />
    <Helmet>
      <html lang="en" />
      <meta name="description" content={config.siteDescription} />
      <link rel="apple-touch-icon" sizes="180x180" href={appletouch} />
      <link rel="icon" type="image/png" sizes="32x32" href={thirtytwo} />
      <link rel="icon" type="image/png" sizes="16x16" href={sixteen} />
    </Helmet>
    <div className={container}>
      <div className={content}>
        <Navigation />
        <main id="main">
          <Hero />
          {children}
        </main>
      </div>
      <Footer />
    </div>
  </>
)

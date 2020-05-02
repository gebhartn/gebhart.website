import * as React from 'react'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'
import config from '../../../data/SiteConfig'
import favicon from '../../images/favicon-32x32.png'

export default () => {
  const { pathname } = useLocation()
  const url = config.siteUrl + pathname

  return (
    <Helmet>
      <meta name="description" content={config.siteDescription} />
      <meta name="image" content={favicon} />

      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={config.siteTitle} />
      <meta name="twitter:description" content={config.siteDescription} />
    </Helmet>
  )
}

import * as React from 'react'
import Helmet from 'react-helmet'
import config from '../../../data/SiteConfig'
import favicon from '../../images/favicon.webp'

export default () => (
  <Helmet>
    <meta name="description" content={config.siteDescription} />
    <meta name="image" content={favicon} />
  </Helmet>
)

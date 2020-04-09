import React from 'react'
import config from '../../../data/SiteConfig'
import favicon from '../../images/favicon.webp'
import { container, face, heading, subHeading } from './hero.module.scss'

export default () => (
  <div className={container}>
    <img src={favicon} alt="Nicholas Gebhart" className={face} />
    <h1 className={heading}>{config.siteTitle}</h1>
    <h2 className={subHeading}>{config.siteDescriptionAlt}</h2>
  </div>
)

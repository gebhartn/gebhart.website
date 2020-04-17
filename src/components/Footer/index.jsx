import React from 'react'
import github from '../../images/github.svg'
import netlify from '../../images/netlify.svg'
import gatsby from '../../images/gatsby.svg'
import { siteRss } from '../../../data/SiteConfig'
import {
  footer,
  logo,
  logoContainer,
  linksContainer,
} from './footer.module.scss'

export default () => (
  <footer className={footer}>
    <div className={logoContainer}>
      <a href="https://github.com/gebhartn" title="Check out my Github">
        <img
          src={github}
          alt="GitHub Octocat Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.netlify.com" title="Distributed by Netlify">
        <img
          src={netlify}
          alt="Netlify Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.gatsbyjs.org" title="Powered by Gatsby">
        <img
          src={gatsby}
          alt="Gatsby Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
    </div>
    <div className={linksContainer}>
      <a
        href={siteRss}
        title="RSS feed"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS
      </a>
    </div>
  </footer>
)

import * as React from 'react'
import { Link } from 'gatsby'
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
      <a href="https://github.com/gebhartn/nicholas.dev" title="GitHub">
        <img
          src={github}
          alt="GitHub Octocat Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.netlify.com" title="Netlify">
        <img
          src={netlify}
          alt="Netlify Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.gatsbyjs.org" title="Gatsby">
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
      <Link to="/contact">Contact</Link>
    </div>
  </footer>
)

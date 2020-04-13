import React from 'react'
import { Link } from 'gatsby'
import github from '../../images/github.png'
import netlify from '../../images/netlify.svg'
import gatsby from '../../images/gatsby.svg'
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
          alt="Github Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.netlify.com" title="Distributed by Netlify">
        <img
          src={netlify}
          alt="Github Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
      <a href="https://www.gatsbyjs.org" title="Powered by Gatsby">
        <img
          src={gatsby}
          alt="Github Logo"
          className={logo}
          target="_blank"
          rel="noopener noreferrer"
        />
      </a>
    </div>
    <div className={linksContainer}>
      <Link
        to="/rss.xml"
        title="RSS feed"
        target="_blank"
        rel="noopener noreferrer"
      >
        RSS
      </Link>
    </div>
  </footer>
)

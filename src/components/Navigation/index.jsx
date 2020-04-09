import React from 'react'
import { Link } from 'gatsby'
import config from '../../../data/SiteConfig'
import icon from '../../images/favicon.webp'
import {
  nav,
  navContainer,
  brand,
  favicon,
  text,
  links,
  cta,
  scroll,
} from './navigation.module.scss'

export default () => {
  const [scrolled, setScrolled] = React.useState(false)

  const handleScroll = () =>
    window.scrollY > 20 ? setScrolled(true) : setScrolled(false)

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <nav className={scrolled ? `${nav} ${scroll}` : nav}>
      <div className={navContainer}>
        <div className={brand}>
          <Link to="/">
            <img src={icon} className={favicon} alt="Computer" />
            <span className={text}>{config.siteTitle}</span>
          </Link>
        </div>
        <div className={links}>
          {config.links.map(({ name, to }) => (
            <Link key={name} to={to}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

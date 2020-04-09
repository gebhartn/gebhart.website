import React from 'react'
import { Link } from 'gatsby'
import { links as navLinks } from '../../../data/SiteConfig'
import { nav, navContainer, links, scroll } from './navigation.module.scss'

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
        <div className={links}>
          {navLinks.map(({ title, name, to }) => (
            <Link title={title} key={name} to={to}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

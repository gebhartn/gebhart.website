import React from 'react'
import { Link } from 'gatsby'
import { links as navLinks } from '../../../data/SiteConfig'
import {
  nav,
  navContainer,
  links,
  scroll,
  text,
  brand,
  progressBar,
  progressContainer,
} from './navigation.module.scss'

export default () => {
  const [scrolled, setScrolled] = React.useState(false)

  const scrollBar = () => {
    const { body, documentElement } = document
    const windowScroll = body.scrollTop || documentElement.scrollTop
    const height = documentElement.scrollHeight - documentElement.clientHeight
    const isScrolled = (windowScroll / height) * 100
    document.getElementById('bar').style.width = `${isScrolled}%`
  }

  const handleScroll = () => {
    if (window.scrollY > 20) setScrolled(true)
    else setScrolled(false)
    scrollBar()
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      <nav className={scrolled ? `${nav} ${scroll}` : nav}>
        <div className={navContainer}>
          <div className={brand}>
            <Link to="/">
              <span className={text}>Nicholas Gebhart</span>
            </Link>
          </div>
          <div className={links}>
            {navLinks.map(({ title, name, to }) => (
              <Link title={title} key={name} to={to}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={
            scrolled ? `${progressContainer} ${scroll}` : progressContainer
          }
        >
          <div className={progressBar} id="bar" />
        </div>
      </nav>
    </>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import { links as data } from '../../../data/SiteConfig'
import {
  nav,
  navContainer,
  links,
  scroll,
  brand,
  progressBar,
  progressContainer,
} from './navigation.module.scss'

export default () => {
  const [scrolled, setScrolled] = React.useState(false)

  const handleProgressBar = () => {
    const { body, documentElement } = document
    const windowScroll = body.scrollTop || documentElement.scrollTop
    const height = documentElement.scrollHeight - documentElement.clientHeight
    const isScrolled = (windowScroll / height) * 100
    document.getElementById(`bar`).style.width = `${isScrolled}%`
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true)
      else setScrolled(false)
      handleProgressBar()
    }

    window.addEventListener(`scroll`, handleScroll)
    return () => window.removeEventListener(`scroll`, handleScroll)
  }, [])

  return (
    <nav className={scrolled ? `${nav} ${scroll}` : nav}>
      <div className={navContainer}>
        <div className={brand} />
        <div className={links}>
          {data.map(({ title, name, to }) => (
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
  )
}

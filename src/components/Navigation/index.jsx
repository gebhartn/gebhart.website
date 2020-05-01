import * as React from 'react'
import { Link } from 'gatsby'
import { links as data } from '../../../data/SiteConfig'
import {
  nav,
  navContainer,
  links,
  brand,
  scroll,
} from './navigation.module.scss'

export default () => {
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true)
      else setScrolled(false)
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
    </nav>
  )
}

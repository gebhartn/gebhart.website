import * as React from 'react'
import { Link } from 'gatsby'
import classNames from 'classnames'
import { useScroll } from '../../hooks'
import { links as data } from '../../../data/SiteConfig'
import {
  nav,
  navContainer,
  links,
  brand,
  scroll,
} from './navigation.module.scss'

export default () => {
  const scrolled = useScroll()
  const parentClasses = classNames(nav, { [scroll]: scrolled })

  return (
    <nav className={parentClasses}>
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

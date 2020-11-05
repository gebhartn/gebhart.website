import * as React from 'react'
import { Link } from 'gatsby'

const Dink = ({ path, title, className = `` }) => {
  return path.startsWith(`/`) ? (
    <Link className={className} to={path}>
      <h3>{title}</h3>
    </Link>
  ) : (
    <a href={path} target="_blank" rel="noopener noreferrer">
      <h3>{title}</h3>
    </a>
  )
}

export default Dink

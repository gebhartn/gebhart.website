import React from 'react'
import { Link } from 'gatsby'
import formatDate from '../../utils'
import {
  projects,
  each,
  title,
  buttons,
  button,
  small,
} from './post.module.scss'

export default ({ posts }) => {
  return (
    <section className={projects}>
      {posts.map(({ node: { frontmatter, timeToRead } }) => {
        const date = formatDate(frontmatter.date)

        return (
          <Link to={frontmatter.path} className={each} key={frontmatter.title}>
            <h2>
              <div className={title}>{frontmatter.title}</div>
              <small className={small}>{date}</small>
            </h2>
            <div className={buttons}>
              <span className={button}>{timeToRead} min read</span>
            </div>
          </Link>
        )
      })}
    </section>
  )
}

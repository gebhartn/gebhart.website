import React from 'react'
import { Link } from 'gatsby'
import {
  projects,
  each,
  link,
  title,
  buttons,
  button,
} from './post.module.scss'

export default ({ posts }) => {
  return (
    <section className={projects}>
      {posts.map(({ node: { frontmatter, timeToRead } }) => (
        <div className={each} key={frontmatter.title}>
          <h2>
            <Link className={link} to={frontmatter.path}>
              <div className={title}>{frontmatter.title}</div>
            </Link>
          </h2>
          <div className={buttons}>
            <Link className={link} to={frontmatter.path}>
              <span className={button}>{timeToRead} min read</span>
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}

import React from 'react'
import { Link } from 'gatsby'
import { projects, each, title, buttons, button } from './post.module.scss'

export default ({ posts }) => {
  return (
    <section className={projects}>
      {posts.map(({ node: { frontmatter, timeToRead } }) => (
        <Link to="/" className={each} key={frontmatter.title}>
          <h2>
            <div className={title}>{frontmatter.title}</div>
          </h2>
          <div className={buttons}>
            <span className={button}>{timeToRead} min read</span>
          </div>
        </Link>
      ))}
    </section>
  )
}

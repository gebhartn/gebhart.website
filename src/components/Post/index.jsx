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

export default ({ posts: content }) => {
  return (
    <section className={projects}>
      {content.map(({ node }) => (
        <div className={each} key={node.frontmatter.title}>
          <h2>
            <Link className={link} to={node.frontmatter.path}>
              <div className={title}>{node.frontmatter.title}</div>
            </Link>
          </h2>
          <div className={buttons}>
            <span className={button}>{node.timeToRead} min read</span>
          </div>
        </div>
      ))}
    </section>
  )
}

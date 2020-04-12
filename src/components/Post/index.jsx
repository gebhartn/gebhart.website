import React from 'react'
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
            <a
              className={link}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={title}>{node.frontmatter.title}</div>
            </a>
          </h2>
          <div className={buttons}>
            <span className={button}>{node.timeToRead} min read</span>
          </div>
        </div>
      ))}
    </section>
  )
}

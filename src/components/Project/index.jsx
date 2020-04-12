import React from 'react'
import {
  projects,
  each,
  link,
  title,
  buttons,
  button,
} from './project.module.scss'

export default ({ projects: content }) => {
  return (
    <section className={projects}>
      {content.map(({ node }) => (
        <div className={each} key={node.frontmatter.title}>
          <h2>
            <a
              className={link}
              href={node.frontmatter.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={title}>{node.frontmatter.title}</div>
            </a>
          </h2>
          <p>{node.frontmatter.description}</p>
          <div className={buttons}>
            <a
              className={button}
              href={node.frontmatter.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
            {node.frontmatter.path && (
              <a
                className={button}
                href={node.frontmatter.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

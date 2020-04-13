import React from 'react'
import {
  projects as projectsContainer,
  each,
  link,
  title,
  buttons,
  button,
} from './project.module.scss'

export default ({ projects }) => {
  return (
    <section className={projectsContainer}>
      {projects.map(({ node: { frontmatter } }) => (
        <div className={each} key={frontmatter.title}>
          <h2>
            <a
              className={link}
              href={frontmatter.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={title}>{frontmatter.title}</div>
            </a>
          </h2>
          <p>{frontmatter.description}</p>
          <div className={buttons}>
            <a
              className={button}
              href={frontmatter.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
            {frontmatter.path && (
              <a
                className={button}
                href={frontmatter.path}
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

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
      {content.map((project) => (
        <div className={each} key={project.title}>
          <h2>
            <a
              className={link}
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={title}>{project.title}</div>
            </a>
          </h2>
          <p>{project.description}</p>
          <div className={buttons}>
            <a
              className={button}
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              Code
            </a>
            {project.path && (
              <a
                className={button}
                href={project.path}
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

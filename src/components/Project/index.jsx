import React from 'react'
import { link, title, buttons, button, each } from './card.module.scss'

export default ({ projects }) => {
  return (
    <section className={projects}>
      {projects.map((project) => (
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
              Source
            </a>
            {project.path && (
              <a
                className={button}
                href={project.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}

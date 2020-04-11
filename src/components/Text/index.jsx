import React from 'react'
import {
  container,
  projectSection,
  singleProject,
  projectLink,
} from './text.module.scss'

export default ({ content }) => {
  return (
    <section className={projectSection}>
      {content.map((project) => (
        <div className={singleProject}>
          <a href={project.url} className={projectLink}>
            {project.name}
          </a>
        </div>
      ))}
    </section>
  )
}

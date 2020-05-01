import * as React from 'react'
import { Link } from 'gatsby'
import { projects, each, title } from './projectListing.module.scss'

export default ({ projects: data }) => {
  return (
    <section className={projects}>
      {data.map(({ node: { frontmatter, fields } }) => {
        return (
          <Link to={fields.slug} className={each} key={frontmatter.title}>
            <h2>
              <div className={title}>{frontmatter.title}</div>
              <div> {frontmatter.description}</div>
            </h2>
          </Link>
        )
      })}
    </section>
  )
}

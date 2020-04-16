import React from 'react'
import { Link } from 'gatsby'
import formatDate from '../../utils'
import { projects, each, title, small } from './postListing.module.scss'

export default ({ posts }) => (
  <section className={projects}>
    {posts.map(({ node: { frontmatter, timeToRead, fields } }) => {
      const date = formatDate(frontmatter.date)
      const read = `${timeToRead} min read`

      return (
        <Link to={fields.slug} className={each} key={frontmatter.title}>
          <h2>
            <div className={title}>{frontmatter.title}</div>
            <small className={small}>
              {date} &#8226; <span>{read}</span>
            </small>
          </h2>
        </Link>
      )
    })}
  </section>
)

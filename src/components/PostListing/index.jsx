import * as React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { formatDate } from '../../utils'
import { projects, each, title, small} from './postListing.module.scss'

export default ({ posts }) => (
  <section className={projects}>
    {posts.map(({ node: { frontmatter, timeToRead, fields } }) => {
      const date = formatDate(frontmatter.date)
      const read = `${timeToRead} min read`

      return (
        <Link to={fields.slug} className={each} key={frontmatter.title}>
            <Img
              fixed={frontmatter.featuredImage.childImageSharp.fixed}
              alt={title}
            />

            <div>
              <div className={title}>{frontmatter.title}</div>
              <small className={small}>
                {date} &#8226; <span>{read}</span>
              </small>
            </div>
        </Link>
      )
    })}
  </section>
)

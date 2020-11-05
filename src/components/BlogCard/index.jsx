import * as React from 'react'
import Img from 'gatsby-image'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'gatsby'
import { formatDate } from '../../utils'
import { each, title, small } from './blogCard.module.scss'

const BlogPost = ({ node: { frontmatter, timeToRead, fields } }) => {
  const isDesktop = useMediaQuery({ query: `(min-width: 620px)` })
  const date = formatDate(frontmatter.date)
  const read = `${timeToRead} min read`

  return (
    <Link to={fields.slug} className={each} key={frontmatter.title}>
      {isDesktop && (
        <div style={{ minWidth: `90px` }}>
          <Img
            fixed={frontmatter.featuredImage.childImageSharp.fixed}
            alt={title}
          />
        </div>
      )}

      <div>
        <div className={title}>{frontmatter.title}</div>
        <small className={small}>
          {date} &#8226; <span>{read}</span>
        </small>
      </div>
    </Link>
  )
}

export default BlogPost

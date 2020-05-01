import * as React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { container, outer, wrapper, content } from './card.module.scss'

export default ({ cards }) => (
  <section className="projects">
    {cards.map(({ node: { frontmatter, html } }) => {
      const { title, path, featuredImage } = frontmatter
      return (
        <section id={path} className={outer} key={title}>
          <div className={wrapper}>
            <Img fixed={featuredImage.childImageSharp.fixed} alt={title} />
          </div>
          <div className={container}>
            {path.startsWith(`/`) ? (
              <Link to={path}>
                <h3>{title}</h3>
              </Link>
            ) : (
              <a href={path}>
                <h3>{title}</h3>
              </a>
            )}

            <div
              className={content}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>
      )
    })}
  </section>
)

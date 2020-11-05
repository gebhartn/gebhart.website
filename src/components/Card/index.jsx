import * as React from 'react'
import Img from 'gatsby-image'
import Dink from '../Dink'

import { container, outer, wrapper, content } from './card.module.scss'

const Card = ({
  node: {
    frontmatter: { title, path, featuredImage },
    html,
  },
}) => (
  <section id={path} className={outer} key={title}>
    <div className={wrapper}>
      <Img fixed={featuredImage.childImageSharp.fixed} alt={title} />
    </div>
    <div className={container}>
      <Dink path={path} title={title} />
      <div className={content} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  </section>
)

export default Card

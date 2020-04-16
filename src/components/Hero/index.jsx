import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { siteTitle, siteDescriptionAlt, author } from '../../../data/SiteConfig'
import { container, face, heading, subHeading } from './hero.module.scss'

export default () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "favicon.webp" }) {
        childImageSharp {
          fixed(width: 85, height: 85) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  return (
    <div className={container}>
      <Img className={face} fixed={image.childImageSharp.fixed} alt={author} />
      <h1 className={heading}>{siteTitle}</h1>
      <h2 className={subHeading}>{siteDescriptionAlt}</h2>
    </div>
  )
}

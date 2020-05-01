import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import { siteTitle, siteDescriptionAlt, author } from '../../../data/SiteConfig'
import { container, face, heading, subHeading } from './hero.module.scss'

export default () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "face.jpg" }) {
        childImageSharp {
          fixed(width: 90, height: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <header className={container}>
      <Img className={face} fixed={image.childImageSharp.fixed} alt={author} />
      <Link to="/">
        <h1 className={heading}>{siteTitle}</h1>
      </Link>
      <h2 className={subHeading}>{siteDescriptionAlt}</h2>
    </header>
  )
}

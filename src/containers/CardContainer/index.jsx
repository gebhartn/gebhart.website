import * as React from 'react'
import Card from '../../components/Card'

const CardContainer = ({ cards }) => {
  return <section className="projects">{cards.map(Card)}</section>
}

export default CardContainer

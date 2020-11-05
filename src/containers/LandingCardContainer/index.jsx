import * as React from 'react'
import LandingCard from '../../components/LandingCard'

const LandingCardContainer = ({ cards }) => {
  return <section>{cards.map(LandingCard)}</section>
}

export default LandingCardContainer

import React from 'react'
import { Link } from 'gatsby'
import Layout from '../layout'
import SEO from '../components/SEO'

export default () => {
  // This is temporary
  return (
    <Layout>
      <SEO title="404: Not Found" />
      <div style={{ marginTop: '200px' }}>
        <h1>Not Found</h1>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    </Layout>
  )
}

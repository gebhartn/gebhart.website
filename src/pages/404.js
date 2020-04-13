import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import Layout from '../layout'

export default () => {
  // This is temporary
  return (
    <Layout>
      <Helmet title="404: Not Found" />
      <div style={{ marginTop: '200px' }}>
        <h1>Not Found</h1>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    </Layout>
  )
}

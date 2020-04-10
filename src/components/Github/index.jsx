import React from 'react'
import Helmet from 'react-helmet'

export default () => (
  <div className="container">
    <Helmet>
      <script async defer src="https://buttons.github.io/buttons.js"></script>
    </Helmet>

    <a
      className="github-button"
      href="https://github.com/gebhartn"
      data-size="large"
      data-show-count="true"
      aria-label="Follow @gebhartn on GitHub"
    >
      @gebhartn
    </a>
  </div>
)

import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

function ExternalAssets () {
  return (
    <Helmet>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="stylesheet" href={withPrefix('/assets/prism/prism.css')} />
    </Helmet>
  )
}

export default ExternalAssets

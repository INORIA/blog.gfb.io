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
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <script>{`if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }`}</script>
    </Helmet>
  )
}

export default ExternalAssets

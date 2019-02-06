import React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'

function ExternalAssets () {
  return (
    <Helmet>
      <script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        defer
      />
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

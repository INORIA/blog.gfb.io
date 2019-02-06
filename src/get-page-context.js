/* eslint-disable no-underscore-dangle... */

import { SheetsRegistry } from 'jss'
import {
  createMuiTheme,
  createGenerateClassName
} from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

// Create a theme with Gatsby brand colors. You can choose your own
const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: purple,
    secondary: green,
    background: {
      default: '#fff'
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: '1.9em',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.7)'
    },
    h2: {
      fontSize: '1.6em',
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 400
    },
    h3: {
      color: 'rgba(0, 0, 0, 0.6)',
      fontWeight: 500
    },
    body1: {
      lineHeight: '2',
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: '1em'
    },
    subtitle2: {
      color: 'rgba(0, 0, 0, 0.7)'
    },
    caption: {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  }
})

function createPageContext () {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName()
  }
}

export default function getPageContext () {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext()
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext()
  }

  return global.__INIT_MATERIAL_UI__
}

import React, { StrictMode } from 'react'
import { render } from 'react-dom'

import { Mapbox } from './components'

render(
  <StrictMode>
    <Mapbox />
  </StrictMode>,
  document.getElementById('root')
)

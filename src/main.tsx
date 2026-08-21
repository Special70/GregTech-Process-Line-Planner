import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphRenderer from './GraphRenderer.tsx'
import { GraphDataContextProvider } from './contexts/GraphDataContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphDataContextProvider>
      <GraphRenderer />
    </GraphDataContextProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphRenderer from './GraphRenderer.tsx'
import { GraphDataContextProvider } from './contexts/GraphDataContext.tsx'
import { AssetDataContextProvider } from './contexts/AssetDataContext.tsx'
import { MaterialSuggesterDataProvider } from './contexts/MaterialSuggesterDataContext.tsx'
import { ClientViewHandlerContextProvider } from './contexts/ClientViewHandlerContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ClientViewHandlerContextProvider>
    <MaterialSuggesterDataProvider>
      <AssetDataContextProvider>
        <GraphDataContextProvider>
          <GraphRenderer />
        </GraphDataContextProvider>
      </AssetDataContextProvider>
    </MaterialSuggesterDataProvider>
    </ClientViewHandlerContextProvider>
  </StrictMode>,
)

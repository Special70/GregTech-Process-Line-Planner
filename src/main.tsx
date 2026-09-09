import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphRenderer from './GraphRenderer.tsx'
import { GraphDataContextProvider } from './contexts/GraphDataContext.tsx'
import { AssetDataContextProvider } from './contexts/AssetDataContext.tsx'
import { MaterialSuggesterDataProvider } from './contexts/MaterialSuggesterDataContext.tsx'
import { ClientViewHandlerContextProvider } from './contexts/ClientViewHandlerContext.tsx'
import { ReactFlowProvider } from '@xyflow/react'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ClientViewHandlerContextProvider>
      <ReactFlowProvider>
        <GraphDataContextProvider>
          <MaterialSuggesterDataProvider>
            <AssetDataContextProvider>
              <GraphRenderer />
            </AssetDataContextProvider>
          </MaterialSuggesterDataProvider>
        </GraphDataContextProvider>
      </ReactFlowProvider>
    </ClientViewHandlerContextProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphRenderer from './GraphRenderer.tsx'
import { GraphDataContextProvider } from './contexts/GraphDataContext.tsx'
import { AssetDataContextProvider } from './contexts/AssetDataContext.tsx'
import { MaterialSuggesterDataProvider } from './contexts/MaterialSuggesterDataContext.tsx'
import { ClientViewHandlerContextProvider } from './contexts/ClientViewHandlerContext.tsx'
import { ReactFlowProvider } from '@xyflow/react'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
    <ClientViewHandlerContextProvider>
      <ReactFlowProvider>
        <GraphDataContextProvider>
          <MaterialSuggesterDataProvider>
            <AssetDataContextProvider>

              <Routes>
                <Route path="/" element={<GraphRenderer />} />
              </Routes>
            </AssetDataContextProvider>
          </MaterialSuggesterDataProvider>
        </GraphDataContextProvider>
      </ReactFlowProvider>
    </ClientViewHandlerContextProvider>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import Provider from './components/provider/provider.tsx'
import { ThemeProvider } from '@material-tailwind/react'
import { RouterProvider } from 'react-router-dom'
import {router} from "./routes.tsx"
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)

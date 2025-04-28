import { BrowserRouter } from 'react-router-dom'
import { Provider } from "@/components/ui/Provider"
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
)

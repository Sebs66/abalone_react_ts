import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from './context/board.tsx';

const el = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <Provider>
      <App/>
    </Provider>
  </React.StrictMode>
)

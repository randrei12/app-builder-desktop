import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './main.scss';
import './scss/components/scrollBar.scss';
import { ContextProvider } from './hooks/context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ContextProvider> {
        +import.meta.env.VITE_PRODUCTION ? <App /> : <React.StrictMode><App /></React.StrictMode>
    } </ContextProvider>
)

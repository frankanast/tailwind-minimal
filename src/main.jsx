// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
    // Need to disable StrictMode due to react-draft-wysiwyg incompatibility.
    // We leave it commented because we will restore is as soon as we find a good, free alternative to that library.
    // <StrictMode>
    <App />
    // </StrictMode>
)

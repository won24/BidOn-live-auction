import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { SignupProvider } from './pages/signup/SignupContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <SignupProvider>
            <App />
        </SignupProvider>
    </CookiesProvider>
);
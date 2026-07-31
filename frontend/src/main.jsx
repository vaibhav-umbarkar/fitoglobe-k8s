import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Handle deep link OAuth callback
if (window.Capacitor?.isNativePlatform?.()) {
  import('@capacitor/app').then(({ App: CapApp }) => {
    CapApp.addListener('appUrlOpen', ({ url }) => {
      const urlObj = new URL(url);
      const token = urlObj.searchParams.get('token');
      const onboarding = urlObj.searchParams.get('onboarding');
      if (token) {
        localStorage.setItem('fitoglobe_token', token);
        window.location.href = onboarding === 'true' ? '/?onboarding=true' : '/';
      }
    });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
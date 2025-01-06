import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './styles/globals.css';

const antTheme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
};

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ConfigProvider theme={antTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

const errorHandler = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error('Uncaught error:', error, errorInfo);
};

window.addEventListener('error', (event) => {
  event.preventDefault();
  errorHandler(event.error, { componentStack: '' });
});

window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault();
  errorHandler(event.reason, { componentStack: '' });
});

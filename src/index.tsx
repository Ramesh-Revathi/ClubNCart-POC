import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import  './assets/fontAwesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppFooterSection from './components/AppFooterSection/AppFooterSection';
import { DataProvider } from './hooks/DataContext';
import { AuthProvider } from './hooks/AuthContext';
import MapComponent from './components/MapComponent/MapComponent';
import 'leaflet/dist/leaflet.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <DataProvider>
    <App />
    </DataProvider>
    </AuthProvider>

      </BrowserRouter>
  </React.StrictMode>
);

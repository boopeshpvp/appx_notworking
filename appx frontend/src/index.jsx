import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './index.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ContextWrapper from './containers/user-panel/userEvent/context/contextWrapper';
import store from './service/store';
const supabase = createClient(
  "https://kbxtmrhsacflpbubrfsz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieHRtcmhzYWNmbHBidWJyZnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3OTk4MjIsImV4cCI6MjAwODM3NTgyMn0.Ce7azQjG2-Cy4CbauloVMK2XcmA6I6vPA0FODWQ9RbA"
)

const persistor=persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <React.StrictMode>
          <ContextWrapper>
            <SessionContextProvider supabaseClient={supabase}>
              <App />
            </SessionContextProvider >
          </ContextWrapper>
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);


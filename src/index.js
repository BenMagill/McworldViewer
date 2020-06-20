import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {DataProvider} from "./store/DataStore"
import App from './App';

ReactDOM.render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);
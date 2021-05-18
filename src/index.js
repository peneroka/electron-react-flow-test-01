import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App_a1';
import reportWebVitals from './reportWebVitals';
// import ReactFlowProvider from 'react-flow-renderer';

// import SaveRestore from './components/SaveRestore'

// import {Provider} from 'react-redux';
// import { createStore, applyMiddleware } from 'redux'; 
// const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
  <React.StrictMode>
    {/* <ReactFlowProvider> */}
    <App />
    {/* </ReactFlowProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
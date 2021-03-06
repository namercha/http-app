import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import logger from './services/logService';
import 'bootstrap/dist/css/bootstrap.css';

// Enable Sentry logging service
//logger.init();

ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();
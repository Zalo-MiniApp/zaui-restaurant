// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';

// Import ZMP
import ZMP from 'zmp-framework/core/lite-bundle';

// Import ZMP-React Plugin
import ZMPReact from 'zmp-framework/react';

// Import tailwind styles
  import './css/styles.css';

// Import ZMP Styles
import 'zmp-framework/zmp-bundle.min.css';

// Import Icons and App Custom Styles
import './css/icons.css';
import './css/app.scss';

// Import App Component
import App from './components/app';
import appConfig from '../app-config.json';

if (!(window as any).APP_CONFIG) {
  (window as any).APP_CONFIG = appConfig
} 

// Init ZMP React Plugin
ZMP.use(ZMPReact)

// Mount React App
ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'),
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app.js';
// import './styles.css';  // Importing global styles

// import { Provider } from 'react-redux';
// import store from './redux/store.js';  // Redux store

// ReactDOM.render(
//   <Provider store={store}>  {/* Wrapping the app with Redux */}
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<h1>Hello World</h1>);
// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<h1>Hello, Sports Tracker!</h1>);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';  // Ensure this path is correct
import './styles.css';    // Include your styles if needed

 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(<App />);


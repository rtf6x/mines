import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app.jsx';
import reducer from './reducers';

require('./css/normalize.css');
require('./css/fork.min.css');
require('./css/main.css');

document.oncontextmenu = function () {
  return false;
};

const store = createStore(reducer);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}>
    <App/>
</Provider>);

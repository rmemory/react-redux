import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App.jsx';

require.context('./images', true, /\.(jpg|png|svg)$/);

ReactDOM.render(<App />, document.getElementById('app'));

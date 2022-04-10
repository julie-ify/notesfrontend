import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppState } from './redux/appState';
import './styles/index.css';
import App from './components/App';
import store from './redux/configureStore';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppState>
				<Router>
					<App />
				</Router>
			</AppState>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppContext, { AppStateProvider } from './AppState.jsx';
import WelcomePage from './WelcomePage.jsx';

const AppConsumer = () => (
	<AppContext.Consumer>
		{context => <BaseApp context={context} /> }
	</AppContext.Consumer>
);

class BaseApp extends Component {
	// componentDidMount() {
	// 	const { isCycling } = this.props.context.state;
	// 	console.log('isCycling is ' + isCycling);
	// }

	/*
	 * React's Error Boundary life cycle method
	 *
	 * According to the docs, "error boundaries only catch errors in the
	 * components below them in the tree. An error boundary can’t catch
	 * an error within itself." Which is why it is implemented here.
	 */
	componentDidCatch(error, info) {
		const { context } = this.props;
		const { addErrors } = context;
		addErrors([error]);

		// Log the error
		console.error(error, info);
	}

	render() {
		return <WelcomePage />;
	}
}

BaseApp.propTypes = {
	context: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const App = () => (
	<AppStateProvider>
		<AppConsumer />
	</AppStateProvider>
);

export default App;

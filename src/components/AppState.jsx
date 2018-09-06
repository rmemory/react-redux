/* eslint-disable react/jsx-indent-props,
   react/no-access-state-in-setstate, react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// The context
const AppContext = React.createContext();

// State provider
class AppStateProvider extends Component {
	state = {
		errors: [],
		isCycling: false,
		isCurrentConditionsLoading: false,
		weatherConditions: {
			zip: '',
			datetime: 0,
			description: '',
			main: {},
			weather: {},
		},

		isForecastLoading: false,
		weatherForecast: {
			zip: '',
			data: [],
		},
	}

	render() {
		/* The child element of a consumer must always be a function and it
		   must always only return a single element. */
		const { children } = this.props;
		const { errors, isCycling } = this.state;
		return (
			<AppContext.Provider
				value={{
					state: this.state,

					// State API
					clearErrors: () => this.setState({
						errors: [],
					}),
					addErrors: newErrors => this.setState({
						errors: [...errors, ...newErrors],
					}),
					toggleCycling: () => this.setState({
						isCycling: !isCycling,
					}),
					setWeatherConditions: weatherConditions => this.setState({
						weatherConditions,
					}),
					setCurrentConditionsLoading: isCurrentConditionsLoading => this.setState({
						isCurrentConditionsLoading,
					}),
					setForecastLoading: isForecastLoading => this.setState({
						isForecastLoading,
					}),
					setForecast: weatherForecast => this.setState({
						weatherForecast,
					}),
				}}
			>
				{ children }
			</AppContext.Provider>
		);
	}
}

AppStateProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default AppContext;
export { AppStateProvider };

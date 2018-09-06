/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React from 'react';

import AppContext from './AppState.jsx';
import DayItem from './DayItem.jsx';
import Loading from './Loading.jsx';

import { convertKelvinToFahrenheit } from '../utils/helpers';

const WeatherConditions = () => (
	<AppContext.Consumer>
		{context => (
			<div>
				{context.state.isCurrentConditionsLoading
					&& <Loading text="Loading weather data" />
				}

				{!context.state.isCurrentConditionsLoading && context.state.weatherConditions
					&& (
						<div>
							<div className="description-container">
								{/* <p>JSON.stringify(context.state, null, 2)</p> */}
								<p>Current weather conditions in {context.state.weatherConditions.zip}:</p>
								<p>min temp: {convertKelvinToFahrenheit(context.state.weatherConditions.main.temp_min)} degrees</p>
								<p>max temp: {convertKelvinToFahrenheit(context.state.weatherConditions.main.temp_max)} degrees</p>
								<p>humidity: {context.state.weatherConditions.main.humidity}%</p>
								<DayItem />
							</div>
						</div>
					)
				}
			</div>
		)}
	</AppContext.Consumer>
);

export default WeatherConditions;

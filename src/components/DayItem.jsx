import React from 'react';

import AppContext from './AppState.jsx';
import Loading from './Loading.jsx';

import { getDate } from '../utils/helpers';

const DayItem = () => (
	<AppContext.Consumer>
		{context => (
			<div>
				{context.state.isCurrentWeatherLoading
					&& <Loading text="Loading weather data" />
				}

				{!context.state.isCurrentWeatherLoading
					&& context.state.weatherConditions.weather.icon
					&& context.state.weatherConditions.datetime
					&& (
						<div className="dayContainer">
							{/* <p>{JSON.stringify(context.state.weatherConditions.weather, null, 2)}</p> */}
							<h2 className="subheader">{getDate(context.state.weatherConditions.datetime)}</h2>
							<img className="weather" src={`/images/weather-icons/${context.state.weatherConditions.weather.icon}.svg`} alt="Weather" />
							<p>{context.state.weatherConditions.weather.description}</p>
						</div>
					)
				}
			</div>
		)}
	</AppContext.Consumer>
);

export default DayItem;

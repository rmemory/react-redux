/* eslint-disable no-underscore-dangle, no-restricted-globals */

/*
 * This file provides a basic interface to openweathermap
 */

const axios = require('axios');

const _baseURL = 'http://api.openweathermap.org/data/2.5/';
const _APIKEY = 'a561877e553311308de8d78303c76b39';


// Default data for queries
const baseQueryStringData = {
	type: 'accurate',
	APPID: _APIKEY,
	cnt: 5,
};

// Base functions

const callAxios = url => axios.get(url)
	.then(response => ({ data: response.data }));

const prepRouteParams = queryStringData => Object.keys(queryStringData).map(
	key => `${key}=${encodeURIComponent(queryStringData[key])}`)
	.join('&');

const prepUrl = (type, queryStringData) => `${_baseURL}${type}?${prepRouteParams(queryStringData)}`;

// Latitude and longitude specific functions
const getCurrentPosition = () => {
	if (navigator.geolocation) {
		return new Promise(
			(resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			},
		);
	}
	throw new Error('Geolocation is not supported by this browser.');
};

const loadCurrentPosition = async () => {
	try {
		const position = await getCurrentPosition();
		return ({
			coords: position.coords,
		});
	} catch (error) {
		let errMsg;

		switch (error.code) {
		case error.PERMISSION_DENIED:
			errMsg = 'User denied the request for Geolocation.';
			break;
		case error.POSITION_UNAVAILABLE:
			errMsg = 'Location information is unavailable.';
			break;
		case error.TIMEOUT:
			errMsg = 'The request to get user location timed out.';
			break;
		case error.UNKNOWN_ERROR:
		default:
			errMsg = 'An unknown geolocation error occurred.';
			break;
		}
		return ({
			errMsg,
		});
	}
};

// Get current location if coordinates not supplied
const checkCoords = async (lat, lon) => {
	let newLat = Number(lat);
	let newLon = Number(lon);
	let errMsg = null;

	if (isNaN(newLat) || newLat < 0 || isNaN(newLon) || newLon < 0) {
		await loadCurrentPosition()
			.then((response) => {
				if (response.coords !== undefined) {
					newLat = response.coords.latitude;
					newLon = response.coords.longitude;
				} else if (response.errMsg && response.errMsg !== '') {
					errMsg = response.errMsg; // eslint-disable-line prefer-destructuring
				} else {
					errMsg = 'A Geolocation error occured';
				}
			});
	}
	if (errMsg !== null) {
		return ({
			errMsg,
		});
	}
	return ({
		lat: newLat,
		lon: newLon,
	});
};

const latLonQueryStringData = (lat, lon) => Object.assign({ lat, lon }, baseQueryStringData);

const getCurrentWeatherByLatLon = (lat, lon) => checkCoords(lat, lon)
	.then((locationData) => {
		if (locationData.lat && locationData.lon) {
			// Location is sane
			const queryStringData = latLonQueryStringData(locationData.lat, locationData.lon);
			const url = prepUrl('weather', queryStringData);

			return callAxios(url)
				.then(response => response)
				.catch(error => error);
		}
		return ({
			errMsg: locationData.errMsg,
		});
	});

const getForecastByLatLon = (lat, lon) => checkCoords(lat, lon)
	.then((locationData) => {
		if (locationData.lat && locationData.lon) {
			// Location is sane
			const queryStringData = latLonQueryStringData(locationData.lat, locationData.lon);
			const url = prepUrl('forecast', queryStringData);

			return callAxios(url)
				.then(response => response)
				.catch(error => error);
		}
		return ({
			errMsg: locationData.errMsg,
		});
	});

// City string apis
const cityQueryStringData = city => Object.assign({ q: city }, baseQueryStringData);

const getCurrentWeatherByCity = (city) => {
	const queryStringData = cityQueryStringData(city);
	const url = prepUrl('weather', queryStringData);

	return callAxios(url);
};

const getForecastByCity = (city) => {
	const queryStringData = cityQueryStringData(city);
	const url = prepUrl('forecast', queryStringData);

	return callAxios(url);
};

// City ID apis
// TODO

export { getCurrentWeatherByLatLon };
export { getForecastByLatLon };
export { getCurrentWeatherByCity };
export { getForecastByCity };

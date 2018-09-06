/**
 * Convert a value in kelvin to farhenheit.
 *
 * By default, openweather reports temperatures in Kelvin. This
 * function converts a value in kelvin to farhenheit.
 *
 * @param {Number} kelvin value in degrees kelvin.
 *
 * @return {Number} value in fahrenheit.
 */
const convertKelvinToFahrenheit = kelvin => parseInt(((kelvin - 273.15) * 1.8000 + 32.00), 10);

// Maps used by getDate
const daysMap = {
	0: 'Sunday',
	1: 'Monday',
	2: 'Tuesday',
	3: 'Wednesday',
	4: 'Thursday',
	5: 'Friday',
	6: 'Saturday',
};

const monthsMap = {
	0: 'Jan',
	1: 'Feb',
	2: 'Mar',
	3: 'Apr',
	4: 'May',
	5: 'June',
	6: 'July',
	7: 'Aug',
	8: 'Sept',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec',
};

/**
 * Get day, month, and date string based on a unix time stamp.
 *
 * On the unix command line, you can obtain the number of seconds since January
 * 1st, 1970 by using the following command:
 *
 * $ date +%s
 * 1534444011
 *
 * This function takes that value (typically it will be the current timestamp
 * but could be any timestamp), and multiplies it by 1000 which transform the
 * value from seconds to milliseconds. This is because Java Script's Date API
 * expects input values in milliseconds. This function uses the maps above to
 * convert it into a string in the format of "Saturday, Dec 23".
 *
 * @param {Number} unixTimeStamp number of seconds since January 1st, 1970 at UTC.
 *
 * @return {String} in the format of "Saturday, Dec 23"
 */
const getDate = (unixTimeStamp) => {
	const date = new Date(unixTimeStamp * 1000);

	const day = daysMap[date.getDay()];
	const monthAndDate = `${monthsMap[date.getMonth()]} ${date.getDate()}`;
	return `${day}, ${monthAndDate}`;
};

// Exported API
export { convertKelvinToFahrenheit };
export { getDate };

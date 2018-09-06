/* eslint-disable react/jsx-indent-props, react/jsx-one-expression-per-line */

import React from 'react';
import PropTypes from 'prop-types';

// import ZipCode from './ZipCode.jsx';

const NavBar = ({ history }) => (
	<div className="navbar">
		<h1>
			The weather app
		</h1>
		{/* Temporarily comment this out until I sort out the DayItem and Forecast */}
		{/* <ZipCode
			direction="row"
			onSubmitZipcode={(city) => {
				history.push({
					pathname: '/forecast',
					search: `?city=${city}`,
				});
			}}
		/> */}
	</div>
);

NavBar.propTypes = {
	history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NavBar;

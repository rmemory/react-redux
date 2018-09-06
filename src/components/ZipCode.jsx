/* eslint-disable react/jsx-indent-props, react/jsx-one-expression-per-line,
   react/jsx-wrap-multilines, indent, react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ZipCode extends Component {
	state = {
		zip: '',
	};

	handleSubmitZipcode = () => {
		const { onSubmitZipcode } = this.props;
		const { zip } = this.state;

		onSubmitZipcode(zip);

		this.setState({
			zip: '',
		});
	}

	handleUpdateZipcode = (e) => {
		const zip = e.target.value;
		this.setState({
			zip,
		});
	}

	render() {
		const { direction } = this.props;
		const { zip } = this.state;
		return (
			<div
				className="zipcode-container"
				style={{ flexDirection: { direction } }}
			>
				<input
					className="form-control"
					onChange={this.handleUpdateZipcode}
					type="text"
					value={zip}
				/>
				<button
					type="button"
					style={{ margin: 10 }}
					className="btn btn-success"
					onClick={this.handleSubmitZipcode}
				>
					Get Forecast
				</button>
			</div>
		);
	}
}


ZipCode.defaultProps = {
	direction: 'column',
};

ZipCode.propTypes = {
	onSubmitZipcode: PropTypes.func.isRequired,
	direction: PropTypes.string,
};
export default ZipCode;

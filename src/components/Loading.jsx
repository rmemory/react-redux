import React from 'react';
import PropTypes from 'prop-types';

const styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px',
	},
};

class Loading extends React.Component {
	state = {
		text: this.props.text, // eslint-disable-line react/destructuring-assignment
	}

	componentDidMount() {
		const { text: stateText } = this.state;
		const { text: propsText, speed } = this.props;

		const stopper = `${propsText}...`;

		this.interval = window.setInterval(() => {
			if (stateText === stopper) {
				// Reset the loading text to contain no trailing dots
				this.setState({
					text: propsText,
				});
			} else {
				const prevState = stateText;
				// Add one more dot to the end
				this.setState({
					text: `${prevState}.`,
				});
			}
		}, speed);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		const { text: stateText } = this.state;
		return (
			<p style={styles.content}>
				{stateText}
			</p>
		);
	}
}

Loading.propTypes = {
	text: PropTypes.string,
	speed: PropTypes.number,
};

Loading.defaultProps = {
	text: 'Loading',
	speed: 200, // in milliseconds
};

export default Loading;

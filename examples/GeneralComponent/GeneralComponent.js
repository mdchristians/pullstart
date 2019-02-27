import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class GeneralComponent extends Component {
	static propTypes = {};
	static defaultProps = {};

	render() {
		return (
			<div dashCase="general-component">
				<h1>GeneralComponent</h1>
			</div>
		)
	}
}

export default GeneralComponent;


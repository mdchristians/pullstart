import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class PureComponent extends PureComponent {
	static propTypes = {};
	static defaultProps = {};

	render() {
		return (
			<div className="pure-component">
				<h1>PureComponent</h1>
			</div>
		)
	}
}

export default PureComponent;


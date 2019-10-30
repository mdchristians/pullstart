import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getConnectedComponent } from '../../connectedComponent/actions';

export class ConnectedComponent extends Component {
	static propTypes = {};
	static defaultProps = {};

	componentDidMount() {
		this.props.getConnectedComponent();
	}

	render() {
		return (
			<div className="connected-component">
				<h1>ConnectedComponent</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  isLoading: state.connectedComponent.isLoading,
  connectedComponent: state.connectedComponent.connectedComponent
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      getConnectedComponent
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);


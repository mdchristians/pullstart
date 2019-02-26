/**
 * REDUX ACTIONS
 */
function createReduxActions(compName) {
	const camelCase = toCamelCase(compName);
	const typeName  = toSnakeCase(compName).toUpperCase();
	const endpoint  = compName.toLowerCase();

	return `import axios from 'axios';
import * as types from './types';
import { API } from '../../utils/constants';

export const get${camelCase} = () => {
	return dispatch => {
		dispatch({ type: TYPES.GET_${typeName}_PENDING });

		axios
			.get(\`\$\{API}/${endpoint}\`)
			.then(response => {
				dispatch({
					type: TYPES.GET_${typeName}_SUCCESS,
					payload: response.data
				})
			})
			.catch(error => {
				dispatch({
					type: TYPES.GET_${typeName}_ERROR,
					payload: error
				})
			})
	}
};
`;
}

/**
 * REDUX REDUCER
 */
function createReduxReducer(compName) {
	const camelCase = toCamelCase(compName);
	const typeName = toSnakeCase(compName).toUpperCase();

	return `import * as TYPES from './types';

const initialState = {
	isLoading: false,
	${camelCase}: {}
}

export const ${camelCase}Reducer = (state = initialState, action) => {
	switch (action.type) {
		/**
		 * GET_${typeName}
		 */
		case TYPES.GET_${typeName}_PENDING:
			return {
				...state,
				isLoading: true
			};
		case TYPES.GET_${typeName}_SUCCESS:
			return {
				...state,
				isLoading: false,
				${camelCase}: action.payload
			};
		case TYPES.GET_${typeName}_ERROR:
			return {
				...state,
				isLoading: false,
				error: action.payload
			};

		default:
      return state;
	}
};
`;
}

/**
 * REDUX TYPES
 */
function createReduxTypes(compName) {
	const camelCase = toCamelCase(compName);
	const typeName = toSnakeCase(compName).toUpperCase();

	return `// get${camelCase}
GET_${typeName}_PENDING = 'GET_${typeName}_PENDING';
GET_${typeName}_SUCCESS = 'GET_${typeName}_SUCCESS';
GET_${typeName}_ERROR = 'GET_${typeName}_ERROR';
`;
}

/**
 * INDEX FILE
 */
function createComponentIndex(compName) {
	const camelCase = toCamelCase(compName);
	const typeName = toSnakeCase(compName).toUpperCase();

	return `export default './${compName}'`;
}

/**
 * SCSS FILE
 */
function createComponentScss(compName) {
	const dashCase = toDashCase(compName).toLowerCase();

	return `.${dashCase} {}`;
}

/**
 * PURE COMPONENT
 */
function createFunctionalComponent(compName) {
	const camelCase = toCamelCase(compName);
	const dashCase = toDashCase(compName).toLowerCase();
	
	return `import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};
const defaultProps = {};

function ${compName}(props) {
	return (
		<div className="${dashCase}">
			<h1>${compName}</h1>
		</div>
	)
};

${camelCase}.propTypes = propTypes;
${camelCase}.defaultProps = defaultProps;

export default ${camelCase};
`;
}

/**
 * PURE COMPONENT
 */
function createConnectedComponent(compName) {
	const camelCase = toCamelCase(compName);
	const dashCase = toDashCase(compName).toLowerCase();
	
	return `import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get${compName} } from '../../${camelCase}/actions';

export class ${compName} extends Component {
	static propTypes = {};
	static defaultProps = {};

	componentDidMount() {
		this.props.get${compName}();
	}

	render() {
		return (
			<div className="${dashCase}">
				<h1>${compName}</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  isLoading: state.${camelCase}.isLoading,
  ${camelCase}: state.${camelCase}.${camelCase}
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      get${compName}
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(${compName});
`;
}


function createComponent(compName, compType) {
	const camelCase = toCamelCase(compName);
	const dashCase  = toDashCase(compName).toLowerCase();
	
	return `import React, { ${compType} } from 'react';
import PropTypes from 'prop-types';

export class ${compName} extends ${compType} {
	static propTypes = {};
	static defaultProps = {};

	render() {
		return (
			<div className="${dashCase}">
				<h1>${compName}</h1>
			</div>
		)
	}
}

export default ${compName};
`;
}

/**
 * UTILS
 */
function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function toSnakeCase(str) {
	return str.replace(/(?:^|\.?)([A-Z])/g, function (x,y) {
		return "_" + y.toLowerCase()
	}).replace(/^_/, "");
}

function toDashCase(str) {
	return str.split(/(?=[A-Z])/).join('-').toLowerCase();
}


module.exports = {
	createReduxActions,
	createReduxReducer,
	createReduxTypes,
	createComponentIndex,
	createComponentScss,
	createFunctionalComponent,
	createConnectedComponent,
	createComponent
}

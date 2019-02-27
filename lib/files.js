/**
 * Creates a redux action with an example/temporary
 * API call as well.
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the action's contents.
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
 * Creates a redux reducer with an example that goes
 * with the action's API call
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the reducer's contents.
 */
function createReduxReducer(compName) {
	const camelCase = toCamelCase(compName);
	const typeName  = toSnakeCase(compName).toUpperCase();

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
 * Creates redux types for the examples in the actions
 * and reducer files.
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the type's contents.
 */
function createReduxTypes(compName) {
	const camelCase = toCamelCase(compName);
	const typeName  = toSnakeCase(compName).toUpperCase();

	return `// get${camelCase}
GET_${typeName}_PENDING = 'GET_${typeName}_PENDING';
GET_${typeName}_SUCCESS = 'GET_${typeName}_SUCCESS';
GET_${typeName}_ERROR = 'GET_${typeName}_ERROR';
`;
}

/**
 * Creates the index.js for easier rollup and error logging
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the component's contents.
 */
function createComponentIndex(compName) {
	const camelCase = toCamelCase(compName);
	const typeName  = toSnakeCase(compName).toUpperCase();

	return `export default './${compName}'`;
}

/**
 * Creates a basic scss file with a class that is to be the 
 * parent of all styles for the component.
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the component's contents.
 */
function createComponentScss(compName) {
	const dashCase = toDashCase(compName).toLowerCase();

	return `.${dashCase} {}`;
}

/**
 * Creates a basic functional component.
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the component's contents.
 */
function createFunctionalComponent(compName) {
	const camelCase = toCamelCase(compName);
	const dashCase  = toDashCase(compName).toLowerCase();
	
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
 * Creates a "connected" component that works with Redux. This
 * is also setup with an example of mapping state to props and 
 * mapping dispatch to props.
 * 
 * @param  {string} compName - The name that was input.
 * @return {string}          - A string of the component's contents.
 */
function createConnectedComponent(compName) {
	const camelCase = toCamelCase(compName);
	const dashCase  = toDashCase(compName).toLowerCase();
	
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

/**
 * Creates a general React component or a PureComponent depending
 * on what was asked for in the CLI.
 * 
 * @param  {string} compName - The name that was input.
 * @param  {string} compType - The type of component (Component or PureComponent).
 * @return {string}          - A string of the component's contents.
 */
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
 * Converts a string to camel case.
 *
 * Ex: HelloWorld => helloWorld
 * 
 * @param  {string} str - String to be converted.
 * @return {string}     - The converted string.
 */
function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

/**
 * Converts a string to snake case.
 *
 * Ex: HelloWorld => Hello_World
 * 
 * @param  {string} str - String to be converted.
 * @return {string}     - The converted string.
 */
function toSnakeCase(str) {
	return str.replace(/(?:^|\.?)([A-Z])/g, function (x,y) {
		return "_" + y.toLowerCase()
	}).replace(/^_/, "");
}

/**
 * Converts a string to dash case.
 *
 * Ex: HelloWorld => hello-world
 * 
 * @param  {string} str - String to be converted.
 * @return {string}     - The converted string.
 */
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

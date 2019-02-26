const qoa = require('qoa');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { 
	createReduxActions,
	createReduxReducer,
	createReduxTypes,
	createComponentIndex,
	createComponentScss,
	createFunctionalComponent,
	createConnectedComponent,
	createComponent
} = require('./lib/files');

const kickoff = async () => {
	const packageType = await qoa.interactive({
		query  : 'What are we generating?',
		handle : 'packageType',
		symbol : '>',
		menu   : [
		  'Redux Service',
    	'Connected Component',
			'Component',
			'PureComponent',
			'Functional Component'
		]
	});

	const packageName = await qoa.input({
		query  : `Name of the ${packageType.packageType}?`,
		handle : 'packageName'
	});

	return Object.assign({}, packageType, packageName);
}

kickoff()
	.then(packageInfo => {
		const { packageType, packageName } = packageInfo;
		const rootPath  = path.resolve(packageName);
		const dirName   = toCamelCase(packageName);
		const compScss  = createComponentScss(packageName);
		const compIndex = createComponentIndex(packageName);

		if(packageType === 'Redux Service') {
  		const actions  = createReduxActions(packageName);
			const reducer  = createReduxReducer(packageName);
			const types    = createReduxTypes(packageName);

			// Create the directory
  		fs.ensureDirSync(dirName);
			
			// Create actions.js
  		fs.writeFileSync(
			  path.join(rootPath, `actions.js`),
			  actions + os.EOL
			);
			
			// Create reducer.js
			fs.writeFileSync(
			  path.join(rootPath, `reducer.js`),
			  reducer + os.EOL
			);

			// Create types.js
			fs.writeFileSync(
			  path.join(rootPath, `types.js`),
			  types + os.EOL
			);

  		process.exit(1)
		}

		else if(packageType === 'Functional Component') {
			const functionalComponent = createFunctionalComponent(packageName);

			// Create the directory
  		fs.ensureDirSync(packageName);
			
			// Create index
  		fs.writeFileSync(
			  path.join(rootPath, `index.js`),
			  compIndex + os.EOL
			);
			
			// Create scss
			fs.writeFileSync(
			  path.join(rootPath, `${dirName}.scss`),
			  compScss + os.EOL
			);

			// Create component
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.js`),
			  functionalComponent + os.EOL
			);

			// Create component test
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.test.js`),
			  '// test' + os.EOL
			);
		}

		else if(packageType === 'Connected Component') {
			const compConnected = createConnectedComponent(packageName);

			// Create the directory
  		fs.ensureDirSync(packageName);
			
			// Create index
  		fs.writeFileSync(
			  path.join(rootPath, `index.js`),
			  compIndex + os.EOL
			);
			
			// Create scss
			fs.writeFileSync(
			  path.join(rootPath, `${dirName}.scss`),
			  compScss + os.EOL
			);

			// Create component
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.js`),
			  compConnected + os.EOL
			);

			// Create component test
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.test.js`),
			  '// test' + os.EOL
			);
		}

		else {
			const comp = createComponent(packageName, packageType);

			// Create the directory
  		fs.ensureDirSync(packageName);
			
			// Create index
  		fs.writeFileSync(
			  path.join(rootPath, `index.js`),
			  compIndex + os.EOL
			);
			
			// Create scss
			fs.writeFileSync(
			  path.join(rootPath, `${dirName}.scss`),
			  compScss + os.EOL
			);

			// Create component
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.js`),
			  comp + os.EOL
			);

			// Create component test
			fs.writeFileSync(
			  path.join(rootPath, `${packageName}.test.js`),
			  '// test' + os.EOL
			);
		}
	});



/*
 * UTILS
 */
function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

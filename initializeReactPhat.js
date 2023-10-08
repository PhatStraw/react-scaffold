// initializeReactPhat.js

const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

const packagePath = path.resolve(__dirname);
const projectPath = path.resolve(packagePath, '../../');

const assetsToCopy = ['src', '.babelrc', 'webpack.config.js'];

const packageJsonPath = path.join(projectPath, 'package.json');
const packageJson = require(packageJsonPath);

// Add webpack, webpack-cli, and webpack-dev-server as dev dependencies
execSync('npm install webpack webpack-cli webpack-dev-server --save-dev', { stdio: 'inherit' });

// Modify the user's package.json start script
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "webpack serve --open --config webpack.config.js";

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Copy assets from react-phat to the user's project
assetsToCopy.forEach((asset) => {
    const sourcePath = path.join(packagePath, asset);
    const destinationPath = path.join(projectPath, asset);
    
    if (fs.existsSync(sourcePath)) {
        fs.copySync(sourcePath, destinationPath);
    } else {
        console.warn(`Warning: ${asset} not found in react-phat package.`);
    }
});

console.log('react-phat initialization complete!');

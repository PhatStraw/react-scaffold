const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

// Define paths
const packagePath = path.resolve(__dirname);
const projectPath = process.cwd();

// List of files/directories to copy
const assetsToCopy = ['src', '.babelrc', 'webpack.config.js'];

const packageJsonPath = path.join(projectPath, 'package.json');
const packageJson = require(packageJsonPath);

// Add webpack, webpack-cli, and webpack-dev-server as dev dependencies
execSync('npm install webpack webpack-cli webpack-dev-server --save-dev', { stdio: 'inherit' });

// Add or modify the start script
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "webpack serve --open --config webpack.config.js";

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

assetsToCopy.forEach((asset) => {
    const sourcePath = path.join(packagePath, asset);
    if (fs.existsSync(sourcePath)) {
        fs.copySync(sourcePath, path.join(projectPath, asset));
    } else {
        console.warn(`Warning: ${asset} not found in react-phat package.`);
    }
});

// Install peer dependencies
execSync('npm install react react-dom', { stdio: 'inherit' });

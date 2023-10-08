const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

// Define paths
const packagePath = path.resolve(__dirname);

// Using npm_config_prefix to determine the project's root directory
const projectPath = process.env.INIT_CWD;


// List of files/directories to copy
const assetsToCopy = ['src', '.babelrc', 'webpack.config.js'];

const packageJsonPath = path.join(projectPath, 'package.json');
const packageJson = require(packageJsonPath);

// Add webpack, webpack-cli, and webpack-dev-server as dev dependencies
execSync('npm install webpack webpack-cli webpack-dev-server --save-dev', { stdio: 'inherit', cwd: projectPath });

// Add or modify the start script
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "webpack serve --open --config webpack.config.js";

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

assetsToCopy.forEach((asset) => {
    const sourcePath = path.join(packagePath, asset);
    const destinationPath = path.join(projectPath, asset);
    
    console.log(`Copying from ${sourcePath} to ${destinationPath}`);

    if (sourcePath !== destinationPath && fs.existsSync(sourcePath)) {
        fs.copySync(sourcePath, destinationPath);
    } else if (sourcePath === destinationPath) {
        console.warn(`Skipped copying ${asset} as source and destination are the same.`);
    } else {
        console.warn(`Warning: ${asset} not found in react-phat package.`);
    }
});

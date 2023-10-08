const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

// Define paths
const packagePath = path.resolve(__dirname);
const projectPath = path.resolve(packagePath, '../../');

// List of files/directories to copy
const assetsToCopy = ['src','.babelrc', 'webpack.config.js'];

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

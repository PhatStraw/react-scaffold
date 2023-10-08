const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;

// Define paths
const packagePath = path.resolve(__dirname);
const projectPath = process.cwd(); // Use the current working directory

// Load dependencies and scripts from your package
const reactPhatPackageJson = require(path.join(packagePath, 'package.json'));
const reactPhatDependencies = reactPhatPackageJson.dependencies;
const reactPhatDevDependencies = reactPhatPackageJson.devDependencies;
const reactPhatScripts = reactPhatPackageJson.scripts;

// Exclude the postinstall script
delete reactPhatScripts.postinstall;

// Load the new project's package.json
const packageJsonPath = path.join(projectPath, 'package.json');
const packageJson = require(packageJsonPath);

// Merge dependencies and scripts
packageJson.dependencies = { ...packageJson.dependencies, ...reactPhatDependencies };
packageJson.devDependencies = { ...packageJson.devDependencies, ...reactPhatDevDependencies };
packageJson.scripts = { ...packageJson.scripts, ...reactPhatScripts };

// Write the updated package.json back to disk
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Install the dependencies
execSync('npm install', { stdio: 'inherit', cwd: projectPath });

// List of files/directories to copy
const assetsToCopy = ['src', '.babelrc', 'webpack.config.js'];

assetsToCopy.forEach((asset) => {
    const sourcePath = path.join(packagePath, asset);
    if (fs.existsSync(sourcePath)) {
        fs.copySync(sourcePath, path.join(projectPath, asset));
    } else {
        console.warn(`Warning: ${asset} not found in react-phat package.`);
    }
});

#!/usr/bin/env node

const packageJson = require('./package.json');
const { program, Argument } = require('commander');

const packageJsonInstall = {
  name: 'react-wise-app',
  version: '1.0.0',
  private: true,
  type: 'module',
  dependencies: {
    react: '^18',
    'react-dom': '^18',
  },
  devDependencies: {
    '@types/react': '^18',
    '@types/react-dom': '^18',
    '@typescript-eslint/eslint-plugin': '^7',
    '@typescript-eslint/parser': '^7',
    eslint: '^9',
    'eslint-plugin-react': '^7',
    'eslint-plugin-react-hooks': '^4.6.0',
    typescript: '^5',
    prettier: '^3',
  },
};

const execute = (template, appName, options) => {
  if (template === 'vite') {
    packageJsonInstall.devDependencies = {
      ...packageJsonInstall.devDependencies,
      '@vitejs/plugin-react': '^4.2.1',
      'vite-tsconfig-paths': '^4.3.2',
      vite: '^5.2.0',
    };

    packageJsonInstall.scripts = {
      dev: 'vite',
      build: 'tsc && vite build',
      'type-check': 'tsc --noEmit',
    };
  }

  if (options?.tailwindcss) {
    packageJsonInstall.devDependencies = {
      ...packageJsonInstall.devDependencies,
      autoprefixer: '^10',
      postcss: '^8',
      tailwindcss: '^3.4.1',
    };
  }

  if (options?.mui) {
    packageJsonInstall.dependencies = {
      ...packageJsonInstall.dependencies,
      '@emotion/react': '^11.11.4',
      '@emotion/styled': '^11.11.5',
      '@mui/icons-material': '^5.15.15',
      '@mui/material': '^5.15.15',
    };
  }

  console.log(template, appName, options);
};

program
  .name('create-react-wise')
  .description('CLI to create your desired react application with predefined settings')
  .version(packageJson.version);

program
  .command('create-react-wise')
  .description('Create your react application')
  .addArgument(new Argument('<template>', 'A template to use').choices(['vite']))
  .addArgument(new Argument('[app-name]', 'The name of your app'))
  .option('--tailwindcss', 'Using tailwindcss')
  .option('--mui', 'Using MUI (Material-UI)')
  .action(execute);

program.parse(process.argv);

// const options = program.options;
//
// const execute = () => {};

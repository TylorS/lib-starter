const { execSync } = require('child_process')
const { join } = require('path')

const cwd = join(__dirname, '..')

const packages =
  [
    '@typed/test',
    '@types/node',
    'conventional-changelog-cli',
    'dox',
    'gaze-run-interrupt',
    'glob-expand',
    'husky',
    'lint-staged',
    'marked',
    'prettier',
    'rimraf',
    'typescript',
    'validate-commit-message',
  ]

execSync('npm install --save-dev ' + packages.join(' '), { cwd, stdio: 'inherit' })

const { execSync } = require('child_process')
const { join } = require('path')

const cwd = join(__dirname, '..')

const packages =
  [
    '@typed/test',
    '@types/node',
    '167',
    'dox',
    'glob-expand',
    'husky',
    'lint-staged',
    'prettier',
    'typescript'
  ]

execSync('yarn add --dev --exact ' + packages.join(' '), { cwd, stdio: 'inherit' })

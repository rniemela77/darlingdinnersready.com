/* TODO Figure out why rule: 'no-unused-vars' is needed for this line.
 (What is this syntax?)
 */
const path = require('path')

module.exports = {
  extends: ['standard', 'standard-react'],
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 0,
    'object-curly-spacing': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 0
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.2.0'
    }
  }
}

import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'unicorn/consistent-function-scoping': 'off',
    'node/prefer-global/process': 'off',
    'react-dom/no-missing-button-type': 'off',
  },
})

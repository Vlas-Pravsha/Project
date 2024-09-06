import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'unicorn/consistent-function-scoping': 'off',
  },
})

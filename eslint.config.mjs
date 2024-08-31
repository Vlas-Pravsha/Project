import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'n/prefer-global/process': ['error', 'always' | 'never'],
  },
})

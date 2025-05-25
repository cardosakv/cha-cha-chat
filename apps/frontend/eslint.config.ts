import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ignores: [
    'node_modules',
    'dist',
    '.build',
    '.output',
    '.nuxt',
    '.vscode',
  ],
})

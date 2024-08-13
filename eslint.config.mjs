import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['node_modules/*'],
  },
  ...compat.extends('plugin:testing-library/react'),
  ...compat.extends('prettier'),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]

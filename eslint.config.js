import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // 대문자 시작 변수(컴포넌트) 및 _접두사 변수 미사용 무시
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^(_|[A-Z])',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // shadcn/ui는 컴포넌트와 variants를 같은 파일에서 export 하므로 warn으로 완화
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])

module.exports = {
  root: true,
  env: {
    // commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  globals: {
    __DEV__: true,
    __VERSION__: true,
    __COMMIT_SHA__: true,
    __BUILD_DATE__: true
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-tsdoc',
    'jsdoc',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended-typescript',
    'plugin:jest/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  reportUnusedDisableDirectives: true,
  parserOptions: {
    /* enabling "project" field is a performance hit
      https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#performance
    */
    sourceType: 'module'
  },
  rules: {
    'tsdoc/syntax': 'warn',
    '@typescript-eslint/no-unused-vars': [
      2,
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'generator-star-spacing': ['error', { before: false, after: true }],
    'space-before-function-paren': 'off',
    'no-dupe-class-members': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'prettier/prettier': ['error'],
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'no-public'
      }
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description'
      }
    ],
    '@typescript-eslint/no-non-null-assertion': [2],
    '@typescript-eslint/no-explicit-any': [0, { ignoreRestArgs: true }],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false
        }
      }
    ]
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}

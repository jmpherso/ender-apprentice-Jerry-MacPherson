module.exports = {
  root: true,
  plugins: ['@nx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `${__dirname}/tsconfig.base.json`,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript', 'hardcore', 'hardcore/ts'],
      excludedFiles: 'vite.config.ts',
      rules: {
        'no-object-constructor': 'off',
        '@typescript-eslint/quotes': 'off',
        'func-style': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unused-modules': 'off',
        'import/default': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
  ],
};

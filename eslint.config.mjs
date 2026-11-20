import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: ['dist/**/*', 'dist-ssr/**/*', 'node_modules/**/*', 'src/**/*', 'api/**/*', 'scripts/**/*', 'server.ts'],
  },
  firebaseRulesPlugin.configs['flat/recommended'],
];

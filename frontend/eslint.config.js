import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat();

export default [
  ...compat.extends('plugin:@angular-eslint/recommended'),
  {
    files: ['**/*.ts'],
    rules: {
      // Style de code
      "quotes": ["error", "single", { "avoidEscape": true }],   // single quotes sauf si échappement
      "semi": ["error", "always"],                              // point-virgule obligatoire
      "indent": ["error", 2, { "SwitchCase": 1 }],              // indentation 2 espaces + switch case
      "no-trailing-spaces": "error",                            // pas d’espaces en fin de ligne
      "space-infix-ops": "error",                               // espaces autour des opérateurs
      "no-multi-spaces": "error",                               // pas d’espaces multiples inutiles
      "keyword-spacing": ["error", { "before": true, "after": true }], // espaces autour des mots-clés
      "eol-last": ["error", "always"],                          // fichier finit toujours par une nouvelle ligne

      // Sécurité / bugs
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // avertit variables non utilisées (ok si _prefix)
      "no-console": ["warn", { "allow": ["warn", "error"] }],   // interdit console.log mais pas warn/error
      "eqeqeq": ["error", "always"],                            // toujours utiliser === et !==
      "curly": ["error", "all"],                                // toujours mettre accolades {}
      "no-duplicate-imports": "error",                          // interdit les import dupliqués

      // Accessibilité & bonnes pratiques Angular (si tu veux approfondir)
      "@angular-eslint/directive-selector": [
        "error",
        { "type": "attribute", "prefix": "app", "style": "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { "type": "element", "prefix": "app", "style": "kebab-case" }
      ],
    },
  },
  {
    files: ['*.html'],
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
      // règles spécifiques au template Angular
      "@angular-eslint/template/no-negated-async": "error",
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/eqeqeq": "error",
    }
  },
];
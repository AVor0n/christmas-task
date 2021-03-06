module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-rational-order',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': false,
      },
    ],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
    'declaration-empty-line-before': null, //конфликтует с rational-order
    'selector-class-pattern':
      '^[\\w]+(-[\\w\\d]+)*(__[\\w]+(-[\\w\\d]+)*)?(--[\\w]+(-[\\w\\d]+)*)?(:{1,2}.+)?$',
  },
  ignoreFiles: ['**/reset.css'],
};

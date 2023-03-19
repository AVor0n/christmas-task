module.exports = {
  '*.ts': (filenames) => ['tsc -p tsconfig.json --noEmit', `eslint ${filenames.join(' ')} --fix`],
  '*.css': ['stylelint --fix'],
  '*': ['prettier --write --ignore-unknown'],
};

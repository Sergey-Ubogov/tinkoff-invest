module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        commonjs: true,
        node: true,
        mocha: true,
    },
    extends: ['prettier', 'eslint-config-silence'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'unicorn/expiring-todo-comments': 'off',
    },
};

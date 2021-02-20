# think-view-react

[![npm](https://img.shields.io/npm/v/think-view-react.svg)](https://github.com/leo-enigma/think-view-art)

Compile view templates with React for ThinkJS 3.x

## Install

```javascript
npm install think-view-react
```

## Usage

edit config file `src/config/adapter.js`, add options for react adapter:

```javascript
const react = require('think-view-react');

exports.view = {
  type: 'react',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    globalVarName: 'G',
    extname: '.html',
  },
  react: {
    handle: react,
    options: {},
  },
}
```

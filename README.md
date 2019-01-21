# caporal-loader

A simple loader aims to simplify the development of cli applications using [caporal](https://github.com/mattallty/Caporal.js).


## Installation

```bash
npm i caporal-loader -S

# OR

yarn add caporal-loader
```


## Usage

```javascript
const caporalLoader = require('caporal-loader');
caporalLoader()
    .subcmdsPath('./subcmds')
    .version('1.0.0')
    .description('demo app')
    .parse();
```

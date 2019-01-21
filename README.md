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

**AND** put your subcmds in directory 'subcmds', make them use the following format.

```
const alias = 'ALIAS'; // subcmd alias

const command = {
    name: '', // subcmd's name
    description: '' // subcmd's description
};

const arguments = [
    {
        var: 'NAME', // name to be used in action. e.g. args.NAME  
        description: '',
        complete: () => Promise.resolve([...])
    }
];

const options = [
    {
        var: 'NAME',
        description: '',
        validator: () => {},
        default: '',
        required: '',
        complete: () => Promise.resolve([...])
    }
];

const action = (args, opts, log) => {
    //
};

module.exports = {
    alias,
    command,
    arguments,
    options,
    action
}
```

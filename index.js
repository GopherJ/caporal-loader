const caporal = require('caporal');
const requireDir = require('require-dir');
const { values } = Object;
const {
    isUndefined,
    isString,
    isArray,
    isObject,
    isArrayAndHasLength
} = require('uti-js');

function caporalLoader(subcmdsPath, version = '1.0.0', description = '') {
    if (!(this instanceof caporalLoader)) 
        return new caporalLoader(subcmdsPath, version, description);

    this._subcmdsPath = subcmdsPath;
    this._version = version;
    this._description = description;
}

caporalLoader.prototype.subcmdsPath = function(subcmdsPath) {
   return isUndefined(subcmdsPath)
        ? this._subcmdsPath
        : (this._subcmdsPath = subcmdsPath, this);
}

caporalLoader.prototype.version = function(version) {
    return isUndefined(version)
        ? this._version
        : (this._version = version, this);
}

caporalLoader.prototype.description = function(description) {
    return isUndefined(description)
        ? this._description
        : (this._description = description, this);
}

caporalLoader.prototype.parse = function(argv) {
    const subcmds = values(requireDir(this._subcmdsPath));

    const cli = caporal
        .version(this._version)
        .description(this._description);

    subcmds.forEach(subcmd => {
        const {
            alias,
            command,
            arguments,
            options,
            action
        } = subcmd;

        const valuesArg = isObject(arguments)
            ? values(arguments)
            : isArray(arguments)
            ? arguments
            : [];

        const valuesOpt = isObject(options)
            ? values(options)
            : isArray(options)
            ? options
            : [];

        const cmd = cli.command(command.name, command.description);

        if (isString(alias)) cmd.alias(alias);

        if (valuesArg.length)
            valuesArg.forEach(arg => { cmd.argument(arg.var, arg.description); arg.complete && cmd.complete(arg.complete) });

        if (valuesOpt.length)
            valuesOpt.forEach(opt => { cmd.option(opt.var, opt.description, opt.validator, opt.default, opt.required); opt.complete && cmd.complete(opt.complete) });

        cmd.action(action);
    });

    cli.parse(isUndefined(argv) ? process.argv || argv);
}

module.exports = caporalLoader;

#!/usr/bin/env node

'use strict';

var program = require('commander');
var pkg = require('./package.json');
var FileSystem = require('fs');

program.version(pkg.version)
	   .option('-c, --config [optional]', 'Config file. Defaults to ./config.json', './config.json')
	   .option('-o, --output [optional]', 'Output config location. Defaults to ./local_config.json', './local_config.json')
	   .option('-e, --env <required>', 'The environment')
	   .parse(process.argv);

var inConfig = program.config;
var outConfig = program.output;
var env = program.env;

if (!env) {
	console.log('-e/--env is required');
	process.exit();
}

var ic = require(inConfig);

function parseConfig(c, env) {
	var o = {};

	for (var key in c) {
		var value = c[key];

		var includeValue = true;

		if (key.indexOf(':') > -1) {
			includeValue = false;

			var s = key.split(':');
			var e = s[0];
			key = s[1];

			if (e === env) {
				includeValue = true;
			}
		}

		if (includeValue) {
			if (typeof value === 'object' && !(value instanceof Array)) {
				o[key] = parseConfig(value, env);
			}
			else {
				o[key] = value;
			}
		}
	}

	return o;
}

var config = parseConfig(ic, env);

FileSystem.writeFileSync(outConfig, JSON.stringify(config, null, 4));
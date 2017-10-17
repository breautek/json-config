# json-config
A command line tool that accepts a simple environment-sensitive JSON template file used to generate a config JSON file, typically used as a part of a greater build system.

##Install
    
    npm install -g @breautek/json-config
    npm link @breautek/json-config
    
##Usage
    
    json-config -e prod

Additional options
- -v    Prints version
- -h    Prints help
- -e    Sets the environment. This is required.
- -c    Sets the input config. Defaults to ./config.json
- -o    Sets the output config. Defaults to ./local_config.json

In your input config file, any key name that is prefixed with "env:" will be included only if it matches the environment command line argument.

##Sample Input Config
Suppose you had an config file that looked something like this:

    {
        "name": "Example Name",
        "dev:debug" : true,         // The key "debug" will only get set if the environment is "dev"
        "prod:debug": false,        // The key "debug" will be set to false if the environment is "prod"
        "db": {
            "dev:host": "127.0.0.1",
            "prod:host": "myprodserver"
        }
    }
    
The output config file will look like:

    {
        "name": "Example Name",     // This is untouched because it had no environment prefix at all.
        "debug": false,             // This is false, becuase of -e prod
        "db" : {
            "host": "myprodserver"
        }
    }

##Common Practices
- Add the local_config.json (or the output json) to your ignore file.

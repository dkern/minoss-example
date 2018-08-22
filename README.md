# Example Module for Minoss
[![GitHub version](https://badge.fury.io/gh/eisbehr-%2Fminoss-example.svg)](http://github.com/eisbehr-/minoss-example)
[![NPM version](https://badge.fury.io/js/minoss-example.svg)](http://www.npmjs.org/package/minoss-example)
[![Dependency version](https://david-dm.org/eisbehr-/minoss-example.png)](https://david-dm.org/eisbehr-/minoss-example)

This is an example module to show how to easily create own projects for [Minoss](https://github.com/eisbehr-/minoss) and creating own scripts.
More information about this can be found in the [Minoss documentation](https://github.com/eisbehr-/minoss#create-an-own-module).


## Table Of Contents
* [Installation](#installation)
* [Available Examples](#available-examples)
* [Call an Example](#call-an-example)
* [Create an own Module](#create-an-own-module)
  * [1. Create an Module folder](#1-create-an-module-folder)
  * [2. Create a Script file](#2-create-a-script-file)
  * [3. Write your Script](#3-write-your-script)
  * [4. Error Messages as Response](#4-error-messages-as-response)
    * [Return Error by response data](#return-error-by-response-data)
    * [Return Error by callback](#return-error-by-callback)
    * [Optional: Add a `package.json` to your Module](#optional-add-a-packagejson-to-your-module)
* [Make your Module available to others](#make-your-module-available-to-others)
* [Naming Convention](#naming-convention)
* [Publish to `npm`](#publish-to-npm)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Donation](#donation)


---


## Installation
To install this module to your local Minoss copy just run the following command inside the root directory.
It should be instantly available afterwards.

```SH
$ npm install minoss-example
```


## Available Examples
This module will install a bunch of example scripts.
An overview, by logical order:

- [`example.js`](https://github.com/eisbehr-/minoss-example/blob/master/example.js) - basic example of a script
- [`error.js`](https://github.com/eisbehr-/minoss-example/blob/master/error.js)   - return error messages on execution
- [`config.js`](https://github.com/eisbehr-/minoss-example/blob/master/config.js)  - access configurations inside script
- [`params.js`](https://github.com/eisbehr-/minoss-example/blob/master/params.js)  - access url parameters from within a script
- [`async.js`](https://github.com/eisbehr-/minoss-example/blob/master/async.js)   - example of an asynchronous task


## Call an Example
The execution of these example is [the same](https://github.com/eisbehr-/minoss#call-a-module-script) as for every module script.
Just call the name of the module and the name of the script by appending it to the request URL.

```TEXT
format:   http://hostname:{PORT}/{MODULE}/{SCRIPT}
example:  http://localhost:8080/example/async
```


## Create an own Module
Creating own modules for Minoss is quite simple.
In the [`main documentation`](https://github.com/eisbehr-/minoss#create-an-own-module) you can find a more technically description.
Here we will just create a simple module as tutorial.


### 1. Create an Module folder
To create a module just crete a folder in the root directory of Minoss, with the name you wish for your module.
The name of this folder is the name you later call on request.
So, keep it simple and readable.

```
htdocs/
  |- config/
  |- example/       <-- your 'example' module folder
  |- node_modules/
  |- src/
  |- .jshintrc
  |- gulpfile.js
  |- package.json
  |- README.md
  |- server.js
```

### 2. Create a Script file
Inside your new module folder just create a new `.js` file.
The name of this file is the name you later call on request.
So, keep it simple and readable too.

```
htdocs/example/
  |- example.js     <-- your 'example' script file
```


### 3. Write your Script
You are free to write everything inside your script you want to.
But to have it working with Minoss, you need to `export` a function.
With this in mind, the server can handle everything, even asynchronous tasks.

```JS
// always export an executing function with the following parameters:
// - 'config' contains all configuration files for this module
// - 'params' contains the url given parameters
// - 'respond' is a callback function to tell the server the script is finished
// - 'error' is an optional callback you can use to respond errors and failed executions
module.exports = (config, params, respond, error) => {
    // call the 'respond' callback whenever the script is finished
    respond({success: true});
};
```

The `respond` callback has two major functions:
To tell the server your execution has finished and how it has been finished.
Successfully or failed.
Beside this you can extend the `object` with the data you want to respond by the server.

In general you give the `respond` callback an `object` as only parameter, containing your data too.
Inside this parameter the only needed property is named `success`, which has to be an `boolean`.
This tells the server that the execution was successfully, or failed.

```JS
// pass object
respond({success: true});  // successfull
respond({success: false}); // failed

// shorthand
respond(true);             // shorthand for respond({success: true});
respond(false);            // shorthand for respond({success: false});
```

To append data to the output just add more properties to the `object`.

```JS
respond({
    success: true,
    hello: 'world',
    foo: 'bar',
});
```


### 4. Error Messages as Response
In case of an error you should take care of the conventions.
There are basically two ways to respond an error message.


#### Return Error by response data
Whenever the script got errors while execution the `success` property should be `false`.
And optional error message should be stored inside `error`. 
So you could pass both to the `respond` callback manually.

```JS
respond({
    success: false,
    error: 'the error message'
});
```


#### Return Error by callback
A shorter an more readable way is to use `error` callback, what is the fourth parameter of the script `export`.
With this you can the error message directly to the response.
Everything else will be handled automatically.

```JS
module.exports = (config, params, respond, error) => {
    error('the error message');
};
```


### Optional: Add a `package.json` to your Module
If you want to use additional resources (_dependencies_) in your module, you should use a [`package.json`](https://docs.npmjs.com/files/package.json) file to load them.
Then `node` and `npm` would be able to load al dependencies automatically.
You could even add more useful or descriptive informations to this file.
A minimal `package.json` could look somehow like this:

```JSON
{
  "name": "minoss-project",
  "version": "1.0.0",
  "dependencies": {
    "some-api": "^1.0.0"
  }
}
```


## Make your Module available to others
If you wrote a plugin you may think others could need or want to use too, you should think about to publish it.
You would not need much reasources for this.
A [GitHub](https://github.com) account and possible an [npm](https://npmjs.com) account too.

For this you need a [`package.json`](https://docs.npmjs.com/files/package.json) file inside your project.
It should contain all information about your module and it's dependencies.
You can take a look to the [package.json](https://github.com/eisbehr-/minoss-example/blob/master/package.json) of this module here.

When you have added these file you are ready to publish your module.
Create a GiHub account and a repository there and commit it. That's it! 

### Publish to `npm`
Even better would it be, if you add your Module also to [npm](https://www.npmjs.com/), the package manager of `node.js`.
It is pretty simple too.
You just need a account you can register on https://www.npmjs.com.
Then you can [`publish`](https://docs.npmjs.com/cli/publish) your module with a commandline tool of your choice.


### Naming Convention
Only convention for public modules for Minoss is, that the name of the module have to start with `minoss-`, like `minoss-example`.
This helps to identify such modules and is needed for auto-loading these modules when installed with `npm`.


## Bugs / Feature request
Please [report](http://github.com/eisbehr-/minoss-example/issues) bugs and feel free to [ask](http://github.com/eisbehr-/minoss-example/issues) for new features directly on GitHub.


## License
Minoss Example is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.


## Donation
_You like to support me?_  
_You appreciate my work?_  
_You use it in commercial projects?_  
  
Feel free to make a little [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93XQ8EYMSWHC6)! :wink:

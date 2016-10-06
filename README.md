# Example Module for Minoss
This is an example Module to show how you can easily create own Projects for `Minoss`.
In about five Minutes you should know everything you need to know about creating own Scripts.
Have fun! :wink:


## Table Of Contents
* [1. Create an Module-Folder](#1-create-an-module-folder)
* [2. Create a Script-File](#2-create-a-script-file)
* [3. Write your Script](#3-write-your-script)
* [4. Error Messages as Response](#4-error-messages-as-response)
* [5. Call your Module-Script](#5-call-your-module-script)
* [Additional 1: Use a package.json in your Module](#additional-1-use-a-package-json-in-your-module)
* [Additional 2: Make your Module available to others](#additional-1-make-your-module-available-to-others)


---


## 1. Create an Module-Folder
To create a Module just crete a Folder in the `Minoss` root directory, with the Name you wish for your Module.
The Name of this Folder is the Name you later call on Request.
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


## 2. Create a Script-File
Inside your new Module-Folder just create a new `.js` File.
The Name of this File is the Name you later call on Request.
So, keep it simple and readable too.

```
htdocs/example/
  |- example.js     <-- your 'example' script file
```


## 3. Write your Script
You are free to write everything inside your Script you want to.
But to have it working with Minoss, you need to `export` the correct thing.
With this in Mind the Server can handle everything, even asynchronous Tasks.

```JS
// always (!) export an executing function with the following parameters:
// - 'params' contains the url given parameters
// - 'respond' is a callback function to tell the server the script is finished
// - 'error' is an optional callback you can use to respond errors and failed executions
module.exports = function(params, respond, error) {
    // call the 'respond' callback whenever the script is finished
    respond({success: true});
};
```

The `respond` callback has two major functions:
To tell the Server your execution has finished and how it has been finished.
Successfully or failed.
Beside this you can extend the `object` with the Data you want to respond to the Server.

In general you give the `respond` callback an `object` as only parameter, containing your Data too.
Inside this parameter the only needed property is named `success`, which has to be an `boolean`.
This tells the Server that the execution was successfully, or failed.

```JS
// pass object
respond({success: true});  // successfull
respond({success: false}); // failed

// shorthand
respond(true);             // shorthand for respond({success: true});
respond(false);            // shorthand for respond({success: false});
```

To append Data to the output just add more properties to the `object`.

```JS
respond({
    success: true,
    hello: "world",
    foo: "bar",
});
```


## 4. Error Messages as Response
In case of an Error you should take care of the conventions.
There are basically two ways to respond an error Message.

First: you can add the property `error` to your responding data. 

```JS
respond({
    success: false,
    error: "the error message"
});
```

Second: you can use the optional `error` callback of the export function.

```JS
module.exports = function(params, respond, error) {
    error({success: false, error: "the error message"});

    // shorthand for the above:
    error("the error message");
};
```


## 5. Call your Module-Script
The execution of your own Modules and Scripts is the same as with every `Minoss` Module.
Just call the Name of the Module and the Name of your Script by appending it to the URL.

```
// format: http://localhost:{PORT}/{MODULE}/{SCRIPT}
http://localhost:8080/example/example
```


## Additional 1: Use a `package.json` in your Module
If you want to use additional resources in your Module, you should use a `package.json` file to load them.
Then `node` and `npm` would be able to load al dependencies automatically.
A minimal `package.json` could look like this:

```JS
{
  "name": "minoss-example",
  "version": "0.1.0",
  "dependencies": {
    "some-api": "^1.0.0"
  }
}
```


## Additional 2: Make your Module available to others
If you wrote a plugin you may think other developers could need too, you should think about to publish it.

Easiest way is to host your Module on GitHub with a full [`package.json`](https://docs.npmjs.com/files/package.json) file.
Then others would be able to use your Module as dependency.
Even better would it be, if you add your Module also to [NPM](https://www.npmjs.com/), the package manager of `node`.

Only convention for public Modules is that the name of the module, start with `minoss-`, like `minoss-example`.
This helps to identify such modules and are needed for auto-loading these module in the future.

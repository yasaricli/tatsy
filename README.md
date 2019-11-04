<p align="center">
  A simple interface for creating REST APIs
  <br>
  <a href="https://tatsy.js.org/"><strong>Website</strong></a> | <a href="https://tatsy.js.org/docs"><strong>Docs</strong></a>
</p>

## Getting started

Install with yarn:

    yarn add tatsy
  
or with npm:

    npm install tatsy

and add a script to your **package.json** like this:

```JSON
"scripts": {
  "start": "tatsy"
},
```

## Packages

This repository is a monorepo that we manage using [Lerna](https://github.com/lerna/lerna). That means that we actually publish [several packages](/packages) to npm from the same codebase, including:

| Package                                                | Version                                                                                                                             | Description                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`tatsy`](/packages/tatsy)                             | [![npm](https://img.shields.io/npm/v/tatsy.svg?style=flat-square)](https://www.npmjs.com/package/tatsy)                             | The core of tatsy                                                                   |
| [`tatsy-http`](/packages/tatsy-http)                   | [![npm](https://img.shields.io/npm/v/tatsy-http.svg?style=flat-square)](https://www.npmjs.com/package/tatsy-http)                   | Http Server for Express.js                                                          |
| [`tatsy-collection`](/packages/tatsy-collection)       | [![npm](https://img.shields.io/npm/v/tatsy-collection.svg?style=flat-square)](https://www.npmjs.com/package/tatsy-collection)       | Mongodb collection use mongoose                                                     |
| [`tatsy-logger`](/packages/tatsy-logger)               | [![npm](https://img.shields.io/npm/v/tatsy-logger.svg?style=flat-square)](https://www.npmjs.com/package/tatsy-logger)               | Log using chalk                                                                     |
| [`tatsy-config`](/packages/tatsy-config)               | [![npm](https://img.shields.io/npm/v/tatsy-config.svg?style=flat-square)](https://www.npmjs.com/package/tatsy-config)               | Config package                                                                      |
| [`tatsy-watcher`](/packages/tatsy-watcher)             | [![npm](https://img.shields.io/npm/v/tatsy-watcher.svg?style=flat-square)](https://www.npmjs.com/package/tatsy-watcher)             | package to watch all javascript files                                               |


## License

Tatsy is open source software [licensed as MIT](https://github.com/tsepeti/tatsy/blob/master/LICENSE).

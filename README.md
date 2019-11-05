<p align="center">
  <img src="screen.png" />
</p>

<p align="center">
  A simple interface for creating REST APIs
  <br>
  <a href="https://tatsy.js.org/"><strong>Website</strong></a> | <a href="https://tatsy.js.org/docs"><strong>Docs</strong></a>
</p>

## Status
[![CircleCI](https://circleci.com/gh/tsepeti/tatsy/tree/master.svg?style=svg)](https://circleci.com/gh/tsepeti/tatsy/tree/master)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting started](#getting-started)
- [Defining Collection Routes](#defining-collection-routes)
- [Defining Custom Routes](#defining-custom-routes)
  - [Defining Endpoints](#defining-endpoints)
  - [Request and Response Structure](#request-and-response-structure)
    - [`post`](#post)
    - [`getAll`](#getall)
    - [`get`](#get)
    - [`put`](#put)
    - [`delete`](#delete)
- [Packages](#packages)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

and then just run `yarn start` and go to http://localhost:3000/api

## Defining Collection Routes
One of the most common uses for a REST API is exposing a set of operations on your collections.
All available REST endpoints can be generated for a Mongo Collection using
`Tatsy.addCollection(name, options)`.

```javascript
// articles.js | Given a URL "/articles/5"
Tatsy.addCollection('articles', {
  schema: {
    title: String,
    author: String
  }
})
```

**`/api/<collection>`**
- Operations on the entire collection
-  `GET` and `POST`

**`/api/<collection>/:id`**
- Operations on a single entity within the collection
- `GET`, `PUT`, `PATCH` and `DELETE`

## Defining Custom Routes
Routes are defined using `Tatsy.addRoute()`. A route consists of a path and a set of endpoints
defined at that path.

In this example we have a parameter named `_id`. If we navigate to the `/posts/5` URL in our browser,
inside of the GET endpoint function we can get the actual value of the `_id` from
`(_id) { console.log(_id) }`. In this case `_id => 5`.

```javascript
// posts.js | Given a URL "/posts/5"
Totsy.addRoute({
  endpoints: {
    get(_id) {
      console.log(_id)
    }
  }
});
```

### Defining Endpoints

The last parameter of `Tatsy.addRoute` is an object with properties corresponding to the supported
HTTP methods. At least one method must have an endpoint defined on it. The following endpoints can
be defined in Tatsy:
- `getAll`
- `get`
- `post`
- `put`
- `delete`

### Request and Response Structure

Sample requests and responses for each endpoint are included below:

#### `post`
Request:
```bash
curl -X POST http://localhost:3000/api/articles/ -d "title=Tatilsepeti" -d "author=Yaşar İçli"
```

Response:

Status Code: `201`
```json
{
  "status": "success",
  "data": {
    "_id": "LrcEYNojn5N7NPRdo",
    "title": "Tatilsepeti",
    "author": "Yaşar İçli"
  }
}
```

#### `getAll`
Request:
```bash
curl -X GET http://localhost:3000/api/articles/
```

Response:
```json
{
  "status": "success",
  "data": [
    {
      "_id": "LrcEYNojn5N7NPRdo",
      "title": "Tatilsepeti",
      "author": "Yaşar İçli",
    },
    {
      "_id": "7F89EFivTnAcPMcY5",
      "title": "Tatilsepeti",
      "author": "Can",
    }
  ]
}
```

#### `get`
Request:
```bash
curl -X GET http://localhost:3000/api/articles/LrcEYNojn5N7NPRdo
```

Response:
```json
{
  "status": "success",
  "data": {
    "_id": "LrcEYNojn5N7NPRdo",
    "title": "Tatilsepeti",
    "author": "Yaşar İçli",
  }
}
```

#### `put`
Request:
```bash
curl -X PUT http://localhost:3000/api/articles/LrcEYNojn5N7NPRdo -d "title=Tatilsepeti" -d "author=İlhan"
```

Response:
```json
{
  "status": "success",
  "data": {
    "_id": "LrcEYNojn5N7NPRdo",
    "title": "Tatilsepeti",
    "author": "İlhan"
  }
}
```

#### `delete`
Request:
```bash
curl -X DELETE http://localhost:3000/api/articles/LrcEYNojn5N7NPRdo
```

Response:
```json
{
  "status": "success",
  "data": {
    "message": "Item removed"
  }
}
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
## Developer Resources

Interested in helping or contributing to Tatsy?  These resources will help:

* [Core development guide](DEVELOPMENT.md)
* [Contribution guidelines](CONTRIBUTING.md)
* [Issue tracker](https://github.com/tsepeti/tatsy/issues)

## License

Tatsy is open source software [licensed as MIT](LICENSE).

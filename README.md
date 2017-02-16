# Prototype app boilerpate

A simple Express app using Pug templates and SCSS.

This for making webapps to test as native apps, so to install it needs to be loaded in the browser and added to homescreen.

### Installation
---
Built using Node. You'll need it installed to run locally.

Javascript packages are managed with NPM, and CSS packages are managed using Bower. To install, clone and then run

```
$ npm install
```

### Sample content
---
There's a `/sampleContent/index.js` file, which can require files and be loaded using the `sampleContent` middleware. This can be useful when starting template UI before an API is ready.

### SCSS
---
Libraries: Normalize.css and the Scut mixing library are included, along with some sensible defaults.

CSS selectors follow the BEM structure, and the names generally align with the Pug component names.

In lieu of brand guidelines, Roboto font has been loaded by CDN in the head -- this is meant to be temporary.

### Scripts
---
Javascript is compiled into bundles using Browserify and Babel (latest).

The framework lives in the `core.js` bundle. It includes reusable classes (double-underscore file prefix) and two little init scripts (single-underscore file prefix):

`__State.js` objects take a function and run it when updated. We use this to hit what what would normally run on page load on DOM update.

`__Page.js` allows us to request a page from the server and hot-load the response into the DOM by simply adding the `.js-page-change` class to an a-tag. It requires the `__Link.js` class, which takes an a-tag and returns a similar span. The `_initPages.js` script initialises this behaviour.

`__Modal.js` defines all the modal properties. The `_initModals.js` script finds which modals are currently available in the DOM and initializes them.

`index.js` is where everything's pulled together and a `State` object is attached to `window.pageState`.

There's a `main.js` bundle prepared for project-specific functionality.

### Templates
---
Templates are rendered out from `/views/` by Pug.

The config options are all set and can be modified via the `viewConfig` module in `middleware.js`, then the returned object can be modified page-specifically as `res.locals.viewConfig` in the controllers.

I've tried to keep the templates very modular, by using pug mixins for anything that should be components. These are kept in the `/views/mixins` folder.

The `base.pug` file in `/views/mixins` has all the stuff that makes the pages work, and renders differently depending on whether the request is standard for a whole page (from URL) or via XHR for just what's returned by the `+innerContent` mixin.

Mixins are used over partials and extends because they're the only construct that support anonymous blocks. Each page has an anonymous block of content. We can't name them, beacuse named blocks can't appear more than once on a page and we have an `if` statement in `+page` when deciding whether to render the whole page or just the `+innerContent` for a hot load.

### Routes
---
The `/routes/` folder contains a `middleware.js` collection of small modules and an `index.js` file where everything is imported.

Controllers are bulk-required from their own `/controllers/` folder.

One of the middleware functions loads sample data, which you can add in the sampleContent foleder.

### Libraries
---
The app is a really simple express app with minimal modification. There are some simple utilities in `/lib/`:

- `errorHandler.js` attaches some extra routes, which catch most errors and renders them through the `error.pug` template.
- `loadControllers.js` is used by `/routes/index.js` to bulk-require the controllers from their folder.

### Development
---
There are a set of Gulp tasks in `/gulp_modules/tasks`, and a handy config file in `/gulp_modules/config.js`. If you want to modify the JS bundles or add more stylesheets, this is the place to do it.

The default task is set to compile Sass/SCSS and JS on save and refresh the browser when necessary (CSS is injected) via Browsersync.

Gulp task is called through NPM, so we you don't need to install packages globally. To get making things, just run:

```
$ npm run dev
```

### Linting
---
There are no fussy linters, but if you run `npm test` it'll check the front-end Javascript files against [Happiness guidelines](https://github.com/JedWatson/happiness) and give you it's two cents.

### Deployment
---
Deployment is done with Gulp, but it runs through NPM for simplicity. The deployment task can be tested locally by running.

```
$ npm start
```

When doing this, we can also simulate the production environment by modifying the `.env` file in root.
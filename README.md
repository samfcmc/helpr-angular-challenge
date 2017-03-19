# Helpr Angular Challenge

## My Solution

This is my solution to the [Helpr Angular Challenge](https://github.com/helprapp/helpr-angular-challenge)
available at my [github](https://github.com/samfcmc/helpr-angular-challenge).

### Install dependecies
Before proceeding make sure you have [NodeJS](https://nodejs.org), [NPM](https://www.npmjs.com/) and [Gulp](http://gulpjs.com/) installed.

After you have NPM installed you can use it to install gulp CLI:
```bash
npm install gulp -g
```

Then, you need to install the app's dependencies using bower. However, we have a gulp task to do just that:
```bash
gulp bower
```
Remember to run this task each time you change some dependency in your `bower.json` file.

### Local Server
To start the local web server run this command:
```bash
gulp
```
It will open a browser window on [localhost:3000](http://localhost:3000).
This local server uses [BrowserSync](https://www.browsersync.io/). Each time you change something in the source code, the browser will refresh the page or in some cases, for instance, changes in `.scss` files, it will replace the generated `.css` file without reloading the page again.

You will see this information in the terminal that you used to run the gulp command but you can navigate to [localhost:3001](http://localhost:3001) to have access to the BrowserSync management interface.

You can always clean the generated build files using the clean task:
```bash
gulp clean
```

### Production Mode
This project also supports being built for production mode. Just run this command:
```bash
gulp prod
```
Or if you want to run a local server using the production build you can do it using this command:
```bash
gulp serve-prod
```

In production mode, JS and CSS assets are minified.
After you build for production, you can grab the generated `build` folder and serve it in any static web server.

### Decisions
TODO: Explain my decisions about the structure and how are they better.

- Split app.js according to features
- app.js file
- router.js file
- vendor.js file
- style folder
- fonts folder

# The Challenge
Welcome to the Helpr Angular Challenge.

The purpose of this exercise is for you to refactor the current code. You are not expected to change any of the existing features of the app. Instead, your solution will be judged based on your ability to:

* write clean code with a focus on performance and simplicity
* provide a solution that is both modular and scalable
* justify your decisions against the current implementation

## Disclaimer

This code does not represent our coding style. The purpose of this exercise is to showcase your ability to improve an existing codebase.

## Requirements

Before proceeding to the next step, make sure that you have [bower](https://bower.io/), [npm](https://nodejs.org) and [gulp](http://gulpjs.com) installed on your system.

### Dependencies

To install the dependencies enter the following command on your terminal:

```
bower install && npm install
```

### Local server

To start a local server on **http://127.0.0.1:3000**, run this command:

```
gulp serve
```

## Instructions

Please submit your solution as a [pull request](https://help.github.com/articles/about-pull-requests/) to this repository.

## Questions

If you have any question, feel free to send an email to jerome[at]helprapp[dot]io

Good luck!

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

Then, install the npm dependencies using the command:
```bash
npm install
```

Now you need to install the app's dependencies using bower. However, there is a gulp task to do just that:
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
I made several changes from the starting point of this challenge.
- First, all the Angular app code was in a single file `app.js`. All the controllers and app initialization logic was in that file.
I splitted it into several files and created a folder `tasks` inside `src` directory.
Since this is a to do list management app, it makes sense to have a folder with this name and put all the controllers, directives and views related to tasks there.
Instead of having one folder for controllers, another one for directives and so on, I decided to create a folder structure based on features because it leads to a more scalable and easy to mantain structure.
For instance, if there was a user profile feature, there would be a folder named `profile` with all the controllers, directives and views related to the profile there.
Also, I created some directives to have several files with reusable html instead of a big block of html code inside of `index.html` file.
- After the previous change the `app.js` file does not have much logic. It is just used to declare the app module and its dependencies.
The tasks folder became a module and the `app` module just have it as a dependency.
- When the user opens the app, he/she goes straight to the tasks list and there is no more pages to go.
However, it can change in the future.
Usually a web app can have several routes.
I added [angular-ui-router](https://ui-router.github.io/) to make it easier to manage client-side routing.
All the possible routes are defined in the `router.js` file.
- The app's dependencies are managed by [Bower](https://bower.io/) and I didn't change that.
However, there is a new file named `vendor.js` which requires all the libraries and frameworks used in this project. Each time a new library is added, we need to change this file to include that.
There is a gulp task that uses [Browserify](http://browserify.org) that will look at the requires in `vendor.js` and will build a bundle with all the required dependencies included.
This way, we don't need a new script tag inside `index.html` or copy files from `bower_components` to another folder each time we add a new library.
Using bower to install the new dependency and adding one new require to `vendor.js` is enough to use a new library.
- The app specific code such as, controllers, directives, and so on are also bundled in a single JS file using Browserify similary to what is done in the previous case.
The build process will look at the `app.js` and check which files are required by it. Then, it builds a dependency tree and in the end we have a JS file with all the code we need and nothing more.
That's why we only have two script tags inside the `index.html` file, one for the vendors bundle and another one for the app bundle.
- Inside `src` directory there is a folder named `style` which includes a `main.scss`. I also changed the `gulpfile.js` to include a task to compile [SASS](https://sass-lang.com) code. This way, we have a more powerful CSS that we can use and in the end, it is transpiled for CSS that the browser can handle. However, we can write styles that include variables and mixins.
The build process will look at the `main.scss` file and its `@import` statements and build a single CSS file. That's why we only have one tag to include one CSS file inside the `index.html` file.
However, it is possible to have `.scss` files anywhere inside `src` folder. As long as they are imported by `main.scss` or any file that is imported by it the generated CSS file will have those styles also.
- Since we are using [Bootstrap](http://getbootstrap.com), it can come in handy to be able to use their [Glyphicons](http://getbootstrap.com/components/#glyphicons).
I created a Gulp task to copy the necessary font files to a generated `fonts` folder.
Also, this task also handles app specific fonts.
For instance, if there are any custom made fonts we want to include we just need to put the files inside `fonts` folder of `src` directory and they will be copied to a folder named `fonts` inside the `build` directory.
- Lots of changes were made to the `gulpfile.js` file to be able to handle a more complex build process. However, despite of being more complex, the source code structure became more scalable like previously explained.
It uses `browserify` with transforms such as: 
	- [debowerify](https://github.com/eugeneware/debowerify) in order to be able to require bower dependencies (inside bower_components folder) instead of npm ones (inside node_modules).
	- [babelify](https://github.com/babel/babelify) to use [babel](https://babeljs.io/) to transpile ES6 to ES5. There was no any transpile process before I changed the gulpfile. Some browsers can handle ES6 code but we should not rely on that. For instance, if the user uses a more outdated browser, it might not handle that.
	That's why I included this transpiling process to avoid browser specific problems.
	However, sourcemap files are generated to allow to debug the source code as is and not only the generated one.

#### Conclusion
I started by splitting the `app.js` file into several ones and changed the directory structure to be more feature oriented instead of having one folder for controllers, another for directives, etc.
Then, I made several changes to the build process.
However, everything is done to provide a smooth experience for any developer that starts working on this project.
Simply make sure to have NodeJS, NPM, Gulp before you start and then, at the project's root, run the `gulp` command and you are ready to go.
As you change files, the app is reloaded and sometimes you see the changes happening and the app is not reloaded at all.
For instance, if you change a `.scss` file, you will immediately see the changes without any reloading.
This happens because BrowserSync is used as explained before.

I enjoyed solving this challenge and also learned a bit about ES6 and how that can be handled by Gulp.

I hope you like my solution. See you :)

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

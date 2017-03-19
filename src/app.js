/**
 * App Module
 */

import tasks from './tasks';
import router from './router';

let app = angular.module('app', ['ui.router', tasks.module.name]);

router(app);

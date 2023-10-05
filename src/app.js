import { createElement } from 'lwc';
import '@lwc/synthetic-shadow';
import App from 'example/app';

document
    .querySelector('#main')
    .appendChild(createElement('example-app', { is: App }))
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  DefaultPage,
  ModalDialog,
  FormDialog
} from './';

export default {
  path: 'request-invitation',
  name: 'Request invitation',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'modal-Dialog', name: 'Modal Dialog', component: ModalDialog, isIndex: true },
    { path: 'form-Dialog', name: 'Form Dialog', component: FormDialog, isIndex: true },
  ],
};

import PlNavbar from './navbar.js';

export default function (context, options) {
  this.navbar = new PlNavbar(context, options.navbar || {});
};

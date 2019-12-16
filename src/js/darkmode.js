import Cookies from 'js-cookie';

export default {
  defaults: {
    cookieEnabled: true,
    cookieName: 'ac-theme-preference',
    cookieOptions: {
      path: '/',
      secure: false,
      sameSite: 'strict',
      expires: 90
    }
  },
  module: function (context, options) {
    this.init = () => {
      const body = context.document.body;

      if (!body) {
        return;
      }

      const matchMediaSupported = 'function' === typeof context.matchMedia;

      let prefersDarkTheme = false;
      let prefersLightTheme = true; // Default

      const cookiePrefers = Cookies.get(options.cookieName);

      if (cookiePrefers !== undefined) {
        prefersDarkTheme = cookiePrefers === 'dark';
        prefersLightTheme = cookiePrefers === 'light';
      } else if (matchMediaSupported) {
        prefersDarkTheme = context.matchMedia('(prefers-color-scheme: dark)').matches;
        prefersLightTheme = context.matchMedia('(prefers-color-scheme: light)').matches;
      }

      const hasDarkModeEnabled = body.classList.contains('ac-mode-dark');

      if ((prefersDarkTheme && hasDarkModeEnabled) || (prefersLightTheme && !hasDarkModeEnabled)) {
        return;
      }

      if (prefersDarkTheme) {
        body.classList.add('ac-mode-dark');
        return;
      }

      if (prefersLightTheme) {
        body.classList.remove('ac-mode-dark');
      }
    };

    this.ready = () => {
    };

    this.toggle = () => {
      const body = context.document.body;

      if (!body) {
        return;
      }

      body.classList.toggle('ac-mode-dark');

      const next = body.classList.contains('ac-mode-dark') ? 'dark' : 'light';

      if (!options.cookieEnabled) {
        return;
      }

      Cookies.set(options.cookieName, next, options.cookieOptions);
    }
  }
}

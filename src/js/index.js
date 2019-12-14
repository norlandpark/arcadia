import PlNavbar from './navbar.js';
import PlDarkMode from './darkmode.js';
import PlValidate from './validate.js';

const knownModules = {
  navbar: PlNavbar,
  darkMode: PlDarkMode,
  validate: PlValidate
};

export default function (context, options) {
  const optionsModulesEnabled = options.modules || Object.keys(knownModules);

  this.modules = {};

  for (const moduleName of optionsModulesEnabled) {
    if (!knownModules.hasOwnProperty(moduleName)) {
      throw 'Unknown Parkland module requested - ' + moduleName;
    }

    const moduleDef = knownModules[moduleName];
    const providedOptions = (options[moduleName] ? options[moduleName] : {});
    const instanceOptions = Object.assign({}, moduleDef.defaults, providedOptions);
    const constructor = moduleDef.module;

    this.modules[moduleName] = new constructor(context, instanceOptions);
  }

  this.init = () => {
    for (const instanceName in this.modules) {
      if (!this.modules.hasOwnProperty(instanceName)) {
        return;
      }

      this.modules[instanceName].init();
    }
    return this;
  };

  this.ready = () => {
    for (const instanceName in this.modules) {
      if (!this.modules.hasOwnProperty(instanceName)) {
        return;
      }

      this.modules[instanceName].ready();
    }
    return this;
  };
};

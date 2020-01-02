import AcNavbar from './navbar.js';
import AcDarkMode from './darkmode.js';
import AcValidate from './validate.js';
import AcSameWidth from './sameWidth.js';
import AcHidModifier from './hidModifier.js';
import AcTextareaAutosize from './textareaAutosize.js';

const knownModules = {
  navbar: AcNavbar,
  darkMode: AcDarkMode,
  validate: AcValidate,
  sameWidth: AcSameWidth,
  hidModifier: AcHidModifier,
  textareaAutosize: AcTextareaAutosize,
};

export default function (context, options) {
  const optionsModulesEnabled = options.modules || Object.keys(knownModules);

  this.modules = {};

  for (const moduleName of optionsModulesEnabled) {
    if (!knownModules.hasOwnProperty(moduleName)) {
      throw 'Unknown Arcadia module requested - ' + moduleName;
    }

    const moduleDef = knownModules[moduleName];
    const providedOptions = (options[moduleName] ? options[moduleName] : {});
    const instanceOptions = Object.assign({}, moduleDef.defaults, providedOptions);
    const constructor = moduleDef.module;

    this.modules[moduleName] = new constructor(context, instanceOptions);
  }

  this.init = () => {
    if (!context.arcadia) {
      context.arcadia = this;
    }

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

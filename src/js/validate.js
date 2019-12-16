import validate from 'validate.js';

validate.options = {
  fullMessages: false
};

export default {
  defaults: {
    rules: {}
  },
  module: function (context, options) {
    this.setInputState = (errors, inputs) => {
      if (0 === inputs.length) {
        return;
      }

      for (const input of inputs) {
        const hasErrors = errors.hasOwnProperty(input.name);
        const isMarkedError = input.classList.contains('ac-input-error');

        // Was invalid, now is valid
        if (isMarkedError && !hasErrors) {
          input.classList.remove('ac-input-error');
          input.setCustomValidity('');

          const errorLists = input.parentElement.querySelectorAll('.ac-error-list');

          for (const errorList of errorLists) {
            input.parentElement.removeChild(errorList);
          }

          continue;
        }

        // Is valid
        if (!hasErrors) {
          continue;
        }

        // Is not valid
        if (!isMarkedError) {
          input.classList.add('ac-input-error');
        }

        const messages = errors[input.name];
        const messagesElement = messages.length > 1 ? 'ul' : 'div';
        let nextElement = input.nextElementSibling || input.nextSibling;

        if (null !== nextElement && nextElement.tagName.toLowerCase() === 'label') {
          nextElement = nextElement.nextElementSibling || nextElement.nextSibling;
        }

        let errorContainer;
        if (null === nextElement) {
          errorContainer = document.createElement(messagesElement);
          errorContainer.className = 'ac-error-list';
          input.parentElement.appendChild(errorContainer);
        } else if (nextElement.classList.contains('ac-error-list')) {
          errorContainer = nextElement;
          errorContainer.innerHTML = '';
        } else {
          errorContainer = document.createElement(messagesElement);
          errorContainer.className = 'ac-error-list';
          input.parentElement.insertBefore(errorContainer, input.nextSibling);
        }

        if (1 === messages.length) {
          errorContainer.innerText = messages[0];
          continue;
        }

        for (const message of messages) {
          const messageItem = document.createElement('li');
          messageItem.innerText = message;
          errorContainer.appendChild(messageItem);
        }
      }
    };

    this.bindForm = (form, constraints) => {
      const inputs = form.querySelectorAll('input, textarea, select');

      form.addEventListener('submit', (e) => {
        const errors = validate(form, constraints) || {};

        if (0 === Object.keys(errors).length) {
          this.setInputState({}, inputs);
          return;
        }

        e.preventDefault();
        this.setInputState(errors, inputs);
      });

      form.addEventListener('validate', (e) => {
        const errors = validate(form, constraints) || {};

        if (0 === Object.keys(errors).length) {
          this.setInputState({}, inputs);
          return;
        }

        this.setInputState(errors, inputs);
      });

      for (const input of inputs) {
        input.addEventListener('change', (e) => {
          form.dispatchEvent(new Event('validate'));
        });
      }
    };

    this.init = () => {
      const forms = document.getElementsByClassName('ac-validate');

      for (const form of forms) {
        const rulesetName = form.getAttribute('data-ruleset');

        if (null === rulesetName) {
          console.warn('Form has no ruleset defined, set data-ruleset', form);
          continue;
        }

        if (!options.rules.hasOwnProperty(rulesetName)) {
          console.warn('Unknown ruleset requested for form - ' + rulesetName);
          continue;
        }

        const constraints = options.rules[rulesetName];

        this.bindForm(form, constraints);
      }

    };
    this.ready = () => {

    };
  }
}

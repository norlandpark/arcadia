const onTextAreaInput = function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
};

export default {
  defaults: {},
  module: function (context, options) {
    this.init = () => {
      this.mountOnTextAreas();
    };
    this.ready = () => {
    };
    this.mountOnTextAreas = () => {
      const textAreas = context.document.getElementsByClassName('ac-input autosize');

      for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i];

        if ('textarea' !== textArea.tagName.toLowerCase()) {
          continue;
        }

        if (textArea.hasAttribute('ac-autosize-listening')) {
          continue;
        }

        textArea.setAttribute('ac-autosize-listening', 'yes');
        textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px;overflow-y:hidden;');
        textArea.addEventListener('input', onTextAreaInput, false);
        textArea.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            this.form.submit();
          }
        });
      }
    };
  }
};

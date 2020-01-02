export default {
  defaults: {},
  module: function (context, options) {
    this.init = () => {

    };
    this.ready = () => {
      context.document.body.addEventListener('mousedown', () => {
        context.document.body.classList.add('ac-using-mouse');
        context.document.body.classList.remove('ac-using-keyboard');
      });

      context.document.body.addEventListener('keydown', () => {
        context.document.body.classList.remove('ac-using-mouse');
        context.document.body.classList.add('ac-using-keyboard');
      });
    };
  }
};

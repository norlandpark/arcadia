export default {
  defaults: {},
  module: function (context, options) {
    this.init = () => {
    };
    this.ready = () => {
      let mappedByGroup = {};
      let groups = context.document.querySelectorAll('[data-ac-same-width]');
      for (const group of groups) {
        const id = group.getAttribute('data-ac-same-width');

        if (!mappedByGroup.hasOwnProperty(id)) {
          mappedByGroup[id] = [];
        }

        mappedByGroup[id].push(group);
      }

      for (const mapped of Object.values(mappedByGroup)) {
        const ml = Math.max.apply(null, mapped.map(it => it.clientWidth));

        for (const it of mapped) {
          it.style.minWidth = ml + 'px';
        }
      }
    };
  }
}

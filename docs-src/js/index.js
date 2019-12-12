import '../scss/index.scss';
import Parkland from '../../src/js/index'

const parkland = new Parkland(window, {});
parkland.init();

document.addEventListener('DOMContentLoaded', function () {
  parkland.ready();

  document.getElementById('toggle-dark-mode').addEventListener('click', (e) => {
    e.stopPropagation();
    parkland.modules.darkMode.toggle();
    setTimeout(() => e.target.blur(), 120)
  });
});

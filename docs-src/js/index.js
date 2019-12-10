document.addEventListener('DOMContentLoaded', function () {
  var body = document.getElementsByTagName('body')[0];

  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('pl-mode-dark');
  }

  var darkModeToggle = document.getElementById('toggle-dark-mode');
  var darkModeToggleStateSet = function () {
    if (body.classList.contains('pl-mode-dark')) {
      darkModeToggle.innerText = 'Switch to light mode'
    } else {
      darkModeToggle.innerText = 'Switch to dark mode'
    }
  };

  darkModeToggle.addEventListener('click', function () {
    body.classList.toggle('pl-mode-dark');
    darkModeToggleStateSet();
  });

  darkModeToggleStateSet();

  var navbarToggles = document.getElementsByClassName('pl-toggle-navbar');

  for (var toggle in navbarToggles) {
    if(!navbarToggles.hasOwnProperty(toggle)) {
      continue;
    }

    navbarToggles[toggle].addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      e.target.parentElement.classList.toggle('open');
    });
  }

});

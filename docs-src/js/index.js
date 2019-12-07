document.addEventListener('DOMContentLoaded', function () {
  var body = document.getElementsByTagName('body')[0];

  document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    body.classList.toggle('pl-mode-dark');
  });
});

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
        // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var codemirrorTargets = document.getElementsByClassName('enable-cm');

  for (var i = 0; i < codemirrorTargets.length; i++) {
    var codemirrorTarget = codemirrorTargets[i];
    var instanceContent = codemirrorTarget.innerHTML;
    var instanceLanguage = codemirrorTarget.getAttribute('data-lang');

    var codemirrorContainer = document.createElement('div');

    codemirrorTarget.parentNode.appendChild(codemirrorContainer);
    codemirrorTarget.parentNode.removeChild(codemirrorTarget);

    var instance = CodeMirror(codemirrorContainer, {
      value: instanceContent,
      mode: instanceLanguage,
      lineNumbers: true,
      readOnly: 'nocursor',
      viewportMargin: Infinity
    });
  }

  var body = document.getElementsByTagName('body')[0];

  document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    body.classList.toggle('pl-mode-dark');
  });

});

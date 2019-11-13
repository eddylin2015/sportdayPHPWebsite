'use strict';
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open("GET", "/report_to_public/genPDF?url=" + encodeURI(url) + "&fn=" + fn, true);
  xhttp.send();
}
document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  if (keyName === 'Control') {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the same time.
    //alert(`Combination of ctrlKey + ${keyName}`);
    if (keyName == "a" || keyName == "A") {
      loadDoc();
    }
  } else {
    //alert(`Key pressed ${keyName}`);
  }
}, false);
/*
document.addEventListener('keyup', (event) => {
  const keyName = event.key;

  // As the user releases the Ctrl key, the key is no longer active,
  // so event.ctrlKey is false.
  //if (keyName === 'Control') {    alert('Control key was released');  }
}, false);
*/
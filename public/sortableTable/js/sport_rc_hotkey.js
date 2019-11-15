'use strict';
var flag=false;
var pdffilename=null;
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
      var splitchar=this.responseText.indexOf('!');
      pdffilename=this.responseText.substr(splitchar+1);
      splitchar=pdffilename.indexOf('!');
      pdffilename=pdffilename.substr(0,splitchar);
      flag=true;
    }
  };
  xhttp.open("GET", "/report_to_public/genPDF?url=" + encodeURI(url) + "&fn=" + fn, true);
  xhttp.send();
}
function printPDF(x,y){
  for(var i=0;i<y;i++)
  {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(`${this.responseText}`);
    }
  };
  xhttp.open("GET", x, true);
  xhttp.send();
  }
}
function fa(){loadDoc();}
function fb(){
  if(pdffilename){
    var pdf_url=encodeURI("/report_to_public/printPDFfile/files/"+pdffilename);
    printPDF(pdf_url,2);
  }
}
function fc(){
  if(pdffilename){
    var pdf_url=encodeURI("/report_to_public/printPDFfile/files/"+pdffilename);
    printPDF(pdf_url,3);
  }
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
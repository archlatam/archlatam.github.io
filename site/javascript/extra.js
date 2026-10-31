// titolo

 var title = document.getElementsByTagName('title')[0]; 
      title.innerHTML = "Archlatam";

// copyright

 var copy = document.getElementsByClassName('md-copyright__highlight')[0];
copy.innerHTML = "Copyright &copy; 2022-" + (new Date().getFullYear()) + " Archlatam Linux*";

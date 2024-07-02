// script.js

// Function to set cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Load preferences from cookies
window.onload = function() {
  let fontsize = getCookie("fontsize");
  let fontcolor = getCookie("fontcolor");
  if (fontsize && fontcolor) {
    document.body.style.fontSize = fontsize + "px";
    document.body.style.color = fontcolor;
  }
};

// Save preferences to cookies
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  let fontsize = document.getElementById("fontsize").value;
  let fontcolor = document.getElementById("fontcolor").value;
  setCookie("fontsize", fontsize, 30);
  setCookie("fontcolor", fontcolor, 30);
  document.body.style.fontSize = fontsize + "px";
  document.body.style.color = fontcolor;
});
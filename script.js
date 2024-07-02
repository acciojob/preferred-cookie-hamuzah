//your JS code here. If required.
//your JS code here. If required.
document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("customization-form");
  const fontsizeInput = document.getElementById("fontsize");
  const fontcolorInput = document.getElementById("fontcolor");

  // Function to get a cookie value by name
  async function getCookie(name) {
    return new Promise((resolve) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) resolve(parts.pop().split(';').shift());
      else resolve(null);
    });
  }

  // Function to set a cookie
  async function setCookie(name, value, days) {
    return new Promise((resolve) => {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${value}; ${expires}; path=/`;
      resolve();
    });
  }

  // Apply saved preferences if they exist
  const savedFontSize = await getCookie("fontsize");
  const savedFontColor = await getCookie("fontcolor");
  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', `${savedFontSize}px`);
    fontsizeInput.value = savedFontSize;
  }
  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    fontcolorInput.value = savedFontColor;
  }

  // Event listener for form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const fontsize = fontsizeInput.value;
    const fontcolor = fontcolorInput.value;

    // Save preferences in cookies
    await setCookie("fontsize", fontsize, 365);
    await setCookie("fontcolor", fontcolor, 365);

    // Apply preferences
    document.documentElement.style.setProperty('--fontsize', `${fontsize}px`);
    document.documentElement.style.setProperty('--fontcolor', fontcolor);
  });
});
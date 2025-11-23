import { darkColor,lightColor } from "./color";

// them funcation are here
const themeHelpar = (name, value) => {
  document.documentElement.style.setProperty(name, value);
};

// Switch to dark theme
function setDarkTheme() {
  darkColor.map((x) => themeHelpar(x.name, x.value));
  localStorage.setItem("theme", "Dark");
}

// Switch to light theme
function setLightTheme() {
  lightColor.map((x) => themeHelpar(x.name, x.value));
  localStorage.setItem("theme", "Light");
}

const theme = () => {
  const theme = localStorage.getItem("theme");
  if (theme == "Light") {
    setLightTheme();
  } else if (theme == "Dark") {
    setDarkTheme();
  } else {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (systemPrefersDark) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
  return 0
};

export {theme,setLightTheme,setDarkTheme };


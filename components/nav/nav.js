export function createNav() {
  const navigation = document.createElement("nav");
  navigation.classList.add("navigation");
  navigation.setAttribute("data-js", "navigation");

  return navigation;
}

export function CreateNav() {
  const navigation = document.createElement("nav");
  navigation.classList.add("navigation");
  navigation.setAttribute("data-js", "navigation");

  return navigation;
}

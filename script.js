function scrollToElement(elementId) {
    event.preventDefault();
    const targetElement = document.getElementById(elementId);
    const targetOffset = targetElement.offsetTop;
    window.scrollTo({
      top: targetOffset - 40,
      behavior: "smooth"
    });
  }

  function scrollToTop() {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function toggleAriaExpanded() {
    const button = document.getElementById("navbarNav");
    const currentValue = button.getAttribute("aria-expanded");
    const newValue = currentValue === "true" ? "false" : "true";

    const ddown = document.getElementById("navbarNav");
    ddown.setAttribute("aria-expanded", newValue);
  }
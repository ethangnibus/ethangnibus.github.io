function scrollToElement(elementId) {
    event.preventDefault();
    const targetElement = document.getElementById(elementId);
    const targetOffset = targetElement.offsetTop;
    window.scrollTo({
      top: targetOffset,
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
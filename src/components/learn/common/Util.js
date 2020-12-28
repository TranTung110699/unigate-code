export function scrollToLearnContainer(width) {
  if (width > 0 && width <= 991) {
    const learnContainer = document.getElementById('learn-container');
    if (learnContainer) {
      learnContainer.scrollIntoView();
    }
  }
}

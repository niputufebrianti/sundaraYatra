export function setPageMetadata(title, description) {
  document.title = title;

  const descriptionElement = document.querySelector('meta[name="description"]');
  if (descriptionElement) {
    descriptionElement.setAttribute("content", description);
  }
}

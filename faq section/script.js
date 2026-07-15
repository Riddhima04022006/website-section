document.addEventListener('DOMContentLoaded', () => {
  const detailsElements = document.querySelectorAll('.faq-item');

  detailsElements.forEach((details) => {
    details.addEventListener('toggle', (e) => {
      if (details.open) {
        detailsElements.forEach((otherDetails) => {
          if (otherDetails !== details) {
            otherDetails.open = false;
          }
        });
      }
    });
  });
});
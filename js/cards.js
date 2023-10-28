const serverSpecsItems = document.querySelectorAll('.card-item');
const tiltAngle = 25;

serverSpecsItems.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const itemRect = item.getBoundingClientRect();
    const centerX = itemRect.left + (itemRect.width / 2);
    const centerY = itemRect.top + (itemRect.height / 2);
    const angleX = -1 * (e.clientY - centerY) / (itemRect.height / 2) * tiltAngle;
    const angleY = (e.clientX - centerX) / (itemRect.width / 2) * tiltAngle;
    item.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });

  item.addEventListener('mouseleave', (e) => {
    item.style.transform = "none";
  });
});
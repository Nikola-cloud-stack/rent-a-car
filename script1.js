document.querySelectorAll('.colors .color').forEach(circle => {
  circle.addEventListener('click', () => {
    const carCard = circle.closest('.car-card');
    const carKey = carCard.dataset.car;
    const color = circle.dataset.color;
    const carImage = carCard.querySelector('.car-image');

    const ext = carImage.src.substring(carImage.src.lastIndexOf('.'));
    carImage.src = `photos/${carKey}-${color}${ext}`;

    carCard.querySelectorAll('.color').forEach(c => c.classList.remove('selected'));
    circle.classList.add('selected');
  });
});
// ==================== BOOKING MODAL ====================
function openBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  // Detect the car type from the button clicked
  const carType = event.currentTarget?.dataset.car || '';

  modal.classList.add('active');

  const select = document.getElementById('carSelect');
  if (select) select.value = carType;

  document.body.style.overflow = 'hidden';
}
function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal if clicking outside content
document.getElementById('bookingModal')?.addEventListener('click', e => {
  if (e.target.id === 'bookingModal') closeBookingModal();
});





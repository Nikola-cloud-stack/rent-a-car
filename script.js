// ======== Booking Modal ========
const bookingModal = document.getElementById('bookingModal');

function openBookingModal() {
  bookingModal.style.display = 'block';
}

function closeBookingModal() {
  bookingModal.style.display = 'none';
}

// Close modal when clicking outside content
window.onclick = function(event) {
  if (event.target === bookingModal) {
    closeBookingModal();
  }
};

// ======== Scroll to Section ========
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// ======== Mobile Menu ========
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// ======== Booking Form Submission ========
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3000/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert('✅ ' + result.message);
      bookingForm.reset();
      closeBookingModal();
    } else {
      alert('⚠️ ' + result.message);
    }
  } catch (error) {
    console.error(error);
    alert('❌ Failed to connect to server');
  }
});

// ======== Contact Form Submission (optional) ========
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('http://localhost:3000/book', { // reuse /book route
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      statusMessage.style.display = 'block';
      if (res.ok) {
        statusMessage.style.color = 'green';
        statusMessage.textContent = '✅ ' + result.message;
        contactForm.reset();
      } else {
        statusMessage.style.color = 'red';
        statusMessage.textContent = '⚠️ ' + result.message;
      }
    } catch (err) {
      console.error(err);
      statusMessage.style.display = 'block';
      statusMessage.style.color = 'red';
      statusMessage.textContent = '❌ Failed to connect to server';
    }
  });
}

// ======== RENT NOW BUTTON FIX ========
document.addEventListener('DOMContentLoaded', () => {

  const rentButtons = document.querySelectorAll('button');

  rentButtons.forEach(btn => {
    if (btn.innerText.toLowerCase().includes('rent')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // најди картичка од колата
        let carName = '';
        const card = btn.closest('.car, .card, .car-card');

        if (card) {
          const title = card.querySelector('h2, h3');
          if (title) carName = title.innerText;
        }

        // пополни car name во form
        const carInput = document.querySelector('input[name="car"], #carName');
        if (carInput && carName) {
          carInput.value = carName;
        }

        // отвори modal (твојата постоечка функција)
        if (typeof openBookingModal === 'function') {
          openBookingModal();
        }
      });
    }
  });

});

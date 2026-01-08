document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("bookingModal");
  const carInput = document.getElementById("bookingCar");
  const form = document.getElementById("bookingForm");

  const fromDate = document.getElementById("fromDate");
  const toDate = document.getElementById("toDate");
  const pickupLocation = document.getElementById("pickupLocation");
  const clientName = document.getElementById("clientName");
  const clientPhone = document.getElementById("clientPhone");

  // Make functions global for onclick
  window.openBookingModal = function (carName) {
    carInput.value = carName;
    modal.style.display = "flex";
  };

  window.closeBookingModal = function () {
    modal.style.display = "none";
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = `
🚗 Car: ${carInput.value}
📅 From: ${fromDate.value}
📅 To: ${toDate.value}
📍 Location: ${pickupLocation.value}
👤 Name: ${clientName.value}
📞 Phone: ${clientPhone.value}
`;

    const phoneNumber = "38970123456"; // <-- смени со реален број
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    modal.style.display = "none";
  });

});

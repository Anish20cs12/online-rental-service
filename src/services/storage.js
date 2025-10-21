// src/services/storage.js
export const cars = [
  { id: 1, name: "Honda City", price: 2500, image: "/assets/honda-city.jpg", description: "Comfortable sedan." },
  { id: 2, name: "Hyundai Creta", price: 3500, image: "/assets/hyundai-creta.jpg", description: "Compact SUV." },
  { id: 3, name: "Maruti Swift", price: 2000, image: "/assets/maruti-swift.jpg", description: "Small & efficient." },
];

export const bikes = [
  { id: 1, name: "Royal Enfield", price: 800, image: "/assets/royal-enfield.jpg", description: "Classic cruiser." },
  { id: 2, name: "Honda CB Shine", price: 600, image: "/assets/honda-cb.jpg", description: "Daily commuter." },
];

export const rooms = [
  { id: 1, name: "Deluxe Room", price: 3000, image: "/assets/deluxe-room.jpg", description: "Cozy deluxe." },
  { id: 2, name: "Suite Room", price: 5000, image: "/assets/suite-room.jpg", description: "Luxurious suite." },
];

export function getCars() { return cars; }
export function getBikes() { return bikes; }
export function getRooms() { return rooms; }

// bookings stored in localStorage
export function saveBooking(booking) {
  const all = JSON.parse(localStorage.getItem("bookings")) || [];
  all.push(booking);
  localStorage.setItem("bookings", JSON.stringify(all));
}
export function getBookings() {
  return JSON.parse(localStorage.getItem("bookings")) || [];
}

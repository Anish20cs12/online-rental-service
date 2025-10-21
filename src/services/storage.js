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

// Booking helpers
function toDateOnly(dateStr) {
  // Normalize to midnight local to compare date ranges accurately
  const d = new Date(dateStr);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function rangesOverlap(aStartStr, aEndStr, bStartStr, bEndStr) {
  const aStart = toDateOnly(aStartStr).getTime();
  const aEnd = toDateOnly(aEndStr).getTime();
  const bStart = toDateOnly(bStartStr).getTime();
  const bEnd = toDateOnly(bEndStr).getTime();
  return aStart <= bEnd && bStart <= aEnd;
}

export function hasBookingOverlap(itemId, startDate, endDate) {
  const all = getBookings();
  return all.some(
    (b) =>
      b.itemId === itemId &&
      b.status !== "cancelled" &&
      rangesOverlap(startDate, endDate, b.startDate, b.endDate)
  );
}

export function updateBookingStatus(bookingId, status) {
  const all = getBookings();
  const next = all.map((b) => (b.id === bookingId ? { ...b, status } : b));
  localStorage.setItem("bookings", JSON.stringify(next));
  return next.find((b) => b.id === bookingId);
}

// Favorites per-user (localStorage key: favorites_<email>)
function favoritesKey(email) {
  return `favorites_${email}`;
}

export function getFavorites(email) {
  if (!email) return [];
  return JSON.parse(localStorage.getItem(favoritesKey(email))) || [];
}

export function isFavorite(email, itemId, category) {
  const list = getFavorites(email);
  return list.some((f) => f.itemId === itemId && f.category === category);
}

export function toggleFavorite(email, item, category) {
  if (!email) return [];
  const key = favoritesKey(email);
  const list = JSON.parse(localStorage.getItem(key)) || [];
  const exists = list.find((f) => f.itemId === item.id && f.category === category);
  let next;
  if (exists) {
    next = list.filter((f) => !(f.itemId === item.id && f.category === category));
  } else {
    next = [
      ...list,
      {
        itemId: item.id,
        category,
        itemSnapshot: { id: item.id, name: item.name, price: item.price, image: item.image, description: item.description },
      },
    ];
  }
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

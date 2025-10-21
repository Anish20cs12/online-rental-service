// src/services/storage.js
// Using high-quality images from Unsplash (hotlinked). Replace with your own if needed.
export const cars = [
  { id: 1, name: "Honda City", price: 2400, image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200&auto=format&fit=crop", description: "Comfortable city sedan with great mileage." },
  { id: 2, name: "Hyundai Creta", price: 3200, image: "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop", description: "Compact SUV with roomy interior." },
  { id: 3, name: "Maruti Swift", price: 2000, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop", description: "Peppy hatchback, perfect for town runs." },
  { id: 4, name: "Toyota Innova", price: 4200, image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop", description: "Spacious MUV for family trips." },
  { id: 5, name: "Kia Seltos", price: 3600, image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200&auto=format&fit=crop", description: "Feature-packed mid-size SUV." },
  { id: 6, name: "Tata Nexon", price: 3000, image: "https://images.unsplash.com/photo-1605515298946-d874f4e8c5f0?q=80&w=1200&auto=format&fit=crop", description: "Safe and stylish compact SUV." },
  { id: 7, name: "Mahindra Thar", price: 4800, image: "https://images.unsplash.com/photo-1582582621959-48c3e25d1d33?q=80&w=1200&auto=format&fit=crop", description: "Iconic off-roader for adventures." },
  { id: 8, name: "Honda Amaze", price: 2300, image: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?q=80&w=1200&auto=format&fit=crop", description: "Compact sedan with large boot." },
  { id: 9, name: "Hyundai i20", price: 2200, image: "https://images.unsplash.com/photo-1529352992252-343f2a53f5f2?q=80&w=1200&auto=format&fit=crop", description: "Premium hatch loaded with tech." },
  { id: 10, name: "Skoda Octavia", price: 5500, image: "https://images.unsplash.com/photo-1549921296-3ecf9c0f3b66?q=80&w=1200&auto=format&fit=crop", description: "Executive sedan with refined drive." },
];

export const bikes = [
  { id: 1, name: "Royal Enfield Classic 350", price: 900, image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1200&auto=format&fit=crop", description: "Thumping cruiser built for highways.", rating: 4.7, spec: "350cc" },
  { id: 2, name: "Yamaha FZ", price: 700, image: "https://images.unsplash.com/photo-1598976489092-bc3a3a5960d7?q=80&w=1200&auto=format&fit=crop", description: "Street naked with great handling.", rating: 4.4, spec: "150cc" },
  { id: 3, name: "KTM Duke 200", price: 950, image: "https://images.unsplash.com/photo-1609137144813-7d992e1f2c8e?q=80&w=1200&auto=format&fit=crop", description: "Sporty performance for city fun.", rating: 4.6, spec: "200cc" },
  { id: 4, name: "Bajaj Pulsar 150", price: 650, image: "https://images.unsplash.com/photo-1617817547282-5c9a1593b2e1?q=80&w=1200&auto=format&fit=crop", description: "Reliable and economical commuter.", rating: 4.3, spec: "150cc" },
  { id: 5, name: "TVS Apache RTR", price: 700, image: "https://images.unsplash.com/photo-1609053601302-bf2ba6d6f078?q=80&w=1200&auto=format&fit=crop", description: "Aggressive styling with punchy engine.", rating: 4.5, spec: "160cc" },
  { id: 6, name: "Honda Activa", price: 500, image: "https://images.unsplash.com/photo-1626337025563-7b3881b4250f?q=80&w=1200&auto=format&fit=crop", description: "Practical scooter for errands.", rating: 4.2, spec: "110cc" },
  { id: 7, name: "Suzuki Gixxer", price: 720, image: "https://images.unsplash.com/photo-1603481588273-0c44105b9d80?q=80&w=1200&auto=format&fit=crop", description: "Refined 150cc with style.", rating: 4.4, spec: "150cc" },
  { id: 8, name: "Hero Splendor", price: 450, image: "https://images.unsplash.com/photo-1572986330060-1c2f9de6ec26?q=80&w=1200&auto=format&fit=crop", description: "Trusted, fuel-efficient workhorse.", rating: 4.1, spec: "100cc" },
  { id: 9, name: "Yamaha MT-15", price: 1000, image: "https://images.unsplash.com/photo-1623073164644-468f7311ca5e?q=80&w=1200&auto=format&fit=crop", description: "Sharp design, torquey engine.", rating: 4.6, spec: "155cc" },
  { id: 10, name: "Jawa 42", price: 880, image: "https://images.unsplash.com/photo-1622194990071-9f1b2e2f1c49?q=80&w=1200&auto=format&fit=crop", description: "Retro-modern charm and sound.", rating: 4.5, spec: "293cc" },
];

export const rooms = [
  { id: 1, name: "Deluxe Room", price: 2800, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop", description: "Cozy room with modern amenities." },
  { id: 2, name: "Suite Room", price: 5200, image: "https://images.unsplash.com/photo-1551776235-dde6d4829808?q=80&w=1200&auto=format&fit=crop", description: "Spacious suite with living area." },
  { id: 3, name: "Standard Room", price: 2200, image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1200&auto=format&fit=crop", description: "Budget-friendly and comfortable." },
  { id: 4, name: "Executive Suite", price: 6000, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop", description: "Premium suite for business stays." },
  { id: 5, name: "Family Room", price: 4500, image: "https://images.unsplash.com/photo-1560067174-e553b3641b80?q=80&w=1200&auto=format&fit=crop", description: "Large room ideal for families." },
  { id: 6, name: "Single Room", price: 1800, image: "https://images.unsplash.com/photo-1551776235-46f5d5c4b9f5?q=80&w=1200&auto=format&fit=crop", description: "Compact, perfect for solo travelers." },
  { id: 7, name: "Twin Room", price: 2600, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop", description: "Two beds for shared stays." },
  { id: 8, name: "Sea View Room", price: 5200, image: "https://images.unsplash.com/photo-1505692794403-34f77b0e2ea5?q=80&w=1200&auto=format&fit=crop", description: "Beautiful ocean views." },
  { id: 9, name: "Mountain View Room", price: 5000, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop", description: "Relax with mountain vistas." },
  { id: 10, name: "Penthouse", price: 8800, image: "https://images.unsplash.com/photo-1560448075-bb4caa6cfc99?q=80&w=1200&auto=format&fit=crop", description: "Top-floor luxury experience." },
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

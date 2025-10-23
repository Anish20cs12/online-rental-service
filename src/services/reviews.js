// Simple reviews storage using localStorage
// Each review: { id, category, itemId, userEmail, userName, rating, comment, createdAt }

const STORAGE_KEY = "reviews";

function readAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function writeAll(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getReviews(category, itemId) {
  const all = readAll();
  return all.filter((r) => r.category === category && r.itemId === itemId);
}

export function addReview({ category, itemId, userEmail, userName, rating, comment }) {
  const all = readAll();
  const review = {
    id: Date.now(),
    category,
    itemId,
    userEmail,
    userName,
    rating: Number(rating),
    comment: (comment || "").trim(),
    createdAt: new Date().toISOString(),
  };
  all.push(review);
  writeAll(all);
  return review;
}

export function getAverageRating(category, itemId) {
  const list = getReviews(category, itemId);
  if (list.length === 0) return null;
  const sum = list.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
  return Math.round((sum / list.length) * 10) / 10; // one decimal
}

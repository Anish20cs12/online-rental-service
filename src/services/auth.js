// src/services/auth.js
export function signup(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === user.email)) {
    return { success: false, message: "User already exists" };
  }
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true };
}

export function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Invalid credentials" };
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

// helper: if you want to quickly create an admin during dev
export function ensureAdmin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (!users.find(u => u.email === "admin@a.com")) {
    users.push({ name: "Admin", email: "admin@a.com", password: "admin", role: "admin" });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

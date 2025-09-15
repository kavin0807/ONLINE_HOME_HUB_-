// Simple client-side auth using localStorage
// NOTE: For production, replace with a secure backend.

export function getUsers() {
  try {
    const raw = localStorage.getItem('users');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

export async function hashPassword(password) {
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function registerUser(name, email, password) {
  const users = getUsers();
  const normalizedEmail = String(email).trim().toLowerCase();

  if (users.some(u => u.email === normalizedEmail)) {
    throw new Error('Email already registered');
  }

  const passwordHash = await hashPassword(password);
  users.push({ name: name.trim(), email: normalizedEmail, passwordHash, createdAt: Date.now(), avatar: '/images/products/default.jpg' });
  saveUsers(users);
  return { name, email: normalizedEmail };
}

export async function loginUser(email, password) {
  const users = getUsers();
  const normalizedEmail = String(email).trim().toLowerCase();
  const user = users.find(u => u.email === normalizedEmail);
  if (!user) throw new Error('Invalid email or password');

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) throw new Error('Invalid email or password');

  setCurrentUser({ name: user.name, email: user.email, avatar: user.avatar || '/images/products/default.jpg' });
  return { name: user.name, email: user.email, avatar: user.avatar || '/images/products/default.jpg' };
}

export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('currentUser');
}
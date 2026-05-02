// 🔹 Decode JWT
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

// 🔹 Check expiry
export const isTokenExpired = (token) => {
  const decoded = parseJwt(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

// 🔹 Logout
export const logout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin/login";
};
/* Demo-only page guard and user label. Not production authentication. */
(() => {
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isLogin = file === "login.html" || file === "index.html" || file === "";
  let user = null;
  try { user = JSON.parse(localStorage.getItem("smartParkingUser") || "null"); } catch (_) {}
  if (!isLogin && !user) {
    location.replace("login.html");
    return;
  }
  if (isLogin && user) {
    location.replace("smart_parking_dashboard.html");
    return;
  }
  if (!user) return;
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-sp-user-name]").forEach(el => el.textContent = user.displayName || user.username || "Pengguna");
    document.querySelectorAll("[data-sp-user-role]").forEach(el => el.textContent = user.role === "wadir" ? "Wakil Direktur SDM" : "Petugas Parkir");
    document.querySelectorAll("[data-sp-logout]").forEach(el => el.addEventListener("click", event => {
      event.preventDefault();
      localStorage.removeItem("smartParkingUser");
      location.replace("login.html");
    }));
  });
})();

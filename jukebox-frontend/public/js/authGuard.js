document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userEmail = sessionStorage.getItem("userEmail");
  const userRole = sessionStorage.getItem("userRole");

  // Redirect if token or user info is missing
  if (!token || !userEmail || !userRole) {
    console.warn("No token or user info found. Redirecting to login.");
    window.location.href = "/login";
    return;
  }

  // Debug: Log current user
  console.log("Logged-in user:", userEmail, userRole);

  // If a non-admin tries to access admin page, redirect
  if (window.location.pathname.includes("admin") && userRole !== "admin") {
    console.warn("Non-admin tried accessing admin page. Redirecting...");
    window.location.href = "/login";
    return;
  }

  // Show Admin tab only for admin users
  const adminTab = document.getElementById("adminTab");
  if (userRole === "admin" && adminTab) {
    adminTab.style.display = "inline-block";
  }
});

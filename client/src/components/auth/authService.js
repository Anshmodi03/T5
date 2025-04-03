const API_BASE = "http://localhost:8000";

async function getCsrfToken() {
  // Fetch the CSRF token from the server (make sure credentials are included so that cookies are sent)
  const response = await fetch(`${API_BASE}/api/csrf-token`, {
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
}

export async function login({ email, password, userRole }) {
  const endpoint =
    userRole === "teacher" ? "/api/teacher/login" : "/api/auth/login";
  const csrfToken = await getCsrfToken();
  const response = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function register({ name, email, mobile, password, userRole }) {
  const endpoint =
    userRole === "teacher" ? "/api/teacher/register" : "/api/auth/register";
  const csrfToken = await getCsrfToken();
  const response = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ name, email, mobile, password }),
  });
  return response.json();
}

export async function verifyOtp({ otp, userRole, email }) {
  const endpoint =
    userRole === "teacher" ? "/api/teacher/verify-otp" : "/api/auth/verify-otp";
  const csrfToken = await getCsrfToken();
  const response = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ email, otp }),
  });
  return response.json();
}

export async function requestPasswordReset({ email, userRole }) {
  const endpoint =
    userRole === "teacher"
      ? "/api/teacher/request-password-reset"
      : "/api/auth/request-password-reset";
  const csrfToken = await getCsrfToken();
  const response = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ email }),
  });
  return response.json();
}

export async function resetPassword({ email, token, newPassword, userRole }) {
  const endpoint =
    userRole === "teacher"
      ? "/api/teacher/reset-password"
      : "/api/auth/reset-password";
  const csrfToken = await getCsrfToken();
  const response = await fetch(API_BASE + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ email, token, newPassword }),
  });
  return response.json();
}

// New Logout function
export async function logout() {
  const csrfToken = await getCsrfToken();
  const response = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken,
    },
    credentials: "include",
  });

  if (response.ok) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { message: "Logout successful" };
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Logout failed");
  }
}

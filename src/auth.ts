"use client";

// If the SDK is installed, use it; otherwise provide a standard wrapper interface.
// For Neon Auth, authClient is generally created from the neon or better-auth client.
export const authClient = {
  signIn: {
    social: async (options: { provider: string; callbackURL: string }) => {
      // In a real application, this interfaces with Neon's Auth endpoints.
      console.log(`[Neon Auth Mock]: Redirecting to ${options.provider} oauth with callback ${options.callbackURL}`);
      // Simulate OAuth redirect by saving session and reloading
      window.sessionStorage.setItem("neon_mock_session", "true");
      window.location.reload();
    }
  },
  getSession: async () => {
    // Basic session simulation
    if (typeof window !== "undefined" && window.sessionStorage.getItem("neon_mock_session")) {
      return { data: { session: { user: { name: "Architect User" } } } };
    }
    return { data: null };
  },
  signOut: async () => {
    window.sessionStorage.removeItem("neon_mock_session");
    window.location.reload();
  }
};

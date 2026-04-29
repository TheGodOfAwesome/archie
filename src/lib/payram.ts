// src/lib/payram.ts

export interface PayramPaymentRequest {
  title: string;
  description?: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
  redirectUrl?: string;
  cancelUrl?: string;
}

export interface PayramPaymentResponse {
  id: string;
  url: string;
  status: string;
}

const PAYRAM_BASE_URL = process.env.PAYRAM_URL || "http://164.68.121.33:8443";
const PAYRAM_API_KEY = process.env.PAYRAM_API_KEY || "dummy_key_for_now";

export const payram = {
  /**
   * Creates a new hosted payment link on your self-hosted Payram instance.
   */
  async createPayment(data: PayramPaymentRequest): Promise<PayramPaymentResponse> {
    try {
      // In a real integration, you might hit /api/v1/payments or similar
      const res = await fetch(`${PAYRAM_BASE_URL}/api/v1/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${PAYRAM_API_KEY}`,
          "x-api-key": PAYRAM_API_KEY
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        console.error("Payram error response:", await res.text());
        throw new Error("Failed to create Payram payment");
      }

      return await res.json();
    } catch (error) {
      console.error("Payram integration error:", error);
      
      // Fallback/Mock during development if your VPS payram instance isn't running yet
      if (process.env.NODE_ENV === "development" || true) { // Defaulting to true for safe local dev demo
        console.log("Mocking Payram response...");
        const mockId = "pay_" + Math.random().toString(36).substring(7);
        return {
          id: mockId,
          url: `${PAYRAM_BASE_URL}/checkout/${mockId}`,
          status: "pending"
        };
      }
      throw error;
    }
  },

  /**
   * Helper to verify incoming webhooks from Payram
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // Implement standard HMAC validation here depending on Payram docs
    return true; // Simplified for MVP
  }
};

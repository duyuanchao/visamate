// lib/session.ts
export interface AppUser {
  id: string;
  email: string;
  visaCategory: string;   // stores the `value` field from visaCategories
}

/** Mock user returned immediately; replace with real auth later. */
export async function getCurrentUser(): Promise<AppUser | null> {
  return {
    id: 'demo‑user‑123',
    email: 'demo@example.com',
    // Pretend they already chose EB‑2 NIW
    visaCategory: 'eb2_niw',
  };
}

// API Configuration
// In production, set these via environment variables:
// VITE_API_STEP1_URL and VITE_API_STEP2_URL

export const API_STEP1_URL =
  import.meta.env.VITE_API_STEP1_URL || 'http://localhost:4001';

export const API_STEP2_URL =
  import.meta.env.VITE_API_STEP2_URL || 'http://localhost:4002';


export type Resource = {
  id: string;
  name: string;
  format: string;
  url: string;
  description?: string; // make optional to avoid mismatch
};

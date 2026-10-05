export type Strength = {
  score: number; 
  label: string;
  bar: string;
  text: string;
};

const LEVELS: Strength[] = [
  { score: 0, label: "", bar: "bg-gray-200", text: "text-gray-500" },
  { score: 1, label: "Weak", bar: "bg-red-500", text: "text-red-500" },
  { score: 2, label: "Fair", bar: "bg-orange-500", text: "text-orange-500" },
  { score: 3, label: "Good", bar: "bg-[#2B7FFF]", text: "text-[#2B7FFF]" },
  { score: 4, label: "Strong", bar: "bg-green-500", text: "text-green-600" },
];

export function getPasswordStrength(password: string): Strength {
  if (!password) return LEVELS[0];

  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length < 8) score = Math.min(score, 1);

  return LEVELS[Math.max(score, 1)];
}
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const REPORT_REASONS = {
  spam: "Spam or scam",
  fake_profile: "Fake profile",
  inappropriate_content: "Inappropriate photos or messages",
  harassment: "Harassment or abuse",
  other: "Other",
};

export default ALLOWED_IMAGE_TYPES;

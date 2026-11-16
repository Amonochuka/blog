export const inquiryTypes = [
  "general",
  "volunteer",
  "church_partnership",
  "organisation_partnership",
  "support_project",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export function isInquiryType(value: unknown): value is InquiryType {
  return typeof value === "string" && inquiryTypes.includes(value as InquiryType);
}

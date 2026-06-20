/**
 * Shared date utilities for TechPulse.
 * All date formatting goes through here — guarantees no "Invalid Date".
 */

/** Format to Vietnamese long date: "19 tháng 6, 2026" */
export function formatDateVI(dateString?: string | null): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

/** Format to short date: "19/6/2026" */
export function formatDateShort(dateString?: string | null): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("vi-VN");
  } catch {
    return "";
  }
}

/** Format to ISO date string for <time> datetime attr */
export function formatDateISO(dateString?: string | null): string {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    return d.toISOString();
  } catch {
    return "";
  }
}

/** "X phút đọc" label */
export function readingTimeLabel(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "";
  return `${minutes} phút đọc`;
}

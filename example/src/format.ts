import { TopwiseError, bytes2HexString } from "@slipstream/topwise-sdk";

/**
 * Render a check's result for a phone screen: bytes as hex, bitmaps as a size
 * rather than a wall of base64, everything else as compact JSON.
 */
export function formatValue(value: unknown, depth = 0): string {
  if (value === null || value === undefined) return String(value);
  if (value instanceof Uint8Array) {
    return value.length === 0 ? "(0 bytes)" : `${bytes2HexString(value)} (${value.length} bytes)`;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value.map((v) => formatValue(v, depth + 1)).join("\n");
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (typeof obj["base64"] === "string" && obj["_tag"] === "Bitmap") {
      return `Bitmap (${Math.round((obj["base64"] as string).length * 0.75)} bytes PNG)`;
    }
    const pad = "  ".repeat(depth);
    return Object.entries(obj)
      .map(([k, v]) => `${pad}${k}: ${formatValue(v, depth + 1).replace(/\n/g, `\n${pad}  `)}`)
      .join("\n");
  }
  return String(value);
}

/** Turn any failure into something worth reading on a terminal screen. */
export function formatError(error: unknown): string {
  if (error instanceof TopwiseError) {
    return `${error.code} - ${error.message}\n  at ${error.module}.${error.method}`;
  }
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  if (typeof error === "object" && error !== null) {
    const tagged = error as { _tag?: string; message?: string; code?: string };
    if (tagged._tag !== undefined) {
      return `${tagged._tag}${tagged.code ? ` (${tagged.code})` : ""}: ${tagged.message ?? ""}`;
    }
  }
  return String(error);
}

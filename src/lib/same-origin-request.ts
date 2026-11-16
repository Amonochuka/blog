export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0].trim();
  const requestHost = (forwardedHost || request.headers.get("host") || "").toLowerCase();
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const requestProtocol = forwardedProtocol || new URL(request.url).protocol.slice(0, -1);

  return originUrl.host.toLowerCase() === requestHost && originUrl.protocol === `${requestProtocol}:`;
}

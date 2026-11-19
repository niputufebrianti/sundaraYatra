const allowedMapHosts = new Set([
  "www.google.com",
  "maps.google.com",
  "maps.app.goo.gl",
]);

export function getValidMapsUrl(value) {
  if (typeof value !== "string" || !value.startsWith("https://")) {
    return null;
  }

  try {
    const url = new URL(value);
    return (
      allowedMapHosts.has(url.hostname) && !url.username && !url.password
        ? url.href
        : null
    );
  } catch {
    return null;
  }
}

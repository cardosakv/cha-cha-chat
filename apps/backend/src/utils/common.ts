export function parseDataUrl(dataUrl: string): { mime: string; base64: string } | null {
  const regex = /^data:(.*?);base64,(.*)$/;
  const match = regex.exec(dataUrl);
  if (!match) return null;

  return {
    mime: match[1],
    base64: match[2],
  };
}

export function dataUrlToUint8Array(dataUrl: string): Uint8Array | null {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) return null;

  return Uint8Array.from(Buffer.from(parsed.base64, 'base64'));
}

export function uint8ArrayToDataUrl(binary: Uint8Array, mimeType: string = 'application/octet-stream'): string {
  const base64 = Buffer.from(binary).toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

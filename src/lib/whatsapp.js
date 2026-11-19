export function isValidWhatsAppNumber(phoneNumber) {
  return typeof phoneNumber === "string" && /^[1-9]\d{7,14}$/.test(phoneNumber);
}

export function createWhatsAppUrl(phoneNumber, itemName) {
  if (!isValidWhatsAppNumber(phoneNumber) || typeof itemName !== "string" || !itemName.trim()) {
    return null;
  }

  const message = `Halo, saya ingin menanyakan informasi tentang ${itemName.trim()}.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

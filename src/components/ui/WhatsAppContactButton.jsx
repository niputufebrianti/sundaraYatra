import Button from "./Button";
import { createWhatsAppUrl } from "../../lib/whatsapp";

export default function WhatsAppContactButton({
  phoneNumber,
  itemName,
  showUnavailable = true,
}) {
  const href = createWhatsAppUrl(phoneNumber, itemName);

  if (!href) {
    if (!showUnavailable) return null;

    return (
      <Button
        type="button"
        variant="secondary"
        className="contact-button"
        disabled
        aria-disabled="true"
      >
        Kontak belum tersedia
      </Button>
    );
  }

  return (
    <Button
      href={href}
      variant="secondary"
      className="contact-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      Hubungi via WhatsApp
    </Button>
  );
}

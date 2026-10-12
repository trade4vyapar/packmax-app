// Centralised WhatsApp config + per-product pre-filled messages.
// Every product slug in siteData should have an entry here; anything missing
// falls back to a generic message using the product name.

// WhatsApp number (with country code, no + sign)
export const WA_NUMBER = "919893115645";

export const WA_MESSAGES: Record<string, string> = {
  // E-commerce tapes
  "amazon-prime-tape": "Hi Packmax, I need Amazon Prime Tape. Please share price per roll and minimum order quantity.",
  "amazon-tape": "Hi Packmax, I need Amazon Tape. Please share price per roll and minimum order quantity.",
  "flipkart-tape": "Hi Packmax, I need Flipkart Tape. Please share price per roll and minimum order quantity.",
  "meesho-tape": "Hi Packmax, I need Meesho Tape. Please share price per roll and minimum order quantity.",

  // Plain BOPP tapes
  "bopp-brown-tape-roll": "Hi Packmax, I need BOPP Brown Tape. Please share price, available sizes and minimum order quantity.",
  "bopp-transparent-tape-roll": "Hi Packmax, I need BOPP Transparent Tape. Please share price, available sizes and minimum order quantity.",
  "bopp-color-tape-roll": "Hi Packmax, I need BOPP Color Tape. Please share available colours, price and minimum order quantity.",

  // Custom printed tapes
  "custom-brand-printed-tape": "Hi Packmax, I want my brand logo printed on tape. Please share price, printing options and minimum order quantity.",
  "multi-color-printed-tape": "Hi Packmax, I want multi-color printed tape with my logo. Please share price, printing options and minimum order quantity.",
  "branded-kraft-white-tape": "Hi Packmax, I want branded kraft/white printed tape. Please share price, printing options and minimum order quantity.",

  // Courier bags
  "plain-courier-bags": "Hi Packmax, I need Plain Tamper-Proof Courier Bags. Please share available sizes, price and minimum order quantity.",
  "amazon-courier-bags": "Hi Packmax, I need Amazon Printed Courier Bags. Please share available sizes, price and minimum order quantity.",
  "flipkart-courier-bags": "Hi Packmax, I need Flipkart Printed Courier Bags. Please share available sizes, price and minimum order quantity.",

  // Other packaging materials
  "stretch-film-roll": "Hi Packmax, I need Stretch Film Rolls. Please share price, roll weight/size and minimum order quantity.",
  "corrugated-paper-roll": "Hi Packmax, I need Corrugated Paper Rolls. Please share price, available sizes and minimum order quantity.",
  "air-bubble-wrap": "Hi Packmax, I need Air Bubble Wrap Rolls. Please share price, available sizes and minimum order quantity.",
  "box-strapping-roll": "Hi Packmax, I need Box Strapping Rolls. Please share price, available sizes and minimum order quantity.",
  "box-strapping-clips": "Hi Packmax, I need Box Strapping Clips. Please share price and minimum order quantity.",
};

export function getWaMessage(slug: string, productName: string) {
  return WA_MESSAGES[slug] || `Hi Packmax, I need ${productName}. Please share price and minimum order quantity.`;
}

export function getWaLink(slug: string, productName: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(getWaMessage(slug, productName))}`;
}

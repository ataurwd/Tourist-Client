/**
 * Centralized SEO & metadata configuration for Treva Travel app.
 * Change the siteUrl once deployed to configure canonical links and sitemaps.
 */
export const seoConfig = {
  defaultTitle: "Treva — Premium Travel Experience",
  titleTemplate: "%s | Treva",
  defaultDescription: "Discover premium travel packages, expert guided tours, and custom itineraries. Book your next adventure with Treva, your premium travel companion.",
  defaultKeywords: "travel, tourism, tour guide, travel packages, adventure, vacation, treva, booking, travel guides",
  defaultImage: "https://i.ibb.co.com/FqKW885X/Screenshot-at-Jun-05-10-29-11-removebg-preview.png",
  siteUrl: "https://treva-travel.web.app", // Placeholder: replace with your final domain
  twitterHandle: "@TrevaTravel",
  organization: {
    name: "Treva Travel Ltd.",
    url: "https://treva-travel.web.app",
    logo: "https://i.ibb.co.com/FqKW885X/Screenshot-at-Jun-05-10-29-11-removebg-preview.png",
    contactPoint: {
      phone: "+880 1234 567 890",
      contactType: "Customer Support",
      email: "hello@treva.travel",
      areaServed: "Global"
    }
  }
};

export default seoConfig;

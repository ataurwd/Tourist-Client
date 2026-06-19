import React from "react";
import { Helmet } from "react-helmet-async";
import seoConfig from "../config/seoConfig";

/**
 * Reusable SEO component for dynamic header tags and search optimization.
 * 
 * @param {Object} props
 * @param {string} props.title - Dynamic title for the current page
 * @param {string} props.description - Custom description for search queries
 * @param {string} props.keywords - Comma-separated list of page-specific keywords
 * @param {string} props.image - Custom banner image for social shares
 * @param {string} props.urlPath - Relative path (e.g., '/about-us' or '/package/details/id')
 * @param {string} props.type - OG Type: 'website' or 'article'
 * @param {boolean} props.noindex - Instruct search engine spiders not to index this page
 * @param {Object} props.schema - Structured JSON-LD schema payload
 */
const SEO = ({
  title,
  description,
  keywords,
  image,
  urlPath = "",
  type = "website",
  noindex = false,
  schema
}) => {
  // Format Title
  const displayTitle = title
    ? seoConfig.titleTemplate.replace("%s", title)
    : seoConfig.defaultTitle;

  // Format Description
  const displayDescription = description || seoConfig.defaultDescription;

  // Format Keywords
  const displayKeywords = keywords
    ? `${seoConfig.defaultKeywords}, ${keywords}`
    : seoConfig.defaultKeywords;

  // Format Image
  const displayImage = image || seoConfig.defaultImage;

  // Build Canonical URL
  // Remove duplicate slashes if urlPath has leading slash
  const cleanPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  const canonicalUrl = `${seoConfig.siteUrl}${cleanPath === "/" ? "" : cleanPath}`;

  return (
    <Helmet>
      {/* General Metadata */}
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={displayKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:image" content={displayImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Treva" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
      <meta name="twitter:image" content={displayImage} />
      <meta name="twitter:creator" content={seoConfig.twitterHandle} />

      {/* Structured Schema Markup */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

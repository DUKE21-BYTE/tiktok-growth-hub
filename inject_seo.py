import glob
import re

seo_tags = """
  <!-- SEO & Open Graph Tags -->
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="Buy TikTok Followers Kenya, TikTok Views M-Pesa, TikTok Likes, TikTok Growth Agency Nairobi, TokGrow" />
  <link rel="canonical" href="https://tokgrow.co.ke/{FILENAME}" />
  <meta property="og:title" content="TokGrow | Buy TikTok Followers Kenya & Boost Organic Views" />
  <meta property="og:description" content="Explode your TikTok presence safely. We offer 100% secure, algorithmic TikTok growth services in Kenya. No passwords required." />
  <meta property="og:image" content="https://tokgrow.co.ke/icon-512.png" />
  <meta property="og:url" content="https://tokgrow.co.ke/{FILENAME}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="TokGrow | TikTok Growth Agency Kenya" />
  <meta name="twitter:description" content="Secure, algorithmic TikTok growth services in Kenya." />
  <meta name="twitter:image" content="https://tokgrow.co.ke/icon-512.png" />
"""

schema_organization = """
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "TokGrow",
    "image": "https://tokgrow.co.ke/icon-512.png",
    "url": "https://tokgrow.co.ke",
    "telephone": "+254712345678",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "description": "Algorithmic TikTok growth platform in Kenya offering safe followers, views, and likes via M-Pesa.",
    "priceRange": "KSh 800 - KSh 15,000"
  }
  </script>
"""

schema_service = """
  <!-- JSON-LD Structured Data for Services -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "TikTok Growth Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "TokGrow"
    },
    "description": "Buy TikTok followers, views, and likes to trigger the TikTok algorithm.",
    "areaServed": "Kenya"
  }
  </script>
"""

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Do not inject if already injected
    if "<!-- SEO & Open Graph Tags -->" in content:
        continue

    # Prepare tags
    fn = filepath if filepath != 'index.html' else ''
    specific_seo_tags = seo_tags.replace('{FILENAME}', fn)
    
    # For <head> insertion
    # Insert before <script src="https://unpkg.com/@tailwindcss/browser@4"></script> or before <!-- Tailwind CSS -->
    if "<!-- Tailwind CSS" in content:
        content = content.replace("<!-- Tailwind CSS", specific_seo_tags + "\n  <!-- Tailwind CSS")
    else:
        # fallback
        content = content.replace("</title>\n", "</title>\n" + specific_seo_tags)
        
    # Inject Schema
    if filepath in ['index.html', 'contact.html', 'about.html']:
        content = content.replace("</head>", schema_organization + "\n</head>")
    elif filepath in ['services.html', 'results.html']:
        content = content.replace("</head>", schema_service + "\n</head>")
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("SEO tags injected.")

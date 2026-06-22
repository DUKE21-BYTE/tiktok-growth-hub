const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

function extractSection(html, startComment, endComment) {
    const startIdx = html.indexOf(startComment);
    if (startIdx === -1) return '';
    if (!endComment) {
        // If no end comment, extract until the end
        return html.substring(startIdx);
    }
    const endIdx = html.indexOf(endComment);
    if (endIdx === -1) return html.substring(startIdx);
    return html.substring(startIdx, endIdx);
}

const headStart = html.substring(0, html.indexOf('<!-- ================= HEADER ================= -->'));
const header = extractSection(html, '<!-- ================= HEADER ================= -->', '<main>');
const mainStart = '\n  <main>\n';
const hero = extractSection(html, '<!-- ================= HERO ================= -->', '<!-- ================= SERVICES ================= -->');
const services = extractSection(html, '<!-- ================= SERVICES ================= -->', '<!-- ================= CALCULATOR ================= -->');
const calculator = extractSection(html, '<!-- ================= CALCULATOR ================= -->', '<!-- ================= PROOF OF SUCCESS ================= -->');
const proof = extractSection(html, '<!-- ================= PROOF OF SUCCESS ================= -->', '<!-- ================= REQUIREMENTS ================= -->');
const requirements = extractSection(html, '<!-- ================= REQUIREMENTS ================= -->', '<!-- ================= ABOUT ================= -->');
const about = extractSection(html, '<!-- ================= ABOUT ================= -->', '<!-- ================= CONTACT ================= -->');
const contact = extractSection(html, '<!-- ================= CONTACT ================= -->', '</main>');
const mainEnd = '\n  </main>\n';
const footer = extractSection(html, '<!-- ================= FOOTER ================= -->', '<!-- ================= WHATSAPP MODAL ================= -->');
const modalAndEnd = extractSection(html, '<!-- ================= WHATSAPP MODAL ================= -->', null);

function updateHeaderLinks(headerHtml) {
    let newHeader = headerHtml.replace(/data-scroll-to="home"/g, 'href="index.html"');
    newHeader = newHeader.replace(/data-scroll-to="services"/g, 'href="services.html"');
    newHeader = newHeader.replace(/data-scroll-to="proof"/g, 'href="results.html"');
    newHeader = newHeader.replace(/data-scroll-to="requirements"/g, 'href="about.html"');
    newHeader = newHeader.replace(/data-scroll-to="about"/g, 'href="about.html"');
    newHeader = newHeader.replace(/data-scroll-to="contact"/g, 'href="contact.html"');
    newHeader = newHeader.replace(/<button data-scroll-to/g, '<a');
    newHeader = newHeader.replace(/<\/button>([^<]*?)<button data-scroll-to/g, '</a>$1<a');
    
    // Replace all closing </button> for nav links
    newHeader = newHeader.replace(/<a([^>]*?)>([^<]*?)<\/button>/g, '<a$1>$2</a>');
    
    // Fixing specifically the Desktop nav replacing buttons with anchors
    newHeader = newHeader.replace(/<button href=/g, '<a href=');
    newHeader = newHeader.replace(/<\/button>\s*<a href=/g, '</a>\n          <a href=');

    // Make sure we get all of them. The mobile menu ones:
    newHeader = newHeader.replace(/<button href="index.html"(.*?)>Home<\/button>/, '<a href="index.html"$1>Home</a>');
    newHeader = newHeader.replace(/<button href="services.html"(.*?)>Services<\/button>/, '<a href="services.html"$1>Services</a>');
    newHeader = newHeader.replace(/<button href="results.html"(.*?)>Proof of Success<\/button>/, '<a href="results.html"$1>Proof of Success</a>');
    newHeader = newHeader.replace(/<button href="about.html"(.*?)>Requirements<\/button>/, '<a href="about.html"$1>Requirements</a>');
    newHeader = newHeader.replace(/<button href="about.html"(.*?)>About Us<\/button>/, '<a href="about.html"$1>About Us</a>');
    newHeader = newHeader.replace(/<button href="contact.html"(.*?)>Contact<\/button>/, '<a href="contact.html"$1>Contact</a>');
    
    // Desktop menu ones:
    newHeader = newHeader.replace(/<button href="index.html"(.*?)>([\s\S]*?)<\/button>/, '<a href="index.html"$1>$2</a>');
    newHeader = newHeader.replace(/<button href="services.html"(.*?)>([\s\S]*?)<\/button>/, '<a href="services.html"$1>$2</a>');
    newHeader = newHeader.replace(/<button href="results.html"(.*?)>([\s\S]*?)<\/button>/, '<a href="results.html"$1>$2</a>');
    newHeader = newHeader.replace(/<button href="about.html"(.*?)>([\s\S]*?)<\/button>/g, '<a href="about.html"$1>$2</a>');
    newHeader = newHeader.replace(/<button href="contact.html"(.*?)>([\s\S]*?)<\/button>/, '<a href="contact.html"$1>$2</a>');

    return newHeader;
}

const finalHeader = updateHeaderLinks(header);

function constructPage(title, desc, contentSections) {
    let pageHead = headStart.replace('<title>TokGrow | Algorithmic TikTok Growth Platform</title>', `<title>${title}</title>\n  <meta name="description" content="${desc}" />`);
    return pageHead + finalHeader + mainStart + contentSections + mainEnd + footer + modalAndEnd;
}

const indexContent = constructPage(
    'TokGrow | Buy TikTok Followers Kenya & Boost Organic Views',
    'Explode your TikTok presence safely. We offer 100% secure, algorithmic TikTok growth services in Kenya. No passwords required. Boost followers, views, and likes today.',
    hero
);
fs.writeFileSync('index.html', indexContent);

const servicesContent = constructPage(
    'TikTok Growth Packages & Pricing | TokGrow Kenya',
    'View our highly customized TikTok growth packages. Buy cheap TikTok followers, views, and likes in Kenya via M-Pesa. Use our interactive campaign builder to calculate your price.',
    services + calculator
);
fs.writeFileSync('services.html', servicesContent);

const resultsContent = constructPage(
    'Proof of Success & Case Studies | TokGrow',
    'Real proof of our TikTok growth campaigns. View our live before/after slider and successful case studies of accounts we\'ve pushed to the For You Page.',
    proof
);
fs.writeFileSync('results.html', resultsContent);

const aboutContent = constructPage(
    'About TokGrow & Campaign Requirements',
    'Learn about TokGrow, Kenya\'s top algorithmic TikTok growth platform. Understand our simple, password-free requirements to launch your viral campaign safely.',
    about + requirements
);
fs.writeFileSync('about.html', aboutContent);

const contactContent = constructPage(
    'Contact TokGrow & FAQs | TikTok Marketing Support',
    'Have questions about buying TikTok followers or views? Read our FAQs or contact the TokGrow support team directly via WhatsApp for a free consultation.',
    contact
);
fs.writeFileSync('contact.html', contactContent);

console.log('Pages successfully split!');

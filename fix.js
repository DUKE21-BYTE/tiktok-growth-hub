const fs = require('fs');

const files = ['index.html', 'services.html', 'results.html', 'about.html', 'contact.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // We replaced the opening <button with <a, but maybe missed the closing </button> for some.
    // In the desktop nav:
    content = content.replace(/<a href="contact.html"([^>]*)>\s*Contact <span([^>]*)><\/span>\s*<\/button>/g, '<a href="contact.html"$1>\n            Contact <span$2></span>\n          </a>');
    
    // In the mobile nav:
    content = content.replace(/<a href="contact.html"([^>]*)>Contact<\/button>/g, '<a href="contact.html"$1>Contact</a>');
    
    fs.writeFileSync(file, content);
});

console.log('Fixed tags!');

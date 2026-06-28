import glob
import re

pwa_tags = """
  <!-- PWA & Theme -->
  <link rel="manifest" href="manifest.json" />
  <meta name="theme-color" content="#06b6d4" />
"""

theme_toggle_btn = """
          <button id="theme-toggle" class="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-xl transition-colors">
            <i id="theme-icon" data-lucide="moon" class="h-5 w-5"></i>
          </button>
"""

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if "manifest.json" not in content:
        # Inject before </head>
        content = content.replace("</head>", pwa_tags + "</head>")
        
    if "id=\"theme-toggle\"" not in content:
        # Inject right before the mobile-menu-btn
        # Find: <button id="mobile-menu-btn"
        content = content.replace('<button id="mobile-menu-btn"', theme_toggle_btn + '          <button id="mobile-menu-btn"')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Injections complete.")

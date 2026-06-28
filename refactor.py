import glob
import re

replacements = [
    (r'bg-\[\#020203\]', 'bg-zinc-50 dark:bg-[#020203]'),
    (r'bg-\[\#050507\]', 'bg-zinc-100 dark:bg-[#050507]'),
    (r'bg-zinc-950/95', 'bg-white/95 dark:bg-zinc-950/95'),
    (r'bg-zinc-950/80', 'bg-white/80 dark:bg-zinc-950/80'),
    (r'bg-zinc-950/50', 'bg-zinc-50/80 dark:bg-zinc-950/50'),
    (r'bg-zinc-900/50', 'bg-zinc-100/80 dark:bg-zinc-900/50'),
    (r'bg-zinc-900/40', 'bg-zinc-100/60 dark:bg-zinc-900/40'),
    (r'bg-zinc-900/20', 'bg-zinc-100/40 dark:bg-zinc-900/20'),
    (r'bg-black/85', 'bg-white/85 dark:bg-black/85'),
    (r'bg-black/60', 'bg-white/80 dark:bg-black/60'),
    (r'bg-black/40', 'bg-zinc-200/50 dark:bg-black/40'),
    (r'bg-black/80', 'bg-white/90 dark:bg-black/80'),
    (r'bg-white/10', 'bg-zinc-900/5 dark:bg-white/10'),
    (r'(?<!dark:)bg-zinc-950', 'bg-white dark:bg-zinc-950'),
    (r'(?<!dark:)bg-zinc-900', 'bg-zinc-100 dark:bg-zinc-900'),
    (r'(?<!dark:)bg-zinc-800', 'bg-zinc-200 dark:bg-zinc-800'),
    (r'(?<!dark:)bg-black', 'bg-white dark:bg-black'),
    (r'(?<!dark:)text-white/60', 'text-zinc-900/60 dark:text-white/60'),
    (r'(?<!dark:)text-white', 'text-zinc-900 dark:text-white'),
    (r'(?<!dark:)text-zinc-400', 'text-zinc-600 dark:text-zinc-400'),
    (r'(?<!dark:)text-zinc-300', 'text-zinc-700 dark:text-zinc-300'),
    (r'(?<!dark:)text-zinc-500', 'text-zinc-500 dark:text-zinc-500'),
    (r'(?<!dark:)text-zinc-200', 'text-zinc-800 dark:text-zinc-200'),
    (r'(?<!dark:)text-zinc-100', 'text-zinc-800 dark:text-zinc-100'),
    (r'(?<!dark:)border-zinc-900', 'border-zinc-200 dark:border-zinc-900'),
    (r'(?<!dark:)border-zinc-800', 'border-zinc-300 dark:border-zinc-800'),
    (r'(?<!dark:)border-zinc-700', 'border-zinc-400 dark:border-zinc-700'),
    (r'(?<!dark:)hover:text-white', 'hover:text-zinc-900 dark:hover:text-white'),
    (r'(?<!dark:)hover:bg-zinc-900', 'hover:bg-zinc-200 dark:hover:bg-zinc-900'),
    (r'(?<!dark:)hover:bg-zinc-800', 'hover:bg-zinc-300 dark:hover:bg-zinc-800'),
    (r'(?<!dark:)hover:bg-zinc-950', 'hover:bg-white dark:hover:bg-zinc-950'),
    (r'(?<!dark:)hover:border-zinc-700', 'hover:border-zinc-400 dark:hover:border-zinc-700'),
    (r'(?<!dark:)hover:border-zinc-800', 'hover:border-zinc-300 dark:hover:border-zinc-800'),
    (r'(?<!dark:)fill-white', 'fill-zinc-900 dark:fill-white')
]

files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Reset all previous dark: classes from the previous run to avoid mess
    content = re.sub(r'bg-zinc-\d+ dark:bg-\[\#[\w]+\]', 'bg-[#020203]', content) # rough revert for bg
    content = re.sub(r'[\w/-]+ dark:([\w/\[\]#-]+)', r'\1', content)
    
    for pattern, rep in replacements:
        content = re.sub(r'(?<![a-zA-Z0-9_-])' + pattern + r'(?![a-zA-Z0-9_-])', rep, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("HTML refactoring complete.")

from pathlib import Path

root = Path(__file__).resolve().parent.parent / 'src'
replacements = [
    ('style="background-color: #162d4a; color: white;"', 'class="table-header"'),
    ('style="background-color: #162d4a;"', 'class="bg-institute-900"'),
    ('style="color: #162d4a;"', 'class="text-institute-900"'),
    ('style="color: #b45309;"', 'class="text-terracotta-600"'),
    ('style="background-color: #b45309;"', 'class="bg-terracotta-600"'),
    ('style="color: #f59e0b;"', 'class="text-terracotta-400"'),
    ('style="border-color: #b45309;"', 'class="border-terracotta-600"'),
    ('style="background-color: rgba(22,45,74,0.05);"', 'class="bg-institute-50"'),
    ('style="background-color: #f0f4ff;"', 'class="bg-cream-100"'),
]

for path in root.rglob('*.astro'):
    text = path.read_text(encoding='utf-8')
    orig = text
    for old, new in replacements:
        text = text.replace(old, new)
    if text != orig:
        path.write_text(text, encoding='utf-8')
        print('updated', path.relative_to(root))

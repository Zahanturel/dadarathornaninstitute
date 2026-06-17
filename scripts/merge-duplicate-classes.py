import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent / 'src'

pattern = re.compile(r'class="([^"]*?)"\s+class="([^"]*?)"')

for path in root.rglob('*.astro'):
    text = path.read_text(encoding='utf-8')
    orig = text
    while pattern.search(text):
        text = pattern.sub(r'class="\1 \2"', text)
    if text != orig:
        path.write_text(text, encoding='utf-8')
        print('merged classes in', path.relative_to(root))

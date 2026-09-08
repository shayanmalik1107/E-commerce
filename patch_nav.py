import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'Animora.html']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <nav class="navbar"> and the end of the nav block </nav>
    nav_pattern = re.compile(r'(<nav class="navbar">)(.*?)(</nav>)', re.DOTALL)
    
    def repl(m):
        nav_open = '<nav class="navbar" style="justify-content: space-between;">'
        inner = m.group(2)
        nav_close = m.group(3)
        
        # We need to find the logo container to exclude it from right-menu
        logo_pattern = re.compile(r'(<div class="logo-container">.*?</div>)(.*)', re.DOTALL)
        logo_match = logo_pattern.search(inner)
        
        if logo_match:
            logo = logo_match.group(1)
            rest = logo_match.group(2)
            # Wrap the rest in right-menu
            new_inner = logo + '\n    <div class="right-menu" style="display: flex; align-items: center; gap: 20px;">' + rest + '\n    </div>\n  '
            return nav_open + new_inner + nav_close
        
        return m.group(0) # fallback

    new_content = nav_pattern.sub(repl, content)

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Patched {file}")


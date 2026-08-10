from pathlib import Path
import re

p = Path("app/ratgeber/articles.ts")
t = p.read_text(encoding="utf-8")

# Remove every broken or duplicate audioSrc line
t = re.sub(r"\n\s*audioSrc:\s*\"[^\n]*\",?", "", t)

slugs = re.findall(r'^\s*slug:\s*"([^"]+)",', t, flags=re.M)
print("slugs", len(slugs), slugs)


def add(m: re.Match[str]) -> str:
    slug = m.group(1)
    return (
        f'slug: "{slug}",\n'
        f'    audioSrc: "/audio/articles/{slug}.mp3?v=1",'
    )


t = re.sub(r'slug:\s*"([^"]+)",', add, t)
p.write_text(t, encoding="utf-8")
print("audioSrc count", t.count("audioSrc:"))
print("sample lines:")
for line in t.splitlines():
    if "audioSrc" in line or line.strip().startswith("slug:"):
        print(line)

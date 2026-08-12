from pathlib import Path
import re

p = Path("app/ratgeber/articles.ts")
t = p.read_text(encoding="utf-8")


def add(m: re.Match[str]) -> str:
    slug = m.group(1)
    return f'slug: "{slug}",\n    audioSrc: "/audio/articles/{slug}.mp3?v=1",'


t2 = re.sub(r'slug: "([^"]+)",', add, t)
# collapse accidental duplicates
t2 = re.sub(
    r'(audioSrc: "/audio/articles/[^"]+\.mp3\?v=1",\n\s*)+',
    r'audioSrc: "/audio/articles/\1',
    t2,
)
# simpler duplicate cleanup
while 'audioSrc: "/audio/articles/' in t2 and ',\n    audioSrc:' in t2:
    t2 = re.sub(
        r'audioSrc: "(/audio/articles/[^"]+)",\n\s*audioSrc: "\1",',
        r'audioSrc: "\1",',
        t2,
    )
    break

p.write_text(t2, encoding="utf-8")
print("audioSrc count", t2.count("audioSrc:"))

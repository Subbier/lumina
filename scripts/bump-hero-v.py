from pathlib import Path

p = Path("app/dienstleistungen/content.ts")
t = p.read_text(encoding="utf-8")
t = t.replace("spitex-hero-home-visit.jpg?v=sq2", "spitex-hero-home-visit.jpg?v=sq3")
t = t.replace("angehoerige-hero-anleitung.jpg?v=sq2", "angehoerige-hero-anleitung.jpg?v=sq3")
t = t.replace(
    'image: "/images/spitex-hero-home-visit.jpg"',
    'image: "/images/spitex-hero-home-visit.jpg?v=sq3"',
)
t = t.replace(
    'image: "/images/angehoerige-hero-anleitung.jpg"',
    'image: "/images/angehoerige-hero-anleitung.jpg?v=sq3"',
)
p.write_text(t, encoding="utf-8")
print("bumped")

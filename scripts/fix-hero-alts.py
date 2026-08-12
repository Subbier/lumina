from pathlib import Path

p = Path("app/dienstleistungen/content.ts")
t = p.read_text(encoding="utf-8")
t = t.replace(
    'image: "/images/angehoerige-hero-anleitung.jpg"',
    'image: "/images/angehoerige-hero-anleitung.jpg?v=sq2"',
)
t = t.replace(
    "Pflegefachperson instruiert einen Angehörigen, wie er seinen betagten Vater anzieht",
    "Pflegefachperson zeigt einem Angehörigen auf Hausbesuch, wie er seinen Vater unterstützt",
)
# ensure spitex also has cache bust if missing
t = t.replace(
    'image: "/images/spitex-hero-home-visit.jpg"',
    'image: "/images/spitex-hero-home-visit.jpg?v=sq2"',
)
p.write_text(t, encoding="utf-8")
print("ok", "angehoerige v=sq2" in t or "angehoerige-hero-anleitung.jpg?v=sq2" in t)

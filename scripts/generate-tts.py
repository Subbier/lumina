import asyncio
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio"
VOICE = "de-DE-KatjaNeural"


def speak(text: str) -> str:
    return (
        text.replace("Spitex-", "Spietex-")
        .replace("Spitex", "Spietex")
        .replace("SPITEX", "Spietex")
    )


SCRIPTS = {
    "spitex.mp3": speak(
        "Hallo und willkommen bei Lumina Spitex. "
        "Schön, dass Sie da sind. "
        "Wir kommen zu Ihnen nach Hause – mit professioneller Pflege, die wirklich zu Ihrem Alltag passt. "
        "Zuerst schauen wir gemeinsam hin: Was brauchen Sie gerade? "
        "Eine diplomierte Pflegefachperson macht die Abklärung bei Ihnen vor Ort und plant die nächsten Schritte mit Ihnen. "
        "Danach unterstützen wir Sie in der Grundpflege – zum Beispiel bei Körperpflege, Mobilisation oder beim Anziehen. "
        "Und wenn medizinische Massnahmen nötig sind, übernehmen wir die Behandlungspflege auf ärztliche Anordnung. "
        "Medikamente, Wundversorgung, Blutdruck – das regeln wir fachlich und ruhig. "
        "Wichtig für Sie: Diese Leistungen rechnen wir direkt mit der Krankenkasse ab. "
        "Sie müssen das nicht allein organisieren. "
        "Wenn Sie jetzt wissen möchten, wie der Einstieg bei Ihnen aussehen könnte, "
        "fordern Sie bitte eine kostenlose Erstberatung an – über das Kontaktformular auf dieser Seite oder telefonisch unter null vier drei, vier drei drei, acht acht, null null. "
        "Wir melden uns persönlich bei Ihnen."
    ),
    "begleitung.mp3": speak(
        "Hallo und willkommen bei der Begleitung von Lumina Spitex. "
        "Manchmal reicht Pflege allein nicht aus, damit der Tag wieder leicht wird. "
        "Genau hier setzen wir an. "
        "Wir helfen bei Erledigungen – Einkauf, Apotheke, Post oder Behördengängen. "
        "Wir begleiten Sie sicher zu Terminen, zum Beispiel zum Arzt oder zur Therapie. "
        "Und wir bleiben an Ihrer Seite, wenn Begegnung und Teilhabe wichtig sind: "
        "ein Spaziergang, ein Besuch, ein Café – einfach wieder dabei sein. "
        "Das geht über die kassenpflichtige Grundpflege hinaus und wird persönlich mit Ihnen vereinbart. "
        "Wenn Sie spüren, dass Sie genau diese Entlastung brauchen, "
        "fordern Sie bitte weitere Informationen an – über das Kontaktformular auf dieser Seite. "
        "Erzählen Sie uns kurz, was Ihnen helfen würde. Wir melden uns mit einem konkreten Vorschlag."
    ),
    "angehoerige.mp3": speak(
        "Hallo und willkommen bei Lumina Spitex – zum Thema pflegende Angehörige. "
        "Vielleicht pflegen Sie gerade jemanden, der Ihnen nahesteht. "
        "Dann wissen Sie: Das ist wertvoll. Und oft auch sehr fordernd. "
        "Sie müssen das nicht allein tragen. "
        "Bei Lumina können Sie angestellt werden – mit Lohn und Sozialversicherung. "
        "Eine diplomierte Pflegefachperson bleibt an Ihrer Seite, führt Sie ein und begleitet Sie im Alltag. "
        "Innerhalb von zwölf Monaten führen wir Sie zur anerkannten Qualifikation. "
        "Die dokumentierte Grundpflege wird über die Grundversicherung abgerechnet. "
        "So bleibt Nähe – und Sie gewinnen Sicherheit. "
        "Wenn Sie jetzt prüfen möchten, ob für Sie ein Lohnanspruch möglich ist, "
        "starten Sie bitte den kurzen Anspruch-Check auf dieser Seite. "
        "In rund zwei Minuten erhalten Sie eine erste Orientierung – unverbindlich und klar. "
        "Oder Sie fordern direkt eine persönliche Beratung an. Wir sind für Sie da."
    ),
    "home.mp3": speak(
        "Hallo und willkommen bei Lumina Spitex. "
        "Wir sind in Zürich und Aargau für Sie da – mit professioneller Pflege zu Hause, "
        "Begleitung im Alltag und einem klaren Modell für pflegende Angehörige. "
        "Wenn Sie wissen möchten, was zu Ihrer Situation passt, starten Sie mit einer kostenlosen Erstberatung. "
        "Oder prüfen Sie in wenigen Minuten Ihren möglichen Lohnanspruch."
    ),
    "team.mp3": speak(
        "Hallo und willkommen beim Team von Lumina Spitex. "
        "Wir suchen Pflegefachpersonen EFZ und diplomierte Fachpersonen in Zürich und Aargau. "
        "Faire Anstellung, klare Prozesse und echte Beziehungspflege. "
        "Bewerben Sie sich – wir freuen uns auf das Gespräch."
    ),
    "tarife.mp3": speak(
        "Hallo und willkommen zu den Tarifen von Lumina Spitex. "
        "Hier sehen Sie die Ansätze für kassenpflichtige Leistungen und Begleitung. "
        "Wenn etwas unklar ist, sprechen Sie mit uns – "
        "wir erklären Finanzierung und Rechnung ruhig und verständlich."
    ),
    "ueber-uns.mp3": speak(
        "Hallo und willkommen bei Lumina Spitex. "
        "Lumina kommt von Lumen – dem Licht. "
        "Für uns bedeutet das: Klarheit, Wärme und professionelle Pflege zu Hause. "
        "Lernen Sie uns kennen – oder melden Sie sich für ein persönliches Gespräch."
    ),
    "kontakt.mp3": speak(
        "Hallo – schön, dass Sie Kontakt aufnehmen. "
        "Schreiben Sie uns über das Formular oder rufen Sie an unter "
        "null vier drei, vier drei drei, acht acht, null null. "
        "Wir melden uns persönlich und unverbindlich."
    ),
    "ratgeber.mp3": speak(
        "Willkommen im Lumina-Ratgeber. "
        "Hier finden Sie verständliche Beiträge zu Pflege, Angehörigenlohn und Entlastung. "
        "Lesen Sie in Ruhe – oder starten Sie direkt den Anspruch-Check."
    ),
}


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in SCRIPTS.items():
        path = OUT / name
        communicate = edge_tts.Communicate(text, VOICE, rate="-8%", pitch="-2Hz")
        await communicate.save(str(path))
        print(f"wrote {path} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())

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
        "Willkommen bei den Spitex-Dienstleistungen von Lumina Spitex. "
        "Wir bieten professionelle Pflege zu Hause: Zuerst die Abklärung und Beratung, "
        "danach Grundpflege und Behandlungspflege. Beim Erstbesuch erfassen diplomierte "
        "Pflegefachpersonen Ihren Bedarf und erstellen mit Ihnen einen Versorgungsplan. "
        "Die Grundpflege unterstützt Körperpflege, Mobilisation und Selbständigkeit im Alltag. "
        "Die Behandlungspflege umfasst medizinisch-pflegerische Maßnahmen auf ärztliche Anordnung – "
        "etwa Medikamente, Wundversorgung oder Vitalzeichenkontrolle. "
        "Diese Leistungen rechnen wir direkt mit Ihrer Krankenkasse ab. "
        "Einzelheiten zu den Ansätzen finden Sie auf unserer Tarifseite. "
        "Wenn Sie mehr erfahren möchten, fordern Sie bitte eine kostenlose Erstberatung an – "
        "telefonisch oder über das Kontaktformular."
    ),
    "begleitung.mp3": speak(
        "Willkommen bei der Begleitung von Lumina Spitex. "
        "Wenn Pflege das Nötige sichert, schafft Begleitung das Angenehme. "
        "Wir unterstützen Sie bei Erledigungen im Alltag, begleiten Sie zu Terminen "
        "und fördern die Teilhabe am sozialen Leben. "
        "Dazu gehören Einkäufe und Besorgungen, Begleitung zu Arzt oder Behörde "
        "sowie Gesellschaft bei Spaziergängen, Besuchen und Anlässen. "
        "Diese Leistungen gehen über die kassenpflichtige Grundpflege hinaus und werden individuell vereinbart. "
        "Ansätze finden Sie auf unserer Tarifseite. "
        "Wenn Sie ein persönliches Arrangement wünschen, fordern Sie bitte weitere Informationen an."
    ),
    "angehoerige.mp3": speak(
        "Willkommen bei Lumina Spitex zum Thema pflegende Angehörige. "
        "Wenn Sie einen Menschen zu Hause pflegen, müssen Sie das nicht allein tragen. "
        "Lumina stellt Sie an, begleitet Sie eng und schult Sie im Alltag. "
        "Innerhalb von zwölf Monaten führen wir Sie zur anerkannten Qualifikation als Pflegehilfsperson. "
        "Die dokumentierte Grundpflege wird über die Grundversicherung abgerechnet. "
        "Sie erhalten monatlichen Lohn und Sozialversicherungsschutz. "
        "Eine diplomierte Pflegefachperson bleibt an Ihrer Seite – mit Einführung, Fachfragen und regelmässiger Begleitung. "
        "Der Weg ist klar: klären, abklären, anstellen, qualifizieren und dauerhaft begleiten. "
        "Wenn Sie wissen möchten, ob das Modell zu Ihrer Familie passt, fordern Sie bitte weitere Informationen an."
    ),
}


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in SCRIPTS.items():
        path = OUT / name
        communicate = edge_tts.Communicate(text, VOICE, rate="-5%")
        await communicate.save(str(path))
        print(f"wrote {path} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())

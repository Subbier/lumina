"""Generate pre-rendered blog audio with edge-tts (Katja)."""
import asyncio
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio" / "articles"
VOICE = "de-DE-KatjaNeural"


def speak(text: str) -> str:
    return (
        text.replace("Spitex-", "Spietex-")
        .replace("Spitex", "Spietex")
        .replace("SPITEX", "Spietex")
        .replace("KLV", "K L V")
        .replace("KVG", "K V G")
        .replace("OKP", "O K P")
        .replace("AHV", "A H V")
        .replace("EFZ", "E F Z")
    )


SCRIPTS = {
    "lohn-fuer-pflegende-angehoerige.mp3": speak(
        "Lohn für pflegende Angehörige: Was ist möglich? "
        "Seit dem Bundesgerichtsentscheid ist klar: Grundpflege kann über eine zugelassene Spietex "
        "auch dann über die Krankenkasse abgerechnet werden, wenn sie von angestellten Angehörigen erbracht wird. "
        "Vergütet wird die ärztlich verordnete Grundpflege – nicht jede Betreuungsminute. "
        "Eine Anstellung läuft über eine Spietex mit Bewilligung. "
        "Der effektive Lohn hängt vom dokumentierten Pflegebedarf ab. "
        "Prüfen Sie unverbindlich Ihren möglichen Anspruch mit dem Lumina Lohn-Check."
    ),
    "wer-gilt-als-pflegende-angehoerige.mp3": speak(
        "Wer gilt als pflegende Angehörige? "
        "Entscheidend sind Situation und regelmässige Grundpflege – "
        "nicht nur der Verwandtschaftsgrad. "
        "Ehepartner, Kinder, Eltern und enge Bezugspersonen können in Frage kommen, "
        "wenn sie dokumentierte Pflege übernehmen. "
        "Lumina klärt mit Ihnen, ob eine Anstellung möglich ist und was dazu nötig ist."
    ),
    "hilflosenentschaedigung-verstaendlich.mp3": speak(
        "Hilflosenentschädigung verständlich erklärt. "
        "Sie unterstützt Menschen, die im Alltag dauerhaft auf Hilfe angewiesen sind. "
        "Es gibt leichte, mittelschwere und schwere Hilflosigkeit – mit unterschiedlichen Beträgen. "
        "Wichtig: Sie ersetzt keine Spietex-Pflege, kann aber die Gesamtsituation entlasten. "
        "Lassen Sie sich beraten, welche Leistungen in Ihrer Situation zusammenpassen."
    ),
    "koerperpflege-zu-hause.mp3": speak(
        "Körperpflege zu Hause: Was zählt als Grundpflege? "
        "Dazu gehören typischerweise Hilfe beim Waschen, Anziehen, Essen, Lagern und Mobilisieren – "
        "im Rahmen einer pflegerischen Abklärung. "
        "Nicht jede Betreuung ist kassenpflichtig. "
        "Lumina erklärt Ihnen klar, was über die Krankenkasse läuft und was privat bleibt."
    ),
    "vorsorgeauftrag-und-patientenverfuegung.mp3": speak(
        "Vorsorgeauftrag und Patientenverfügung. "
        "Mit einem Vorsorgeauftrag bestimmen Sie, wer Sie rechtlich vertreten darf, "
        "wenn Sie selbst nicht mehr entscheiden können. "
        "Die Patientenverfügung hält medizinische Wünsche fest. "
        "Beides gibt Familien Orientierung – und sollte frühzeitig geklärt werden."
    ),
    "pflegen-und-arbeiten.mp3": speak(
        "Pflegen und arbeiten: Wie lässt sich beides verbinden? "
        "Viele Angehörige reduzieren ihr Pensum. "
        "Eine Anstellung über die Spietex kann Lohn und Sozialversicherung bringen – "
        "wenn der Pflegebedarf dokumentiert ist. "
        "Sprechen Sie mit Arbeitgeber und Spietex frühzeitig über Planung und Entlastung."
    ),
    "private-oder-oeffentliche-spitex.mp3": speak(
        "Private oder öffentliche Spietex? "
        "Beide können kassenpflichtige Pflege erbringen, wenn sie zugelassen sind. "
        "Unterschiede liegen oft in Wartezeiten, Erreichbarkeit und Begleitung. "
        "Fragen Sie nach Bezugsperson, Abklärung und wie Angehörige eingebunden werden."
    ),
    "sturzpraevention-zu-hause.mp3": speak(
        "Sturzprävention zu Hause. "
        "Gute Beleuchtung, freie Wege, stabile Schuhe und angepasste Hilfsmittel senken das Risiko. "
        "Pflegefachpersonen erkennen Gefahren im Alltag und üben sichere Bewegungen. "
        "Kleine Anpassungen bringen oft grosse Sicherheit."
    ),
    "arbeitsvertrag-ferien-sozialversicherungen.mp3": speak(
        "Arbeitsvertrag, Ferien und Sozialversicherungen in der Angehörigenpflege. "
        "Bei einer Anstellung gelten Lohn, Ferienanspruch und Beiträge an A H V, "
        "Arbeitslosenversicherung und Unfallversicherung. "
        "Lesen Sie den Vertrag genau – und fragen Sie nach fachlicher Begleitung und Dokumentation."
    ),
    "entlastungsangebote-limmattal.mp3": speak(
        "Entlastungsangebote im Limmattal. "
        "Neben der Spietex-Pflege gibt es Begleitung, Hauswirtschaft und Beratung für Angehörige. "
        "Manchmal hilft schon ein klarer Wochenplan. "
        "Lumina zeigt Ihnen, welche Entlastung zuerst den grössten Effekt hat – "
        "persönlich und ohne Fachchinesisch."
    ),
}


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in SCRIPTS.items():
        path = OUT / name
        communicate = edge_tts.Communicate(text, VOICE, rate="-8%", pitch="-2Hz")
        await communicate.save(str(path))
        print(f"wrote {path.name} ({path.stat().st_size} bytes)")


if __name__ == "__main__":
    asyncio.run(main())

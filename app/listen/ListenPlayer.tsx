"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [0.85, 1, 1.15, 1.3] as const;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8.2 5.4v13.2c0 .7.8 1.1 1.4.7l10-6.6c.5-.4.5-1.1 0-1.4l-10-6.6c-.6-.4-1.4 0-1.4.7z"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 5.5h3.2c.4 0 .8.4.8.8v11.4c0 .4-.4.8-.8.8H7c-.4 0-.8-.4-.8-.8V6.3c0-.4.4-.8.8-.8zm6.8 0H17c.4 0 .8.4.8.8v11.4c0 .4-.4.8-.8.8h-3.2c-.4 0-.8-.4-.8-.8V6.3c0-.4.4-.8.8-.8z"
      />
    </svg>
  );
}

export function ListenPlayer({
  articleText,
  articleLabel,
}: {
  articleText: string;
  articleLabel?: string;
}) {
  const label = articleLabel ?? "Ratgeber";
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    setPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [articleText, label]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function startSpeech(rate: number = speedRef.current) {
    if (!articleText || typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(articleText);
    utter.lang = "de-DE";
    utter.rate = rate;
    const voices = window.speechSynthesis.getVoices();
    const german =
      voices.find(
        (v) => v.lang === "de-DE" && /Katja|Amala|Germany/i.test(v.name),
      ) ||
      voices.find((v) => v.lang.startsWith("de-DE")) ||
      voices.find((v) => v.lang.startsWith("de")) ||
      null;
    if (german) utter.voice = german;
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utter);
  }

  function toggle() {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    startSpeech();
  }

  function changeSpeed(value: (typeof SPEEDS)[number]) {
    setSpeed(value);
    speedRef.current = value;
    if (playing) startSpeech(value);
  }

  function stop() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  }

  return (
    <div
      className={`listen-bar ${playing ? "is-playing" : ""}`}
      role="region"
      aria-label="Beitrag anhören"
    >
      <button
        type="button"
        className="listen-bar-play"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause" : "Anhören"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="listen-bar-track" aria-hidden="true">
        <span
          className="listen-bar-track-fill"
          style={{ width: playing ? "100%" : "0%" }}
        />
      </div>

      <span className="listen-bar-label">
        {playing ? "Wird vorgelesen…" : "Anhören"}
      </span>

      <div className="listen-bar-speeds" role="group" aria-label="Geschwindigkeit">
        {SPEEDS.map((value) => (
          <button
            type="button"
            key={value}
            className={speed === value ? "active" : ""}
            onClick={() => changeSpeed(value)}
          >
            {value === 1 ? "1×" : `${value}×`}
          </button>
        ))}
      </div>

      {playing ? (
        <button type="button" className="listen-bar-stop" onClick={stop}>
          Stopp
        </button>
      ) : null}
    </div>
  );
}

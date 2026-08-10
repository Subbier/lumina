"use client";

import { useEffect, useRef, useState } from "react";
import type { PageAudio } from "./pageAudio";

const SPEEDS = [0.85, 1, 1.15, 1.3] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8.2 5.4v13.2c0 .7.8 1.1 1.4.7l10-6.6c.5-.4.5-1.1 0-1.4l-10-6.6c-.6-.4-1.4 0-1.4.7z"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 5.5h3.2c.4 0 .8.4.8.8v11.4c0 .4-.4.8-.8.8H7c-.4 0-.8-.4-.8-.8V6.3c0-.4.4-.8.8-.8zm6.8 0H17c.4 0 .8.4.8.8v11.4c0 .4-.4.8-.8.8h-3.2c-.4 0-.8-.4-.8-.8V6.3c0-.4.4-.8.8-.8z"
      />
    </svg>
  );
}

export function ListenPlayer({
  audio,
  articleText,
  articleLabel,
}: {
  audio: PageAudio | null;
  articleText?: string;
  articleLabel?: string;
}) {
  const source = articleText
    ? {
        label: articleLabel ?? "Ratgeber",
        text: articleText,
        src: undefined as string | undefined,
      }
    : audio;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const speedRef = useRef(speed);
  const usingSpeech = Boolean(source && !source.src);

  useEffect(() => {
    speedRef.current = speed;
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
    setDuration(0);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [source?.src, source?.text, source?.label]);

  useEffect(() => {
    if (!source?.src) return;
    const el = new Audio(source.src);
    el.preload = "metadata";
    el.playbackRate = speedRef.current;
    audioRef.current = el;

    const onMeta = () => setDuration(el.duration || 0);
    const onTime = () => {
      setCurrent(el.currentTime);
      if (el.duration) setProgress(el.currentTime / el.duration);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };

    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.pause();
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
      if (audioRef.current === el) audioRef.current = null;
    };
  }, [source?.src]);

  function startSpeech(rate: number = speedRef.current) {
    if (!source?.text || typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(source.text);
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

  async function toggle() {
    if (!source) return;

    if (source.src && audioRef.current) {
      const el = audioRef.current;
      if (playing) {
        el.pause();
        setPlaying(false);
        return;
      }
      try {
        el.playbackRate = speed;
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    if (usingSpeech) {
      if (playing) {
        window.speechSynthesis.cancel();
        setPlaying(false);
        return;
      }
      startSpeech();
    }
  }

  function changeSpeed(value: (typeof SPEEDS)[number]) {
    setSpeed(value);
    speedRef.current = value;
    if (audioRef.current) audioRef.current.playbackRate = value;
    if (usingSpeech && playing) startSpeech(value);
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
    setProgress(0);
    setCurrent(0);
  }

  function seek(clientX: number, target: HTMLElement) {
    const el = audioRef.current;
    if (!el || !el.duration) return;
    const rect = target.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
    setProgress(ratio);
    setCurrent(el.currentTime);
  }

  if (!source) return null;

  return (
    <div
      className={`listen-dock ${playing ? "is-playing" : ""}`}
      role="region"
      aria-label="Seite anhören"
    >
      <div className="listen-dock-inner">
        <button
          type="button"
          className="listen-dock-play"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause" : "Anhören"}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div className="listen-dock-main">
          <div className="listen-dock-meta">
            <span className="listen-dock-kicker">Anhören</span>
            <strong>{source.label}</strong>
          </div>

          <div
            className={`listen-dock-track ${source.src ? "is-live" : "is-soft"}`}
            role={source.src ? "slider" : undefined}
            aria-valuemin={source.src ? 0 : undefined}
            aria-valuemax={source.src ? 100 : undefined}
            aria-valuenow={source.src ? Math.round(progress * 100) : undefined}
            aria-label={source.src ? "Fortschritt" : undefined}
            onClick={(e) => {
              if (!source.src) return;
              seek(e.clientX, e.currentTarget);
            }}
          >
            <span
              className="listen-dock-track-fill"
              style={{
                width: source.src
                  ? `${progress * 100}%`
                  : playing
                    ? "100%"
                    : "0%",
              }}
            />
            {source.src ? (
              <span
                className="listen-dock-track-thumb"
                style={{ left: `${progress * 100}%` }}
              />
            ) : null}
          </div>

          <div className="listen-dock-footer">
            <span className="listen-dock-time">
              {source.src
                ? `${formatTime(current)} / ${formatTime(duration)}`
                : playing
                  ? "Wird vorgelesen…"
                  : "Kurz & verständlich"}
            </span>
            <div
              className="listen-dock-speeds"
              role="group"
              aria-label="Geschwindigkeit"
            >
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
            {playing || progress > 0 ? (
              <button type="button" className="listen-dock-stop" onClick={stop}>
                Stopp
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

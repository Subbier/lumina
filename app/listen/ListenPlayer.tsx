"use client";

import { useEffect, useRef, useState } from "react";

const SPEEDS = [0.85, 1, 1.15, 1.3] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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
  audioSrc,
  articleLabel,
}: {
  audioSrc: string;
  articleLabel?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const el = new Audio(audioSrc);
    el.preload = "metadata";
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
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);

  async function toggle() {
    const el = audioRef.current;
    if (!el) return;
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
  }

  function stop() {
    const el = audioRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
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

  return (
    <div
      className={`listen-bar ${playing ? "is-playing" : ""}`}
      role="region"
      aria-label={articleLabel ? `${articleLabel} anhören` : "Beitrag anhören"}
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

      <div
        className="listen-bar-track"
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Fortschritt"
        onClick={(e) => seek(e.clientX, e.currentTarget)}
        onKeyDown={(e) => {
          const el = audioRef.current;
          if (!el || !el.duration) return;
          if (e.key === "Home") el.currentTime = 0;
          else if (e.key === "End") el.currentTime = el.duration;
          else if (e.key === "ArrowLeft")
            el.currentTime = Math.max(0, el.currentTime - 10);
          else if (e.key === "ArrowRight")
            el.currentTime = Math.min(el.duration, el.currentTime + 10);
          else return;
          e.preventDefault();
          setProgress(el.currentTime / el.duration);
          setCurrent(el.currentTime);
        }}
      >
        <span
          className="listen-bar-track-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <span className="listen-bar-label">
        {playing
          ? `${formatTime(current)} / ${formatTime(duration)}`
          : "Anhören"}
      </span>

      <div className="listen-bar-speeds" role="group" aria-label="Geschwindigkeit">
        {SPEEDS.map((value) => (
          <button
            type="button"
            key={value}
            className={speed === value ? "active" : ""}
            onClick={() => setSpeed(value)}
          >
            {value === 1 ? "1×" : `${value}×`}
          </button>
        ))}
      </div>

      {playing || progress > 0 ? (
        <button type="button" className="listen-bar-stop" onClick={stop}>
          Stopp
        </button>
      ) : null}
    </div>
  );
}

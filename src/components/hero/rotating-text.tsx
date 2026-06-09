'use client';

import { useEffect, useState } from 'react';

const TYPE_MS = 80; // per-character typing speed
const DELETE_MS = 38; // per-character deleting speed
const HOLD_MS = 1500; // pause once a word is fully typed
const GAP_MS = 380; // pause after deleting, before the next word

/**
 * Types each word out character-by-character, holds, then deletes it before
 * moving to the next — a typewriter effect with a blinking caret. The
 * container reserves the width + height of the widest word (invisible sizers
 * stacked in one grid cell), so the surrounding title text never shifts or
 * changes width while the word is being typed.
 */
export function RotatingText({
  words,
  className = '',
}: {
  words: string[];
  className?: string;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const word = words[wordIndex] ?? words[0] ?? '';

  useEffect(() => {
    if (reduced || words.length === 0) return;
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timeout = setTimeout(() => setPhase('holding'), HOLD_MS);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 0);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), DELETE_MS);
      } else {
        timeout = setTimeout(() => {
          setWordIndex((v) => (v + 1) % words.length);
          setPhase('typing');
        }, GAP_MS);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, word, words.length, reduced]);

  // Reduced motion (or pre-hydration): just show the first word fully.
  const display = reduced ? word : text;

  return (
    <span className="relative inline-grid align-bottom">
      {/* invisible sizers — the grid cell grows to the widest word so the
          title's width and centering never shift while typing */}
      {words.map((w, idx) => (
        <span
          key={idx}
          aria-hidden
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {w}
        </span>
      ))}
      {/* visible, typed word + blinking caret — centered in the reserved cell
          so short and long words sit in the same place */}
      <span
        className="col-start-1 row-start-1 justify-self-center whitespace-nowrap text-center"
        aria-live="polite"
      >
        <span className={className}>{display}</span>
        {!reduced && (
          <span className="type-caret" aria-hidden>
            |
          </span>
        )}
      </span>
    </span>
  );
}

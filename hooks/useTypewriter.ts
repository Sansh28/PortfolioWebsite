"use client";

import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
};

export function useTypewriter(
  words: string[],
  options: UseTypewriterOptions = {}
) {
  const {
    typingSpeed = 85,
    deletingSpeed = 45,
    pauseDuration = 1450
  } = options;
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      return undefined;
    }

    const currentWord = words[wordIndex % words.length];
    const isWordComplete = !isDeleting && displayText === currentWord;

    const timeout = window.setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        const nextValue = currentWord.slice(
          0,
          Math.max(0, displayText.length - 1)
        );
        setDisplayText(nextValue);

        if (nextValue.length === 0) {
          setIsDeleting(false);
          setWordIndex((previousIndex) => (previousIndex + 1) % words.length);
        }

        return;
      }

      setDisplayText(currentWord.slice(0, displayText.length + 1));
    }, isWordComplete ? pauseDuration : isDeleting ? deletingSpeed : typingSpeed);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [
    deletingSpeed,
    displayText,
    isDeleting,
    pauseDuration,
    typingSpeed,
    wordIndex,
    words
  ]);

  return displayText;
}

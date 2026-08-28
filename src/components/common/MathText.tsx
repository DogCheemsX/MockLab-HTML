import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  inline?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', inline = false }) => {
  if (!text) return null;

  // Function to render single math token or plain text segment
  const renderMathSegment = (segment: string, isBlock: boolean, key: number) => {
    try {
      const html = katex.renderToString(segment, {
        displayMode: isBlock && !inline,
        throwOnError: false,
      });
      return (
        <span
          key={key}
          className={isBlock ? 'my-2 block text-center overflow-x-auto' : 'inline-block px-0.5'}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      return <span key={key}>{segment}</span>;
    }
  };

  // Pre-process text to wrap naked LaTeX expressions (commands starting with \) in $...$ if not already delimited
  let processedText = text;

  if (!processedText.includes('$') && !processedText.includes('\\(') && !processedText.includes('\\[')) {
    if (processedText.includes('\\')) {
      // Auto-wrap naked LaTeX commands in $...$ so only math tokens are passed to KaTeX
      processedText = processedText.replace(
        /(\\frac\{[^}]+\}\{[^}]+\}|\\sqrt\{[^}]+\}|\\(pi|alpha|beta|gamma|theta|lambda|sigma|omega|le|ge|infty|times|div|pm|neq|approx|cdot))/g,
        (m) => '$' + m + '$'
      );
    }
  }

  // Check if text has explicit math delimiters: $$...$$ or $...$
  const hasDelimiters = processedText.includes('$') || processedText.includes('\\(') || processedText.includes('\\[');

  if (hasDelimiters) {
    // Regex matches $$...$$ or $...$ or \[...\] or \(...\)
    const regex = /(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\([^\n]*?\\\))/gs;
    const parts = processedText.split(regex);

    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (!part) return null;

          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2).trim();
            return renderMathSegment(math, true, index);
          }
          if (part.startsWith('\\[') && part.endsWith('\\]')) {
            const math = part.slice(2, -2).trim();
            return renderMathSegment(math, true, index);
          }
          if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1).trim();
            return renderMathSegment(math, false, index);
          }
          if (part.startsWith('\\(') && part.endsWith('\\)')) {
            const math = part.slice(2, -2).trim();
            return renderMathSegment(math, false, index);
          }

          // Handle multiline plain text formatting
          return (
            <span key={index} className="whitespace-pre-wrap">
              {part}
            </span>
          );
        })}
      </span>
    );
  }

  return <span className={`whitespace-pre-wrap ${className}`}>{text}</span>;
};


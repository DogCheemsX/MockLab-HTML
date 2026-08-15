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

  // Check if text has explicit math delimiters: $$...$$ or $...$
  const hasDelimiters = text.includes('$') || text.includes('\\(') || text.includes('\\[');

  if (hasDelimiters) {
    // Regex matches $$...$$ or $...$ or \[...\] or \(...\)
    const regex = /(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\([^\n]*?\\\))/gs;
    const parts = text.split(regex);

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

  // Fallback check if text contains naked LaTeX constructs like \frac, \begin, \matrix, \int
  if (/\\(frac|begin|int|sum|sqrt|lim|det|matrix|vec|theta|pi|alpha|beta|gamma|infty)/.test(text)) {
    try {
      const html = katex.renderToString(text, {
        displayMode: !inline && text.includes('\n'),
        throwOnError: false,
      });
      return (
        <span
          className={`${className} ${text.includes('\n') ? 'my-2 block text-center' : 'inline-block'}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      // Ignore error fallback to plain text
    }
  }

  return <span className={`whitespace-pre-wrap ${className}`}>{text}</span>;
};

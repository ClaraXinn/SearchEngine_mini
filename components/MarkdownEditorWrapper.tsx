'use client';

import dynamic from "next/dynamic";
import { useEffect } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function MarkdownEditorWrapper({
  value,
  onChange,
  placeholder
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {

  // Inject placeholder into DOM after MDEditor loads
  useEffect(() => {
    const interval = setInterval(() => {
      const textarea = document.querySelector(
        ".wmde-markdown-var .w-md-editor-text-input"
      ) as HTMLTextAreaElement;

      if (textarea) {
        textarea.setAttribute("placeholder", placeholder);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [placeholder]);

  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor
        value={value}
        onChange={(v) => onChange(v || "")}
        height={300}
        preview="edit"
        textareaProps={{
          className: "w-md-editor-text-input"
        }}
      />
    </div>
  );
}

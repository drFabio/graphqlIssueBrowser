import React from "react";

import { Hilightable } from "../../presententionalComponents";

export function HighlightedText({
  term,
  children
}: {
  term?: string | null;
  children: string;
}): React.ReactElement {
  if (!term) {
    return <>{children}</>;
  }
  const parts = children.split(new RegExp(`(${term})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <Hilightable
          key={i}
          highlighted={part.toLowerCase() === term.toLowerCase()}
        >
          {part}
        </Hilightable>
      ))}{" "}
    </span>
  );
}

import * as React from "react";

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
        <span
          key={i}
          style={
            part.toLowerCase() === term.toLowerCase()
              ? {
                  fontWeight: "bold",
                  backgroundColor: "yellow",
                  color: "black"
                }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
}

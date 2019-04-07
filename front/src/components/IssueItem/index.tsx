import * as React from "react";
import { Link } from "react-router-dom";
import { IssueItemProps } from "../../types";
import { HighlightedText as HT } from "../HighlightedText";

export function IssueItem({
  number,
  title,
  closed,
  body,
  searchTerm
}: IssueItemProps) {
  return (
    <div>
      <h3>
        <Link to={`/issue/${number}`}> {number} </Link> -{" "}
        <HT term={searchTerm}>{title}</HT> {closed ? "Closed" : " Open"}
      </h3>
      <pre>
        <HT term={searchTerm}>{body}</HT>
      </pre>
    </div>
  );
}

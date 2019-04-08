import React from "react";
import { IssueCreationDataProps } from "../../types";

export function CreationData({ author, createdAt }: IssueCreationDataProps) {
  return (
    <p>
      By {author.login} at {createdAt}
    </p>
  );
}

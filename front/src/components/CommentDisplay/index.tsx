import React from "react";
import { CommentOnIssue } from "../../types";
import { CreationData } from "../CreationData";

export function CommentDisplay({ data }: { data: CommentOnIssue }) {
  return (
    <div>
      <CreationData author={data.author} createdAt={data.createdAt} />
      <div dangerouslySetInnerHTML={{ __html: data.bodyHTML }} />
    </div>
  );
}

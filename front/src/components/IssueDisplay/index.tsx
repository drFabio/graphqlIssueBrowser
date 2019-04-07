import * as React from "react";
import { IssueDisplayProps } from "../../types";
import { CreationData } from "../CreationData";
import { CommentDisplay } from "../CommentDisplay";

export function IssueDisplay({ data, comments }: IssueDisplayProps) {
  return (
    <>
      <h2>{data.title}</h2>
      <CreationData author={data.author} createdAt={data.createdAt} />
      <div dangerouslySetInnerHTML={{ __html: data.bodyHTML }} />
      <p>Comments</p>
      {comments &&
        comments.map(comment => (
          <CommentDisplay key={comment.id} data={comment} />
        ))}
    </>
  );
}

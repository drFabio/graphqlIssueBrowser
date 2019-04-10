import React from 'react';
import { IssueDisplayProps } from '../../types';
import { CreationData } from '../CreationData';
import { CommentDisplay } from '../CommentDisplay';
import { TextHeader } from '../../presententionalComponents';

export function IssueDisplay({ data, comments }: IssueDisplayProps) {
  return (
    <>
      <h2>{data.title}</h2>
      <CreationData author={data.author} createdAt={data.createdAt} />
      <div dangerouslySetInnerHTML={{ __html: data.bodyHTML }} />
      <TextHeader>Comments</TextHeader>
      {comments && comments.map(comment => <CommentDisplay key={comment.id} data={comment} />)}
    </>
  );
}

import React from "react";
import {
  Link,
  Pre,
  IssueItemContainer,
  StausBadge,
  TextLine
} from "../../presententionalComponents";
import { IssueItemProps, IssueStatus } from "../../types";
import { HighlightedText as HT } from "../HighlightedText";
import { CreationData } from "../CreationData";

export function IssueItem({
  number,
  title,
  closed,
  body,
  searchTerm,
  author,
  createdAt
}: IssueItemProps) {
  return (
    <IssueItemContainer>
      <TextLine>
        <StausBadge bg={closed ? IssueStatus.Closed : IssueStatus.Open} mr={1}>
          {closed ? "Closed" : "Open"}
        </StausBadge>
        <Link to={`/issue/${number}`} color="secondary">
          {" "}
          {number}{" "}
        </Link>{" "}
        - <HT term={searchTerm}>{title}</HT>
      </TextLine>

      <CreationData author={author} createdAt={createdAt} />
      <Pre>
        <HT term={searchTerm}>{body}</HT>
      </Pre>
    </IssueItemContainer>
  );
}

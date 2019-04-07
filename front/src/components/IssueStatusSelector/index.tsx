import * as React from "react";
import { IssueStatus, IssueStatusSelectorProps } from "../../types";

export function IssueStatusSelector({
  value,
  onChange
}: IssueStatusSelectorProps) {
  const commonProps = {
    selectedValue: value,
    onChange: onChange,
    name: "issueStatus"
  };
  return (
    <React.Fragment>
      <IssueRadio {...commonProps} status={IssueStatus.Both}>
        All Status
      </IssueRadio>
      <IssueRadio {...commonProps} status={IssueStatus.Open}>
        Only Open
      </IssueRadio>
      <IssueRadio {...commonProps} status={IssueStatus.Closed}>
        Only Closed
      </IssueRadio>
    </React.Fragment>
  );
}

function IssueRadio({
  children,
  status,
  selectedValue,
  name,
  onChange
}: {
  children: React.ReactNode;
  status: IssueStatus;
  selectedValue: IssueStatus;
  name: string;
  onChange: IssueStatusSelectorProps["onChange"];
}) {
  return (
    <React.Fragment>
      <input
        checked={selectedValue === status}
        type="radio"
        name={name}
        id={status}
        value={status}
        onChange={() => onChange(status)}
      />
      <label htmlFor={status}>{children}</label>
    </React.Fragment>
  );
}

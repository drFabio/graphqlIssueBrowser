import * as React from "react";
import { IssueRadioProps } from "../../../types";

export function IssueRadio({
  children,
  status,
  selectedValue,
  name,
  onChange
}: IssueRadioProps) {
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

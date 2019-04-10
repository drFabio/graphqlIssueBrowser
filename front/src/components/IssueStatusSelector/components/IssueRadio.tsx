import React from 'react';
import { IssueRadioProps } from '../../../types';

export function IssueRadio({ children, status, selectedValue, name, onChange }: IssueRadioProps) {
  return (
    <>
      <input
        checked={selectedValue === status}
        type="radio"
        name={name}
        id={status}
        value={status}
        onChange={() => onChange(status)}
      />
      <label htmlFor={status}>{children}</label>
    </>
  );
}

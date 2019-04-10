import React from 'react';
import { IssueStatus, IssueStatusSelectorProps } from '../../types';
import { IssueRadio } from './components/IssueRadio';

export function IssueStatusSelector({ value, onChange }: IssueStatusSelectorProps) {
  const commonProps = {
    selectedValue: value,
    onChange: onChange,
    name: 'issueStatus',
  };
  return (
    <>
      <IssueRadio {...commonProps} status={IssueStatus.Both}>
        All Status
      </IssueRadio>
      <IssueRadio {...commonProps} status={IssueStatus.Open}>
        Only Open
      </IssueRadio>
      <IssueRadio {...commonProps} status={IssueStatus.Closed}>
        Only Closed
      </IssueRadio>
    </>
  );
}

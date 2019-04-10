import React from 'react';
import moment from 'moment';
import { IssueCreationDataProps } from '../../types';
import { Text } from '../../presententionalComponents';
export function CreationData({ author, createdAt }: IssueCreationDataProps) {
  return (
    <p>
      By <Text color={'secondary'}>{author.login}</Text> at {moment(createdAt).format('DD/MM/YYYY HH:mm')}
    </p>
  );
}

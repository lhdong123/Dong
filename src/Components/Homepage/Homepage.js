import React from 'react';

import ClassList from '../Class/ClassList/ClassList';

export default function Homepage({newClassId}) {

  return (
      <ClassList newClassId={newClassId} />
  )
}
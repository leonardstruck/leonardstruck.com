import { useId } from 'react';

// Custom hook that uses useId() and provides a function to get IDs with an index
function useIndexedId(): (index: number) => string {
  const baseId = useId();

  // Function to concatenate the base ID with an index
  const getIndexedId = (index: number): string => `${baseId}-${index}`;

  return getIndexedId;
}

export default useIndexedId;

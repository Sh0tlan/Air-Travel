import { useState } from 'react';

function useDialog(defaultState?: boolean) {
  const [isOpen, setOpen] = useState(defaultState ?? false);

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen((open) => !open);

  return { isOpen, open, close, toggle };
}

export default useDialog;

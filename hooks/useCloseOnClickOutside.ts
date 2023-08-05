'use client';
import { useEffect } from 'react';

const useCloseOnClickOutside = (onClose: () => void) => {
  useEffect(() => {
    const closeModal = (e: any) => {
      if (e.target.id === 'overlay') {
        onClose();
      }
    };

    document.body.addEventListener('click', closeModal);

    return () => document.body.removeEventListener('click', closeModal);
  }, [onClose]);
};

export default useCloseOnClickOutside;

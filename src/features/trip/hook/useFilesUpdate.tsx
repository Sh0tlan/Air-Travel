import { useEffect } from 'react';
import { type UseFieldArrayUpdate } from 'react-hook-form';

import { getDownloadURL } from '@services/firebase';

import { type FormInput } from '../components/Files/FilesForm';
import { type DocumentToUpload } from '../types';

export function useFilesUrlsUpdate(
  files: DocumentToUpload[],
  update: UseFieldArrayUpdate<FormInput, 'files'>,
) {
  useEffect(
    () =>
      files.forEach(async (file, index) => {
        if (!file.url && file.storagePath) {
          const url = await getDownloadURL(file.storagePath);
          if (url) {
            update(index, {
              ...files[index],
              url,
            });
          }
        }
      }),
    [files, update],
  );
}

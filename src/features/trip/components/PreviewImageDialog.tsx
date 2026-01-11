import { useEffect, useRef, useState } from 'react';

import { ButtonBase, Grid } from '@mui/material';

import AppDialog from '@features/ui/AppDialog';
import { useBreakpoints } from '@hooks/useBreakpoints';
import useToast from '@hooks/useToast';
import { useStorage } from '@services/firebase';

import { TRIP_PREVIEW_IMAGES } from '../data';
import { PreviewImage, type Trip } from '../types';
import PhotoCard from './Files/PhotoCard';
import UploadFileButton from './Files/UploadFileButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip['previewImage']) => void;
  defaultPreviewImage: PreviewImage | null;
  defaultPreviewImageSrc?: string | null;
  // Will be called in case of uploaded file removal
  onChange?: (previewImage: Trip['previewImage']) => void;
}

export default function PreviewImageDialog({
  isOpen,
  onClose,
  onSave,
  defaultPreviewImage,
  defaultPreviewImageSrc,
  onChange,
}: Props) {
  const { md } = useBreakpoints();
  const { showErrorMessage } = useToast();

  const {
    uploadFiles,
    uploadProgresses,
    removeFile,
    removingFilePath,
    isLoading,
    uploadErrors,
    resetUpload,
  } = useStorage({
    onAllUploadSuccess: (uploadedFiles) => {
      if (uploadedFiles?.[0].storagePath) {
        onSave({ storagePath: uploadedFiles[0].storagePath });
      }
    },
  });

  const customImageRef = useRef<HTMLInputElement | null>(null);
  const [customImageFile, setCustomImageFile] = useState<File | null>();
  const [customPreviewImageSrc, setCustomPreviewImageSrc] = useState<
    string | null | undefined
  >(defaultPreviewImageSrc);

  const [selectPreviewImage, setSelectedPreviewImage] =
    useState<Trip['previewImage']>(defaultPreviewImage);

  const onSaveClick = async () => {
    if (!selectCustomPreviewImage) {
      showErrorMessage('Please select a preview image!');
      return;
    }
    if (
      selectPreviewImage?.url &&
      !selectPreviewImage.storagePath &&
      customImageFile
    ) {
      uploadFiles('preview-image', [
        { fileName: customImageFile.name, file: customImageFile },
      ]);
    } else if (
      selectPreviewImage?.templateImageId &&
      defaultPreviewImage?.storagePath
    ) {
      await removeFile(defaultPreviewImage?.storagePath);
      onSave(selectPreviewImage);
    }
    onSave(selectPreviewImage);
  };

  const onTemplateImageClick = (imageId: string) => {
    if (!isLoading && !removingFilePath) {
      setSelectedPreviewImage({ templateImageId: imageId });
    }
  };

  const onCancel = () => {
    setSelectedPreviewImage(defaultPreviewImage);
    onClose();
  };

  // Custom Image Modifications

  const onCustomImageFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageFile = event?.target.files?.[0];
    if (imageFile) {
      setCustomImageFile(imageFile);
      setSelectedPreviewImage({ url: URL.createObjectURL(imageFile) });
    }
  };

  const onCustomImageClick = () => {
    customImageRef.current?.click();
  };

  const onCustomImageRemove = async () => {
    const newSelectedPreviewImage = {
      templateImageId: TRIP_PREVIEW_IMAGES[TRIP_PREVIEW_IMAGES.length - 1].id,
    };

    setSelectedPreviewImage({
      templateImageId: TRIP_PREVIEW_IMAGES[TRIP_PREVIEW_IMAGES.length - 1].id,
    });
    if (defaultPreviewImage?.storagePath) {
      await removeFile(defaultPreviewImage.storagePath);
      onChange?.(newSelectedPreviewImage);
      setCustomPreviewImageSrc(null);
    } else {
      setCustomImageFile(null);
    }
  };

  const selectCustomPreviewImage = () => {
    if (customImageFile) {
      setSelectedPreviewImage({
        url: URL.createObjectURL(customImageFile),
      });
    } else if (defaultPreviewImage?.storagePath) {
      setSelectedPreviewImage(defaultPreviewImage);
    }
  };

  // File updoad errors displaying

  useEffect(() => {
    if (uploadErrors[0]) {
      showErrorMessage(uploadErrors[0]);
      resetUpload();
    }
  }, [resetUpload, showErrorMessage, uploadErrors]);

  return (
    <AppDialog
      title="Select your preview image"
      primaryButtonText="Save"
      isOpen={isOpen}
      onClose={onCancel}
      onPrimaryButtonClick={onSaveClick}
      isLoading={isLoading}
    >
      <Grid container spacing={{ xs: 0.5, md: 1.5 }} columns={{ xs: 2, md: 3 }}>
        {TRIP_PREVIEW_IMAGES.map((image) => (
          <Grid item xs={1} key={image.id}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: 4,
                borderColor:
                  selectPreviewImage?.templateImageId === image.id
                    ? 'primary.main'
                    : 'white',
              }}
              onClick={() => onTemplateImageClick(image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                style={{ width: '100%' }}
              />
            </ButtonBase>
          </Grid>
        ))}

        <Grid xs={1} item>
          {customImageFile ||
          (defaultPreviewImage?.storagePath && customPreviewImageSrc) ? (
            <PhotoCard
              src={
                customImageFile
                  ? URL.createObjectURL(customImageFile)
                  : customPreviewImageSrc
              }
              onRemoveClick={onCustomImageRemove}
              uploadProgress={uploadProgresses[0]}
              isRemoving={Boolean(removingFilePath)}
              onClick={selectCustomPreviewImage}
              borderColor={
                selectPreviewImage?.url || selectPreviewImage?.storagePath
                  ? 'primary.main'
                  : 'white'
              }
              enableBorders
            />
          ) : (
            <>
              <UploadFileButton
                mainText="Upload preview photo"
                subText="PNG or PDF (max. 3MB)"
                sx={{ border: 4, borderColor: 'white' }}
                showSubText={md}
                onClick={onCustomImageClick}
              />
              <input
                ref={customImageRef}
                type="file"
                id="fileInput"
                hidden
                onChange={onCustomImageFileInputChange}
              />
            </>
          )}
        </Grid>
      </Grid>
    </AppDialog>
  );
}

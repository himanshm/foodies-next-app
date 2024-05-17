'use client';

import { ChangeEvent, useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

type ImagePickerProps = {
  label: string;
  name: string;
};

function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handleImagePick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPickedImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No Image picked yet!</p>}
          {pickedImage && (
            <Image src={pickedImage} alt='image selected by user' fill />
          )}
        </div>
        <input
          className={styles.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button
          className={styles.button}
          type='button'
          onClick={handleImagePick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;

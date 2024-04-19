import styles from './ImageInput.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import RenderImageLabel from './RenderImageLabel';

const cn = classNames.bind(styles);

/**
 * ImageInput component
 * @param {string} type - feed or profile or certify
 * feed 타입은 이미지 추가 아이콘이 작게 나오도록 설정했습니다.
 * certify 타입은 이미지 추가 아이콘이 크게 나오도록 설정했습니다.
 * profile 타입은 profile 아이콘이 크게 나오고, 카메라 아이콘이 나오도록 설정했습니다.
 */

export default function ImageInput({ type }: { type?: string }) {
  const [imageFile, setImageFile] = useState<string | null>(null);
  const feedImage = type === 'feed';
  const profileImage = type === 'profile';

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    if (file) {
      reader.onload = () => {
        setImageFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={cn('image-container', { feedImage, profileImage })}>
      <label className={cn('image-label')} htmlFor="file">
        <RenderImageLabel imageFile={imageFile} type={type} />
      </label>
      <input
        className={cn('image-input')}
        id="file"
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
}

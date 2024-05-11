import { EmojiCode, EmojiType } from '@/@types/type';
import { EMOJI_ICON } from '@/constants/EmojiCode';
import classNames from 'classnames/bind';
import styles from './EmojiButton.module.scss';

const cn = classNames.bind(styles);

interface EmojiButtonProps {
  isDetail?: boolean;
  isClickVisible: boolean;
  emojiCode: EmojiCode;
  emojiList: EmojiType[];
  handleEmojiClick: (emojiCode: EmojiCode, isClicked: boolean) => void;
  setCurrentEmojiList: (args: EmojiType[]) => void;
  isPending?: boolean;
}

export default function EmojiButton({
  emojiCode,
  isClickVisible,
  isDetail = false,
  emojiList,
  handleEmojiClick,
  setCurrentEmojiList,
  isPending,
}: EmojiButtonProps) {
  const Icon = EMOJI_ICON[emojiCode];
  const emojiData = emojiList.filter((emoji) => emoji.emojiCode === emojiCode);

  const updatedEmojiList = emojiList.map((emoji) => {
    if (emoji.emojiCode === emojiData[0]?.emojiCode) {
      return {
        emojiCode: emoji.emojiCode,
        emojiCount: emojiData[0]?.isClicked
          ? Number(emoji.emojiCount) - 1
          : Number(emoji.emojiCount) + 1,
        isClicked: !emojiData[0]?.isClicked,
      };
    }
    return emoji;
  });

  const handleUpdateCurrentEmojiList = () => {
    // emojiCode에 해당하는 객체를 찾아서 emojiCount속성에 +1
    if (
      emojiList.some((emoji) => emoji.emojiCode === emojiData[0]?.emojiCode)
    ) {
      setCurrentEmojiList(updatedEmojiList);
    } else {
      // emojiCode에 해당하는 객체를 만들어서 emojiCount 속성에 값 1로 세팅
      const newEmoji = {
        emojiCode,
        emojiCount: 1,
        isClicked: !emojiData[0]?.isClicked,
      };
      setCurrentEmojiList([...emojiList, newEmoji]);
    }
  };

  return (
    <button
      type="button"
      className={cn('wrapper', {
        clicked: isClickVisible ? emojiData[0]?.isClicked : false,
        detail: isDetail,
      })}
      onClick={(event) => {
        event.stopPropagation();
        handleUpdateCurrentEmojiList();
        handleEmojiClick(emojiCode, emojiData[0]?.isClicked);
      }}
      disabled={isPending}
    >
      <div className={cn('container')}>
        <Icon />
        {isDetail && emojiData[0]?.emojiCount}
      </div>
    </button>
  );
}

import { getImageUrl } from 'h5p-utils';
import * as React from 'react';
import { useAppWidth } from '../../hooks/useAppWidth';
import { BreakpointSize } from '../../types/BreakpointSize';
import { TopicMapItemType } from '../../types/TopicMapItemType';
import { stripHTML } from '../../utils/string.utils';
import styles from './TopicMapItem.module.scss';

type TopicMapItemTypeWithoutPositions = Omit<
  TopicMapItemType,
  | 'xPercentagePosition'
  | 'yPercentagePosition'
  | 'widthPercentage'
  | 'heightPercentage'
>;

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
};

export type TopicMapItemProps = {
  item: TopicMapItemTypeWithoutPositions;
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({ item }) => {
  const imageUrl = getImageUrl(item.topicImage?.path);
  const AppWidth = useAppWidth();

  const className = React.useMemo(
    () => [styles.topicMapItem, sizeClassname[AppWidth]].join(' '),
    [AppWidth],
  );

  const plainDescriptionText = item.description?.params.text ?
    stripHTML(item.description.params.text) :
    undefined;

  return (
    <div className={className}>
      {item.topicImage && imageUrl && (
        <img
          className={styles.image}
          src={imageUrl}
          alt={item.topicImageAltText ?? ''}
          width={item.topicImage.width}
          height={item.topicImage.height}
        />
      )}

      <div
        className={`${styles.inner} ${
          item.topicImage?.path ? '' : styles.noImage
        }`}
      >
        <div
          className={styles.label}
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        {plainDescriptionText && (
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: plainDescriptionText }}
          />
        )}
      </div>
    </div>
  );
};

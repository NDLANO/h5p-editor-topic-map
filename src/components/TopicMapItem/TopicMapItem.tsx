import { getImageUrl } from 'h5p-utils';
import { FC, useMemo } from 'react';
import { useAppWidth } from '../../hooks/useAppWidth';
import { BreakpointSize } from '../../types/BreakpointSize';
import { TopicMapItemType } from '../../types/TopicMapItemType';
import './TopicMapItem.scss';

type TopicMapItemTypeWithoutPositions = Omit<
  TopicMapItemType,
  | 'xPercentagePosition'
  | 'yPercentagePosition'
  | 'widthPercentage'
  | 'heightPercentage'
>;

const sizeClassname = {
  [BreakpointSize.Large]: 'h5p-editor-topic-map-large',
  [BreakpointSize.Medium]: 'h5p-editor-topic-map-medium',
  [BreakpointSize.Small]: 'h5p-editor-topic-map-small',
};

export type TopicMapItemProps = {
  item: TopicMapItemTypeWithoutPositions;
};

export const TopicMapItem: FC<TopicMapItemProps> = ({ item }) => {
  const imageUrl = getImageUrl(item.topicImage?.path);
  const AppWidth = useAppWidth();

  const className = useMemo(
    () => `h5p-editor-topic-map-topic-map-item ${sizeClassname[AppWidth]}`,
    [AppWidth],
  );

  return (
    <div className={className}>
      {item.topicImage && imageUrl && (
        <img
          className="h5p-editor-topic-map-image"
          src={imageUrl}
          alt={item.topicImageAltText ?? ''}
          width={item.topicImage.width}
          height={item.topicImage.height}
        />
      )}

      <div
        className={`h5p-editor-topic-map-inner ${
          item.topicImage?.path ? '' : 'h5p-editor-topic-map-no-image'
        }`}
      >
        <div
          className="h5p-editor-topic-map-label"
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        {item.description && (
          <div
            className="h5p-editor-topic-map-description"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </div>
    </div>
  );
};

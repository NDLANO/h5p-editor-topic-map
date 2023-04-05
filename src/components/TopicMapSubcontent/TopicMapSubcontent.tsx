import { H5P, H5PEditor } from "h5p-utils";
import * as React from "react";
import { useAppWidth } from "../../hooks/useAppWidth";
import { BreakpointSize } from "../../types/BreakpointSize";
import { TopicMapSubcontentType } from "../../types/TopicMapSubcontentType";
import styles from "./TopicMapSubcontent.module.scss";

type TopicMapSubcontentTypeWithoutPositions = Omit<
  TopicMapSubcontentType,
  | "xPercentagePosition"
  | "yPercentagePosition"
  | "widthPercentage"
  | "heightPercentage"
>;

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
};

export type TopicMapSubcontentProps = {
  item: TopicMapSubcontentTypeWithoutPositions;
  triggerLibraryBuild: number;
};

export const TopicMapSubcontent: React.FC<TopicMapSubcontentProps> = ({
  item,
  triggerLibraryBuild,
}) => {
  const AppWidth = useAppWidth();

  const className = React.useMemo(
    () => [styles.TopicMapSubcontent, sizeClassname[AppWidth]].join(" "),
    [AppWidth],
  );

  const containerRef = React.useRef<HTMLDivElement>(null);

  const [instanceRenderCount, setInstanceRenderCount] = React.useState(-1);

  // Update H5P library instance
  React.useEffect(() => {
    if (
      !item.subcontent || // Has no subcontent
      instanceRenderCount === triggerLibraryBuild || // Already rendered
      !containerRef.current // No reference given
    ) {
      return;
    }

    setInstanceRenderCount(triggerLibraryBuild);

    H5P.newRunnable(
      item.subcontent,
      H5PEditor.contentId || "1", // Wrong type in types, should be number
      H5P.jQuery(containerRef.current),
      false,
    );
  }, [triggerLibraryBuild, containerRef, item, instanceRenderCount]);

  return (
    <div className={className}>
      <div ref={containerRef} />
      <div className={item.subcontent ? styles.subcontentblocker : ""} />
    </div>
  );
};

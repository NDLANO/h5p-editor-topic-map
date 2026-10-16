import { FC, useEffect, useRef } from 'react';
import { H5P } from '../../H5P/H5P.util';

type H5PButtonProps = {
  className?: string;
  icon?: string;
  label: string;
  onClick: () => void;
  styleType?: 'primary' | 'secondary' | 'nav';
};

export const H5PButton: FC<H5PButtonProps> = ({
  className,
  icon,
  label,
  onClick,
  styleType = 'primary',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    const createButton = H5P?.Components?.Button;
    const container = containerRef.current;
    if (!createButton || !container) {
      return;
    }

    const button = createButton({
      icon,
      label,
      onClick: () => onClickRef.current(),
      styleType,
    });
    container.appendChild(button);

    return () => button.remove();
  }, [label, styleType]);

  return <div className={className} ref={containerRef} />;
};

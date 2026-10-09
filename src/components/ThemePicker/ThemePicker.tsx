import { FC, useCallback, useMemo } from 'react';
import { t } from '../../H5P/H5P.util';
import { ColorTheme } from '../../types/ColorTheme';
import { themes } from '../../utils/theme.utils';
import './ThemePicker.scss';

export type ThemePickerProps = {
  activeTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
};

export const ThemePicker: FC<ThemePickerProps> = ({
  setTheme,
  activeTheme,
}) => {
  const renderColorCircles = useCallback(
    () =>
      Array.from({ length: 4 }).map((_, index) => (
        <span
          className="h5p-editor-topic-map-color-circle"
          key={index}
          style={{ backgroundColor: `var(--theme-color-${index + 1})` }}
        />
      )),
    [],
  );

  const colorThemes = useMemo(
    () =>
      themes.map(({ labelKey, value }) => (
        <button
          type="button"
          key={value}
          className={`h5p-editor-topic-map-theme-${value} h5p-editor-topic-map-button${
            value === activeTheme ? ' buttonActive' : ''
          }`}
          onClick={() => setTheme(value)}
        >
          {t(labelKey)}
          <div className="h5p-editor-topic-map-color-circles">
            {renderColorCircles()}
          </div>
        </button>
      )),
    [activeTheme, renderColorCircles, setTheme],
  );

  const themePickerLabel = t('theme-picker_label');

  return (
    <>
      <div className="h5peditor-label">{themePickerLabel}</div>
      <div className="h5p-editor-topic-map-buttons">{colorThemes}</div>
    </>
  );
};

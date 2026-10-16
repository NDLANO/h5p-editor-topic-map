import type { H5PFieldGroup, H5PForm } from 'h5p-types';
import { FC, useCallback, useRef, useState } from 'react';
import { MapEditorView } from './components/MapEditorView/MapEditorView';
import { Params } from './types/Params';
import {
  fillInMissingParamsProperties,
  getEmptyParams,
} from './utils/H5P/form.utils';
import { defaultTheme } from './utils/theme.utils';

export type AppProps = {
  setValue: (params: Params) => void;
  semantics: H5PFieldGroup;
  initialParams: Partial<Params> | undefined;
  parent: H5PForm;
};

export const App: FC<AppProps> = ({
  setValue,
  semantics,
  initialParams,
  parent,
}) => {
  const [params, setParams] = useState<Params>(
    initialParams
      ? fillInMissingParamsProperties(initialParams)
      : getEmptyParams(),
  );
  // Track the latest params so updates batched in one render cycle merge against fresh state, not the stale closure
  const paramsRef = useRef(params);

  const updateParams = useCallback(
    (updatedParams: Partial<Params>) => {
      const newParams: Params = {
        ...paramsRef.current,
        ...updatedParams,
      };

      paramsRef.current = newParams;
      setParams(newParams);
      setValue(newParams);
    },
    [setValue],
  );

  return (
    <div
      className={`h5p-editor-topic-map h5p-theme h5p-editor-topic-map-theme-${
        params.colorTheme ?? defaultTheme
      }`}
    >
      <MapEditorView
        setParams={updateParams}
        semantics={semantics}
        params={params}
        parent={parent}
      />
    </div>
  );
};

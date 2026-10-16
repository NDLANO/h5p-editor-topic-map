import type { H5PField, H5PForm } from 'h5p-types';
import { H5PEditor } from 'h5p-utils';
import { FC, useEffect, useRef, useState } from 'react';
import { t } from '../../H5P/H5P.util';
import { Params } from '../../types/Params';
import { H5PButton } from './H5PButton';
import './SemanticsForm.css';

type SemanticsFormProps = {
  fields: Array<H5PField>;
  params: Params;
  parent: H5PForm;
  onSave: (params: Params) => void;
  formClassName?: string;
};

export const SemanticsForm: FC<SemanticsFormProps> = ({
  fields,
  params,
  parent,
  formClassName,
  onSave,
}) => {
  const generatedFormRef = useRef<HTMLDivElement>(null);
  const saveLabel = t('semantics-form_save');
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
  }, []);

  useEffect(() => {
    if (!generatedFormRef.current || hasRendered) {
      return;
    }

    const $wrapper = H5PEditor.$(generatedFormRef.current);
    H5PEditor.processSemanticsChunk(fields, params, $wrapper, parent);
  }, [fields, params, parent, generatedFormRef, hasRendered]);

  return (
    <form
      className={[formClassName, 'h5peditor'].filter(Boolean).join(' ')}
      onSubmit={(event) => event.preventDefault()}
    >
      <div ref={generatedFormRef} />
      <H5PButton
        className="h5p-editor-topic-map-save-button"
        label={saveLabel}
        onClick={() => onSave(params)}
      />
    </form>
  );
};

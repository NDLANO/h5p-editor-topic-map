import { H5PEditor } from 'h5p-utils';
import { TranslationKey } from '../types/TranslationKey';

export { H5P } from 'h5p-utils';

export const t: (
  key: TranslationKey,
  vars?: Record<string, string>,
) => string = (key, vars) => H5PEditor.t('H5PEditor.TopicMap', key, vars);

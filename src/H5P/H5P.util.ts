import { H5PEditor } from 'h5p-utils';
import { TranslationKey } from '../types/TranslationKey';

/** H5P core runtime object. Global, so it can change. */
export const H5P = window.H5P;

export const t: (
  key: TranslationKey,
  vars?: Record<string, string>,
) => string = (key, vars) => H5PEditor.t('H5PEditor.TopicMap', key, vars);

import { H5PEditor } from 'h5p-utils';
import { TranslationKey } from '../types/TranslationKey';
import { H5PObject } from 'h5p-types';

export const H5P = (window as any).H5P as H5PObject;

export const t: (
  key: TranslationKey,
  vars?: Record<string, string>,
) => string = (key, vars) => H5PEditor.t('H5PEditor.TopicMap', key, vars);

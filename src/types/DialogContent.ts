import type { H5PAudio, H5PVideo } from 'h5p-types';
import { Link } from './Link';

export type DialogContent = {
  hasNote: boolean;
  links?: Array<Link>;
  text?: string;
  video?: H5PVideo;
  audio?: {
    // "Optional" because we can't force user to add a file, therefore there's an off-chance that value will be nullish
    file?: H5PAudio;
    subtext?: string;
  };
};

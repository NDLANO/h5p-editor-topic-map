/// <reference types="jquery" />
/// <reference types="jest" />

interface Window {
  /** H5P core runtime object. Always defined before content type scripts run (jest setup provides it in tests). */
  H5P: import('h5p-types').H5PObject;
}

declare module '*.css';

import * as React from 'react';
import mediumZoom, { ZoomOptions } from 'medium-zoom';

const mediumZoomSingleton = mediumZoom();

export type MediumZoomEventType =
  | 'open'
  | 'opened'
  | 'close'
  | 'closed'
  | 'detach'
  | 'update';

export interface ZoomHandler {
  open: () => Promise<void>;
  close: () => Promise<void>;
  toggle: () => Promise<void>;
  on: (
    type: MediumZoomEventType,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void;
  off: (
    type: MediumZoomEventType,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void;
}

export function useMediumZoom(
  imgRef: React.MutableRefObject<HTMLImageElement | undefined>,
  options?: ZoomOptions
): ZoomHandler {
  const mediumZoomRef = React.useRef(mediumZoomSingleton.clone(options));

  const handlerRef = React.useRef<ZoomHandler>({
    open: async () => {
      await mediumZoomRef.current.open({ target: imgRef.current });
    },
    close: async () => {
      await mediumZoomRef.current.close();
    },
    toggle: async () => {
      await mediumZoomRef.current.toggle({ target: imgRef.current });
    },
    on: (type, listener, options) => {
      mediumZoomRef.current.on(type, listener, options);
    },
    off: (type, listener, options) => {
      mediumZoomRef.current.off(type, listener, options);
    },
  });

  React.useEffect(() => {
    const mediumZoomCurrent = mediumZoomRef.current;
    const imgCurrent = imgRef.current;

    if (imgCurrent) {
      mediumZoomCurrent.attach(imgCurrent);
    }

    return () => {
      if (imgCurrent) {
        mediumZoomCurrent.detach(imgCurrent);
      }
    };
  }, []);

  React.useEffect(() => {
    if (options) {
      mediumZoomRef.current.update(options);
    }
  }, [options]);

  return handlerRef.current as ZoomHandler;
}

export interface MediumZoomProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  options?: ZoomOptions;
}

export const MediumZoom = React.forwardRef<
  HTMLImageElement | undefined,
  MediumZoomProps
>(({ options, ...imgProps }, ref) => {
  const internalRef = React.useRef<HTMLImageElement>();
  useMediumZoom(internalRef, options);
  React.useImperativeHandle(ref, () => internalRef.current, []);

  return (
    <img
      ref={internalRef as React.MutableRefObject<HTMLImageElement>}
      {...imgProps}
    />
  );
});

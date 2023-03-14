import {
  onThemeChange,
  offThemeChange,
} from '@tphone-beta/core/types/uni-app/uni/base/ThemeChange';
import {
  onUnhandledRejection,
  offUnhandledRejection,
} from '@tphone-beta/core/types/uni-app/uni/base/UnhandledRejectiond';

import {
  onError,
  offError
} from '@tphone-beta/core/types/uni-app/uni/base/Error';

import {
  createMapContext
} from '@tphone-beta/core/types/uni-app/uni/base/MapContext';

import { request } from '@tphone-beta/core/types/uni-app/uni/base/request';

declare global {
  interface Uni {
    onThemeChange: typeof onThemeChange;
    offThemeChange: typeof offThemeChange;
    onUnhandledRejection: typeof onUnhandledRejection;
    offUnhandledRejection: typeof offUnhandledRejection;
    onError: typeof onError;
    offError: typeof offError;
    createMapContext: typeof createMapContext;
    request: typeof request;
  }
}

import {
  onThemeChange,
  offThemeChange,
} from '@tphone/core/types/uni-app/uni/base/ThemeChange';
import {
  onUnhandledRejection,
  offUnhandledRejection,
} from '@tphone/core/types/uni-app/uni/base/UnhandledRejectiond';

import {
  onError,
  offError
} from '@tphone/core/types/uni-app/uni/base/Error';

import {
  createMapContext
} from '@tphone/core/types/uni-app/uni/base/MapContext';

import { request } from '@tphone/core/types/uni-app/uni/base/request';

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

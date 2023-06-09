declare global {
  namespace UniNamespace {
    interface OnThemeChangeCallbackResult {
      /**
       * 主题名称
       */
      theme: 'dark' | 'light';
    }
    type OnThemeChangeCallback = (res: OnThemeChangeCallbackResult) => void;
  }
}
/**
 * 监听系统主题状态变化。
 *
 * 文档: [https://uniapp.dcloud.net.cn/api/system/theme.html#onthemechange](https://uniapp.dcloud.net.cn/api/system/theme.html#onthemechange)
 */
export function onThemeChange(callback: UniNamespace.OnThemeChangeCallback): void;
/**
 * 取消监听系统主题状态变化。
 *
 * 文档: [https://uniapp.dcloud.net.cn/api/system/theme.html#offthemechange](https://uniapp.dcloud.net.cn/api/system/theme.html#offthemechange)
 */
export function offThemeChange(callback: UniNamespace.OnThemeChangeCallback): void;

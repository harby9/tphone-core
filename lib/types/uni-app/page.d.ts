declare namespace Page {
  interface CustomShareContent {
    /**
     * 转发标题。默认值：当前应用名称
     */
    title?: string;
    /**
     * 转发路径，必须是以 / 开头的完整路径。默认值：当前页面 path
     */
    path?: string;
    /**
     * 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4，默认值：使用默认截图
     */
    imageUrl?: string;
    /**
     * 如果该参数存在，则以 resolve 结果为准，如果三秒内不 resolve，分享会使用上面传入的默认参数
     */
    promise?: Promise<{
      /**
       * 转发标题。默认值：当前应用名称
       */
      title?: string;
      /**
       * 转发路径，必须是以 / 开头的完整路径。默认值：当前页面 path
       */
      path?: string;
      /**
       * 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4，默认值：使用默认截图
       */
      imageUrl?: string;
    }>;
    /**
     * 自定义分享描述
     */
    desc?: string;
    /**
     * 自定义吱口令文案，最多 28 个字符
     */
    content?: string;
    /**
     * 自定义分享预览大图，建议尺寸 750x825，支持：网络图片路径、apFilePath 路径、相对路径，不支持：base64
     */
    bgImgUrl?: string;
    /**
     * 自定义社交图片链接，作为分享到支付宝好友时的主体图片。建议尺寸 376x330
     */
    scImgUrl?: string;
    /**
     * 生成分享截图的搜索引导，设置该参数后，会在分享图片中增加上支付宝搜“设置关键字”的内容，设置关键字不能超过 5 个字
     */
    searchTip?: string;
    /**
     * 分享成功后回调
     */
    success?: () => void;
    /**
     * 分享失败后回调
     */
    fail?: () => void;
    /**
     * 开发者后台设置的分享素材模板 id
     */
    templateId?: string;
    /**
     * PC端打开小程序加载的页面，不支持可传空字符串
     */
    PCPath?: string;
    /**
     * PC端打开小程序加载的模式，若需要在PC端打开小程序，则必须传PCMode字段
     */
    PCMode?: string;
    /**
     * PCQQ、低版本手机QQ无法执行小程序时打开的H5页面
     */
    generalWebpageUrl?: string;
    /**
     * 监听用户点击页面内转发按钮的，只有带上该参数，才支持快速分享
     */
    entryDataHash?: string;
    /**
     * 分享模板id，可以使用不同的分享模版，可选模版参考管理端分享模版一栏
     */
    shareTemplateId?: string;
    /**
     * 分享模板的数据，不同的模板id需要不同的数据，数据的格式请参考管理端分享模版一栏
     */
    shareTemplateData?: string;
    /**
     * 指定分享的类型
     */
    shareType?: string;
    /**
     * 转发形式（1 - 京东小程序正式版；2 - 京东小程序体验版；京东App9.0.0开始不填或者其他值都会先判断是否有url参数，如果有打开分享后显示url对应页面，否则默认生成京东小程序官方的一个分享中间页面，点击可跳到京东app里面的对应小程序）
     */
    type?: string;
    /**
     * 渠道（不写默认微信朋友，微信朋友圈），可用值有：Wxfriends,QQfriends,Wxmoments,QQzone,Sinaweibo
     */
    channel?: string;
    /**
     * h5链接地址（h5分享填写，不填默认中间页）
     */
    url?: string;
    /**
     * 口令分享渠道，可用值有：Wxfriends,QQfriends,Wxmoments,QQzone,Sinaweibo，当需要口令分享时，需要配置此选项
     */
    keyShareChannel?: string;
    /**
     * 海报分享，本地图片地址（海报图片由开发者生成后将图片地址传入jdfile开头的格式）
     */
    localImageUrl?: string;
    /**
     * 海报分享，网络图片地址（海报图片由开发者生成后将图片地址传入），注意：localImageUrl、onlineImageUrl建议开发者使用时只传一个值 如果传入两个值 优先localImageUrl
     */
    onlineImageUrl?: string;
  }

  interface ShareTimelineContent {
    /**
     * 自定义标题，即朋友圈列表页上显示的标题。默认值：当前小程序名称
     */
    title?: string;
    /**
     * 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分。默认值：当前页面路径携带的参数
     */
    query?: string;
    /**
     * 自定义图片路径，可以是本地文件或者网络图片。支持 PNG 及 JPG，显示图片长宽比是 1:1。默认值：小程序 Logo
     */
    imageUrl?: string;
  }

  interface PageScrollOption {
    /**
     * 页面在垂直方向已滚动的距离（单位 px）
     */
    scrollTop: number;
  }

  interface ResizeOption {
    /**
     * 页面在垂直方向已滚动的距离（单位 px）
     */
    scrollTop: number;
    /**
     * 新的显示区域尺寸
     */
    size?: {
      /**
       * 新的显示区域宽度
       */
      windowWidth: number;
      /**
       * 新的显示区域高度
       */
      windowHeight: number;
    };
  }

  interface ShareAppMessageOption {
    /**
     * 转发事件来源。
     * 可选值：
     * - `button`：页面内转发按钮；
     * - `menu`：右上角转发菜单。
     */
    from: "button" | "menu";
    /**
     * 如果 `from` 值是 `button`，则 `target` 是触发这次转发事件的 `button`，否则为 `undefined`
     */
    target: any;
    /**
     * 页面中包含 `<web-view>` 组件时，返回当前 `<web-view>` 的 url
     */
    webViewUrl?: string;
  }

  interface AddToFavoritesOption {
    /**
     * 转发事件来源。
     * 可选值：
     * - `button`：页面内转发按钮；
     * - `menu`：右上角转发菜单。
     */
    from: "button" | "menu";
    /**
     * 页面中包含 `<web-view>` 组件时，返回当前 `<web-view>` 的 url
     */
    webviewUrl: string;
  }

  interface CustomFavoritesContent {
    /**
     * 自定义标题，默认值：页面标题或账号名称
     */
    title?: string;
    /**
     * 自定义 query 字段
     */
    path?: string;
    /**
     * 自定义图片，显示图片长宽比为 1：1
     */
    imageUrl?: string;
  }

  interface TabItemTapOption {
    /**
     * 被点击 tabItem 的序号，从0开始
     */
    index: number;
    /**
     * 被点击 tabItem 的页面路径
     */
    pagePath: string;
    /**
     * 被点击 tabItem 的按钮文字
     */
    text: string;
  }

  interface NavigationBarButtonTapOption {
    /**
     * 原生标题栏按钮数组的下标
     */
    index: number;
  }

  interface BackPressOption {
    /**
     * - backbutton 顶部导航栏左边的返回按钮或 Android 实体返回键
     * - navigateBack 返回 API，即 uni.navigateBack()
     */
    from: 'backbutton' | 'navigateBack';
  }

  interface NavigationBarSearchInputEvent {
    /**
     * 搜索输入框输入内容
     */
    text: string;
  }

  interface PageInstanceBaseProps<D extends AnyObject = any> {
    /**
     * 到当前页面的路径，类型为 `String`
     */
    route?: string;
    /**
     * 获取当前页面的webview对象实例。仅 App 平台支持
     */
    $getAppWebview?: () => PlusWebviewWebviewObject;
    /**
     * 当前页面的 Vue 实例
     */
    $vm?: any;
  }

  interface PageInstance<D extends AnyObject = any, T extends AnyObject = any> extends PageInstanceBaseProps<D> {
    /**
     * 生命周期回调 监听页面初始化
     *
     * 页面初始化时触发。一个页面只会调用一次，可以在 onInit 的参数中获取打开当前页面路径中的参数。
     * @param query 打开当前页面路径中的参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onInit?(query?: AnyObject): void;
    /**
     * 生命周期回调 监听页面加载
     *
     * 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
     * @param query 打开当前页面路径中的参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onLoad?(query?: AnyObject): void;
    /**
     * 生命周期回调 监听页面显示
     *
     * 页面显示/切入前台时触发。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onShow?(): void;
    /**
     * 生命周期回调 监听页面初次渲染完成
     *
     * 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onReady?(): void;
    /**
     * 生命周期回调 监听页面隐藏
     *
     * 页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，应用切入后台等。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onHide?(): void;
    /**
     * 生命周期回调 监听页面卸载
     *
     * 页面卸载时触发。如 `redirectTo` 或 `navigateBack` 到其他页面时。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onUnload?(): void;
    /**
     * 监听用户下拉动作
     * - 需要在 `pages.json` 的页面配置中开启 `enablePullDownRefresh` 。
     * - 可以通过 `uni.startPullDownRefresh` 触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
     * - 当处理完数据刷新后，`uni.stopPullDownRefresh` 可以停止当前页面的下拉刷新。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onPullDownRefresh?(): void;
    /**
     * 页面上拉触底事件的处理函数
     * - 可以在 `pages.json` 的页面配置中设置触发距离 `onReachBottomDistance` 。
     * - 在触发距离内滑动期间，本事件只会被触发一次。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onReachBottom?(): void;
    /**
     * 用户点击右上角转发
     *
     * 监听用户点击页面内转发按钮（`<button>` 组件 `open-type="share"`）或右上角菜单“转发”按钮的行为，并自定义转发内容。
     * @param options 分享发起来源参数
     * @return 转发内容
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onShareAppMessage?(options: ShareAppMessageOption): CustomShareContent | Promise<Omit<CustomShareContent, "promise">>;
    /**
     * 用户点击右上角转发到朋友圈
     *
     * 监听右上角菜单“分享到朋友圈”按钮的行为，并自定义发享内容。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onShareTimeline?(): ShareTimelineContent;
    /**
     * 用户点击右上角收藏
     *
     * 监听用户点击右上角菜单“收藏”按钮的行为，并自定义收藏内容。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onAddToFavorites?(options: AddToFavoritesOption): CustomFavoritesContent;
    /**
     * 页面滚动触发事件的处理函数
     *
     * 监听用户滑动页面事件。
     * @param options 页面滚动参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onPageScroll?(options: PageScrollOption): void;
    /**
     * 页面尺寸改变时触发
     * @param options 页面滚动参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onResize?(options: ResizeOption): void;
    /**
     * 当前是 tab 页时，点击 tab 时触发
     * @param options tab 点击参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onTabItemTap?(options: TabItemTapOption): void;
    /**
     * 监听原生标题栏按钮点击事件
     * @param options tab 点击参数
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onNavigationBarButtonTap?(options: NavigationBarButtonTapOption): void;
    /**
     * 监听页面返回
     * @param options tab 点击参数
     * @return 返回 `true` 时阻止页面返回
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onBackPress?(options: BackPressOption): any;
    /**
     * 监听原生标题栏搜索输入框输入内容变化事件
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onNavigationBarSearchInputChanged?(event: NavigationBarSearchInputEvent): void;
    /**
     * 监听原生标题栏搜索输入框搜索事件，用户点击软键盘上的“搜索”按钮时触发。
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onNavigationBarSearchInputConfirmed?(event: NavigationBarSearchInputEvent): void;
    /**
     * 监听原生标题栏搜索输入框点击事件
     *
     * 文档: [https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=page)
     */
    onNavigationBarSearchInputClicked?(): void;
  }

  type PageConstructor = <T extends AnyObject & PageInstance>(
    options: PageInstance<AnyObject, T> & T,
  ) => void;

  type GetCurrentPages = <T extends AnyObject = {}>() => Array<PageInstance<AnyObject, T> & T>;
}

declare const getCurrentPages: Page.GetCurrentPages;

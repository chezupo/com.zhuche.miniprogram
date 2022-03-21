export default {
  pages: [
    'pages/index/index'
  ],
  subPackages: [
    {
      root: "lazyModule",
      pages: [
        'pages/login/index',
        'pages/login/phoneLogin/index',
        'pages/DateTimePicker/index',
        'pages/bannerDetail/index',
        'pages/complaintFeedback/index',
        'pages/city/index',
        'pages/stories/index',
        'pages/selectCar/index',
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

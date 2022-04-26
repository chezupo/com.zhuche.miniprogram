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
        'pages/selectCar/CarDetail/index',
        'pages/CheckoutOrder/index',
        'pages/CheckoutOrder/Agreements/index',
        'pages/CheckoutOrder/UserCoupon/index',
        'pages/ArgumentDetail/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  }
}

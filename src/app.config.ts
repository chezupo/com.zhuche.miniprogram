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
        'pages/complaintFeedback/index',
        'pages/city/index',
        'pages/stories/index',
        'pages/selectCar/index',
        'pages/selectCar/CarDetail/index',
        'pages/CheckoutOrder/index',
        'pages/CheckoutOrder/Agreements/index',
        'pages/CheckoutOrder/UserCoupon/index',
        'pages/ArgumentDetail/index',
        'pages/stories/DetailPage/index',
        'pages/stories/DetailPage/GuideDetailPage/index',
        'pages/ViolationPage/index',
        'pages/ContactPage/index',
        'pages/DriverLicenceValidationPage/index',
        'pages/IdCarValidationPage/index',
        'pages/BalancePage/index',
        'pages/TransactionPage/index',
        'pages/TmpPage/index',
        'pages/NavigationPage/index',
        'pages/PromotionPage/index',
        'pages/PromotionPage/PromotionPosterPage/index',
        'pages/PromotionPage/PromotionUsersPage/index',
        'pages/OrderDetailPage/index'
      ]
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于找到最近的门店" // 高速公路行驶持续后台定位
    }
  }
}

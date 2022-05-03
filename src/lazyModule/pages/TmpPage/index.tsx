import {Button} from "@tarojs/components";
import React from "preact/compat";

const TmpPage: React.FC = () => {
  const handlePay = () => {
    // @ts-ignore
    my.tradePay({
      orderStr: "alipay_root_cert_sn=687b59193f3f462dd5336e5abf83c5d8_02941eef3187dddf3d3b83462e1dfcf6&alipay_sdk=alipay-sdk-java-dynamicVersionNo&app_cert_sn=55bb524e73daa4e2510071f111a3458c&app_id=2021002192682271&biz_content=%7B%22amount%22%3A%220.02%22%2C%22order_title%22%3A%22%E7%A7%9F%E9%87%91%E9%A2%84%E6%8E%88%E6%9D%83%E5%86%BB%E7%BB%93%22%2C%22out_order_no%22%3A%2220225355849784793000%22%2C%22out_request_no%22%3A%2220225355849784793000%22%2C%22payee_user_id%22%3A%222088012728643085%22%2C%22product_code%22%3A%22PRE_AUTH_ONLINE%22%7D&charset=UTF-8&format=json&method=alipay.fund.auth.order.app.freeze&notify_url=https%3A%2F%2Fa1001zhuche.jds.wuchuheng.com%2Fapi%2Fv1%2FminiProgram%2FalipayNotice%2Ffreeze&sign=UkUkI%2B2od9lurE5ZDRsTenYg3bVIcuUwWql%2FBi3zyQMmJRqT%2F0WxTpejMaBVlUtW2D%2B9csXEbKtiV7ZsbUP8fYT7tcWMpDEQSvBLGUfDNRa2M%2B0JvO0JMNjfjug%2Fil6D%2BlJVWCNT%2BJ%2BYQxaipjs0HdC5Gib5Hd%2F3a5ZDUbb562lMbgjikJW%2FYF7DtS6Ew45hT7C2WP95bxTYnti9dsUmv3pk%2BEx7sXRCuHGHOVsG4OWvIkt2Dj4IFIzDO%2FXnnBngoj4giYLhnl3T0s2NabJAeP%2BiuaS5W%2BoVd1Nncq1%2F043IGLGtR%2BMBLg3ycJ%2FdShd1YWjeShfYcAi8OEkFjLTS4A%3D%3D&sign_type=RSA2&timestamp=2022-05-03+05%3A58%3A49&version=1.0",
      success: (res) => {
        console.log(res)
        debugger
      },
      fail: (res) => {
        console.log(res)
        debugger
      }
    });

  }
  return (<>
    <Button onClick={handlePay}>支付</Button>
  </>)
}

export default TmpPage

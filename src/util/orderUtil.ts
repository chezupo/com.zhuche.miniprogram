const orderStatusMayStr: Record<OrderStatus, string> = {
  'CREDITING' :  '信用授权中',
  'PAYING' :  '支付中',
  'CAR_PICKUP_IN_PROGRESS' :  '取车中',
  'USING' :  '使用中',
  'OVERTIME' :  '用车超时',
  'RETURNING' :  '还车中',
  'FINISHED' :  '已完成',
  'RENEWED' :  '已续约',
  'CANCELED':  '已取消'
}

export {orderStatusMayStr}

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../index";
import {getAreaStores} from "../../api/area";
import {getStoreByLocation} from "../../api/store";

export enum StartCityOrEndCityType {
  START,
  END
}
export enum StartStoreOrEndStoreType {
  START,
  END
}
export type TimestampType = number
type CreateOrderType = {
  startCity?: CityType
  endCity?: CityType
  startCityOrEndCity: StartCityOrEndCityType // 用于标记选择的城市是用户开始的商店还是结束的商店
  startStoreOrEndStore: StartStoreOrEndStoreType // 用于标记选择的商店是用户开始的商店还是结束的商店
  isForeignCity: boolean // 是否异地还车
  starCityStores: AreaStoreType[]
  endCityStores: AreaStoreType[]
  startStore?: StoreItemType
  endStore?: StoreItemType
  starTime: TimestampType
  endTime: TimestampType
  userCoupon?: UserCouponItemType
  car?: CarItemType // 选中的车子
}

type InitialStateType = { createOrder: CreateOrderType }

const initialState: InitialStateType = {
  createOrder: {
    // startCity: {
    //     "code": "4413",
    //     "name": "惠州市",
    //     "pinyin": "huizhou"
    // },
    // startStore: {
    //   "createdAt": null,
    //   "updatedAt": null,
    //   "id": 2,
    //   "name": "惠阳店",
    //   "mark": "",
    //   "starAt": "00:00",
    //   "endAt": "23:59",
    //   "address": "天山一路壹方天第东北侧约90米",
    //   "servicePhone": "13427969604",
    //   "lat": 22.7679,
    //   "lng": 114.442,
    //   "isEnable": true,
    //   "isStation": true,
    //   "isAirport": true,
    //   "isSelfService": true,
    //   "admin": {
    //     "id": 4,
    //     "username": "惠阳店",
    //     "isEnabled": true,
    //     "alipayAccount": null,
    //     "userCoupons": []
    //   },
    //   "banners": [
    //     {
    //       "id": 3,
    //       "imgKey": "2022-3-17-17-41-12-1647510072337-231_3.jpg",
    //       "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //     },
    //     {
    //       "id": 4,
    //       "imgKey": "2022-3-17-17-41-15-1647510075296-231_4.jpg",
    //       "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //     }
    //   ],
    //   "pickupGuides": [
    //     {
    //       "id": 2,
    //       "imgKey": "2022-3-17-17-41-45-1647510105072-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg",
    //       "title": "取车指引图1标题",
    //       "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //     }
    //   ],
    //   "returnGuides": [
    //     {
    //       "id": 3,
    //       "imgKey": "2022-3-17-17-41-53-1647510113946-85882bc629a74de2a76e480a112f2108.jpg",
    //       "title": "还车指引图1标题",
    //       "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //     },
    //     {
    //       "id": 4,
    //       "imgKey": "2022-3-17-17-42-6-1647510126282-dc20ea7c29cb4dc2872bfce0905e39fa.jpg",
    //       "title": "还车指引图2标题",
    //       "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //     }
    //   ],
    //   "area": {
    //     "code": "441303",
    //     "name": "惠阳区"
    //   },
    //   "city": {
    //     "code": "4413",
    //     "name": "惠州市",
    //     "pinyin": "huizhou"
    //   },
    //   "province": {
    //     "code": "44",
    //     "name": "广东省"
    //   },
    //   "brands": [
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 37,
    //       "name": "丰田",
    //       "imgKey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABQAFAMBEQACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAIAAkK/8QAIBAAAgMBAQEAAwEBAAAAAAAABAUDBgcCAQgAExQJF//EABgBAAMBAQAAAAAAAAAAAAAAAAACAwQB/8QAJBEBAAICAgICAQUAAAAAAAAAAQIRACESMSJBA1GRE2FxgfD/2gAMAwEAAhEDEQA/AOLjNviTeNDwux/URKNfn/zZVXQ1cZ7VoR/SGpnPyWIyvxJVBIhzrJdWUJhP6CYaqjbQjTjmCEERGizDcvGEpCmoxrlJviX0KDt9Hbhigu3+Rm7Vm7ZPl9c0zFdB0/bEz5pndHSurhWznbGrBf22Wk9OdCpdQqwGioPOxRnNHYvRHyss8CA8UbouL3qkvglEPKEuRoFt0KAxNl7OzSheP+m0NlvRu39uqs9l5m5o+b33IL3acx1CovaJoFJbkobXUbMvnWO0bUT3z9opoZHPPXnncfcZApEfsgpocw5oUxAZEE8kOsTrHR/3B/ouYYZDnWzd5/ccRyOfELRk9rthlUrl7pc12slw5OqTvucasED2ciySqbrUXPaQ2AyIJ8G1sQzZ1zU9BN4w4TIyjGUJQaBFlLlb4y5CCO/GJvVdL9f7+b1+cXP1/YbCx58WUXeqxnynUtr+odY0KzttSm4GUVrZ+8lklz4gKv3bRLJdOwIqkea7fipCrTd5oQ+WxzwsRONDX55aIxnCpSnLXA4wmQIxaOXIpJ0bouw1VUhGJIB5XdFReNX7t3dGyu6zMf632dRuGpq3yA+xPEdMzHL8kU2m28cw2a5L8spiunC2x0F4Wy6VEu4lnJMKWRw8kSg/yKvXTPkPkqTL8jFl42gEbSmVFMq3Vu6tftyckXXQBf3RV/3+cMH4mLl+GGX4YZ//2Q==",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 28,
    //           "name": "雷凌"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 29,
    //           "name": "RAV4荣放"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 30,
    //           "name": "卡罗拉"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 31,
    //           "name": "普拉多（霸道）"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 32,
    //           "name": "普拉多2700（霸道）"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 33,
    //           "name": "亚洲狮"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 38,
    //       "name": "别克",
    //       "imgKey": "data:image/jpeg;base64,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",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 34,
    //           "name": "GL8"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 39,
    //       "name": "大众",
    //       "imgKey": "data:image/jpeg;base64,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",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 15,
    //           "name": "迈腾"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 16,
    //           "name": "朗逸"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 17,
    //           "name": "探歌"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 18,
    //           "name": "高尔夫"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 19,
    //           "name": "探岳四驱"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 20,
    //           "name": "探岳俩驱\t"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 21,
    //           "name": "高尔夫.嘉族"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 22,
    //           "name": "帕萨特"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 23,
    //           "name": "宝来"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 24,
    //           "name": "速腾 经典"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 25,
    //           "name": "宝来"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 26,
    //           "name": "速腾 经典"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 27,
    //           "name": "朗逸 经典"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 40,
    //       "name": "奔驰",
    //       "imgKey": "data:image/jpeg;base64,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",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 14,
    //           "name": "SUV"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 41,
    //       "name": "日产",
    //       "imgKey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABQAFAMBEQACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAIAAkK/8QAIBAAAgMBAQEAAwEBAAAAAAAABAUDBgcCAQgAExQJF//EABgBAAMBAQAAAAAAAAAAAAAAAAACAwQB/8QAJBEBAAICAgICAQUAAAAAAAAAAQIRACESMSJBA1GRE2FxgfD/2gAMAwEAAhEDEQA/AOLjNviTeNDwux/URKNfn/zZVXQ1cZ7VoR/SGpnPyWIyvxJVBIhzrJdWUJhP6CYaqjbQjTjmCEERGizDcvGEpCmoxrlJviX0KDt9Hbhigu3+Rm7Vm7ZPl9c0zFdB0/bEz5pndHSurhWznbGrBf22Wk9OdCpdQqwGioPOxRnNHYvRHyss8CA8UbouL3qkvglEPKEuRoFt0KAxNl7OzSheP+m0NlvRu39uqs9l5m5o+b33IL3acx1CovaJoFJbkobXUbMvnWO0bUT3z9opoZHPPXnncfcZApEfsgpocw5oUxAZEE8kOsTrHR/3B/ouYYZDnWzd5/ccRyOfELRk9rthlUrl7pc12slw5OqTvucasED2ciySqbrUXPaQ2AyIJ8G1sQzZ1zU9BN4w4TIyjGUJQaBFlLlb4y5CCO/GJvVdL9f7+b1+cXP1/YbCx58WUXeqxnynUtr+odY0KzttSm4GUVrZ+8lklz4gKv3bRLJdOwIqkea7fipCrTd5oQ+WxzwsRONDX55aIxnCpSnLXA4wmQIxaOXIpJ0bouw1VUhGJIB5XdFReNX7t3dGyu6zMf632dRuGpq3yA+xPEdMzHL8kU2m28cw2a5L8spiunC2x0F4Wy6VEu4lnJMKWRw8kSg/yKvXTPkPkqTL8jFl42gEbSmVFMq3Vu6tftyckXXQBf3RV/3+cMH4mLl+GGX4YZ//2Q==",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 10,
    //           "name": "轩逸"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 11,
    //           "name": "奇骏"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 12,
    //           "name": "天籁"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 13,
    //           "name": "劲客"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 42,
    //       "name": "本田",
    //       "imgKey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABQAFAMBEQACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAHCAABBgkK/8QAJRAAAgMBAAIBAgcAAAAAAAAAAwQBAgUGBxEAITEIEhQWUYGR/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAQFBgMH/8QAJBEAAgICAgIBBQEAAAAAAAAAAQIDBAAFBhIREwcUFSEjMST/2gAMAwEAAhEDEQA/AO+Dd2lufzi6TQmTiHYY6gTBLDRilvFKUEGLV/NP1m1pm1a0pW97TFYmYYzBc3yvh6TnPKUz9gX7lzldRFiyyx11lHywujOoRNxic0rjNWFgBZrUlmEnRTFbLE9MYUvjGKV5X/EXy+M/t8THPeQSbmQd+1NBbgdrX5kjGIDnmjjJpp3AKQug6VddEg2KkMyvofpxs3zzLkqJ9zXrzSQPBdZo/Z5dKsjRfqEBb9gHUE+9QgJBYq4H5Q56fpvije7zU1dxW2/E4K9xabRV7nIqFa+Bdk2kUfek7/UL6jqZ3snoRXjmqyOQlhDiq+LvLu7hdZm6fcY2vTOUQxeX37Yvizv50tzoz9N1PRr9AKmmojGJjLSvpENjAtv0xG9ttthyXdyFQ8jv6g8g1tgpEqRktTlXx3DkHwQCVAjZmIHlfwCAT4ya3w1yEIWXfcIl/wAdm4oi5ZqpAyVRSDxd1l6JNJJejjrJIyCz67EkLPDC0mbGPHflDnvJXPz0WOp0GUCjx88yHTYOlgaoTgEuxW9kXwDLK7KjarSrFIsMoT1+tSVIOlhUuxXIvdGs0Y7shWeJ4pAQAQejgHqysrK38IYfw+QMVyTiez4vsvtt2bWXZDXjspZ1GyqbSk8cjSRlVs1ZHj9sU0MsM0RIeOSNgQVKsxG9RP3iJ/r5MzMZPUfxH+R8Yy/UR9o9fGM//9k=",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 6,
    //           "name": "凌派"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 7,
    //           "name": "缤智"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 8,
    //           "name": "奥德赛"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 9,
    //           "name": "新飞度"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 43,
    //       "name": "爱驰",
    //       "imgKey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAACAkHCv/EACoQAAAGAgEDBAAHAAAAAAAAAAECAwQFBgcICQATIREUFTFBUVNhcZPR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAED/8QAIxEAAgECBAcAAAAAAAAAAAAAAAERAjETYbHhQVFxgZGh0f/aAAwDAQACEQMRAD8A6UdqOZnjz0vzuOt2w2YbBTcrpxtSlXUW2xneJyHaMbq2RdwblexRcUvEAiZuuRV2qVyYjMoH9wKZkzlKMlRKTm+W4yW7e9OrXHrjir5X2dyK7q9JuFybUKDka3VJ+7rL2R3CTNhQauGdYayK7JBWLgZJYjt0VNA50QRIYyhylEXDz9bml6ubE4f3JwnUdhcBWZ7Z8XXf5QK9Myldmay8dGhpR3DyAKRE42ZyCBUnzJdMiiiIJrEKCiRjFH16Ew3wa0+koOQOtchNwz/b2GHOQk2vOtB6TU4eyYyc6OWzKyJGb2AYNbujF5Vak+KnX9gaSaq6KDdVMkKq5+PcqJnbCYw0psui0FmS41sCatRkvbuGG9ZC0OzVNOIuuZLyvf8AXDPefq9kbEiiT2VLVK5FWRoMax7lqZV2wnuDVE6BGsQrH++QRfLd0UuboBM5dndWMdv86ZpW2Byd3LEhYspL4bmcDGnhRn5ArJIuOJ4iUjGEjmIt2JXqqSZJTsi8TIBT+QGaBdYAAAVVAA+gBQ4AAfkAevgPTx0MJas2u4d9f9ZX+w/+9BL5vyw7yv4nOb9zGMI/x5H66Elu7k//2Q==",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 5,
    //           "name": "U5"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 44,
    //       "name": "现代",
    //       "imgKey": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABQAFAMBEQACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAABwkICv/EACAQAAIDAQEAAgMBAAAAAAAAAAMEAgUGAQcACBMUFRH/xAAYAQEBAQEBAAAAAAAAAAAAAAAABAUDBv/EACIRAAICAgIDAAMBAAAAAAAAAAECAxEABAUSExQhBhUigf/aAAwDAQACEQMRAD8A7t/RPTsn5fSu3upbOFVCnutAyFNabjQ6POLDcvrgoodjFerqFygm++yQKoJsqAkX9htYJmMXqv2PxnS5Je4q9JnW9sqm5RVlmgoxfSVdHAkGbHOU9hZ39Wqv2f4Xm3a0SiDMZAcOEv8AkJMY/wARRHHAwSQKIsIkGUcuTGQc48lCcJx72M4Tj3koyj3sZR7zvO9534xk/ftpt6eztz+eMeb/AGUtXl6FiJtN5ViVrzH2lVYuZVo9JcGsLBNS1jF01cxNVciVqmOvtzIWKf4mST3NLhDu6y7P7Li9YM5TxbW0Y5wQJTfjEbEqfEQCLHZkU0WGRT7ggcp6+1KVTuWii7JX8fA5YKWBcAi/lEmhROHM1r8V53uV/UK/6/8A2IEpV5exzdCHyv6vL5ayuwFUs7m3t2LnS+gbXfP6Jz+QGkK1Zs15GyNUp6RZeSVjZS0o/wASkdlQ83wEbkqHD8gAsZd40W5BGYmBEhYsjsFVGDEMVVp25VVs+lvkfarXJsAMSQLuh1I+gWSKsWRZPxfepejYCr0Fdh9n50oAzdEHJbyk/gaCsjRF/m8hNCLTo5IyiDn6DYWjAbWjA4ZyHKMu+e5DS9DZOv7OttgIjifUkMsLCRewpiqnsAf6UqCp+EXl+vN7EYk8csVkjpMvSQUaNrZ/wgkEfbxrfIs7YfGMPjGf/9k=",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 3,
    //           "name": "领动"
    //         },
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 4,
    //           "name": "IX35"
    //         }
    //       ]
    //     },
    //     {
    //       "createdAt": null,
    //       "updatedAt": null,
    //       "id": 45,
    //       "name": "荣威",
    //       "imgKey": "data:image/jpeg;base64,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",
    //       "seriesList": [
    //         {
    //           "createdAt": null,
    //           "updatedAt": null,
    //           "id": 1,
    //           "name": "ERX5(混动)"
    //         }
    //       ]
    //     }
    //   ]
    // } ,
    endStore: undefined,
    endCity: undefined,
    starCityStores: [],
    endCityStores: [],
    startCityOrEndCity: StartCityOrEndCityType.START,
    startStoreOrEndStore: StartStoreOrEndStoreType.START,
    isForeignCity: false,
    starTime: (new Date()).getTime(),
    endTime: (new Date()).getTime() + 60 * 60 * 24 * 1000 * 2,
    // car: {
    //   "createdAt": "2022-04-18 22:55:12",
    //   "updatedAt": "2022-04-18 22:55:13",
    //   "id": 7,
    //   "powerType": "ELECTRIC",
    //   "isSelfHelp": true,
    //   "displacement": 111,
    //   "shift": "AUTO",
    //   "gasVolume": 111,
    //   "seats": 111,
    //   "engineType": "SUPERCHARGED",
    //   "name": "12312312",
    //   "cover": "https://zhuche-a1001.qiniu.wuchuheng.com/2022-4-18-22-54-20-1650293660262-cover.jpg",
    //   "type": "1111",
    //   "tags": [
    //     "111"
    //   ],
    //   "isOnline": true,
    //   "number": "111",
    //   "rent": 111,
    //   "deposit": 111,
    //   "insuranceFee": 111,
    //   "handlingFee": 111,
    //   "store": {
    //     "updatedAt": null,
    //     "id": 2,
    //     "name": "惠阳店",
    //     "mark": "",
    //     "starAt": "00:00",
    //     "endAt": "23:59",
    //     "address": "天山一路壹方天第东北侧约90米",
    //     "servicePhone": "13427969604",
    //     "lat": 22.7679,
    //     "lng": 114.442,
    //     "isEnable": true,
    //     "isStation": true,
    //     "isAirport": true,
    //     "isSelfService": true,
    //     "admin": {
    //       "id": 4,
    //       "username": "惠阳店",
    //       "isEnabled": true,
    //     },
    //     "banners": [
    //       {
    //         "id": 3,
    //         "imgKey": "2022-3-17-17-41-12-1647510072337-231_3.jpg",
    //         "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //       },
    //       {
    //         "id": 4,
    //         "imgKey": "2022-3-17-17-41-15-1647510075296-231_4.jpg",
    //         "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //       }
    //     ],
    //     "pickupGuides": [
    //       {
    //         "id": 2,
    //         "imgKey": "2022-3-17-17-41-45-1647510105072-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg",
    //         "title": "取车指引图1标题",
    //         "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //       }
    //     ],
    //     "returnGuides": [
    //       {
    //         "id": 3,
    //         "imgKey": "2022-3-17-17-41-53-1647510113946-85882bc629a74de2a76e480a112f2108.jpg",
    //         "title": "还车指引图1标题",
    //         "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //       },
    //       {
    //         "id": 4,
    //         "imgKey": "2022-3-17-17-42-6-1647510126282-dc20ea7c29cb4dc2872bfce0905e39fa.jpg",
    //         "title": "还车指引图2标题",
    //         "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
    //       }
    //     ],
    //     "area": {
    //       "code": "441303",
    //       "name": "惠阳区"
    //     },
    //     "city": {
    //       "code": "4413",
    //       "name": "惠州市",
    //       "pinyin": "huizhou"
    //     },
    //     "province": {
    //       "code": "44",
    //       "name": "广东省"
    //     }
    //   },
    //   "configs": [
    //   ],
    //   "brandSeries": {
    //     "id": 13,
    //     "name": "劲客"
    //   },
    //   "comments": []
    // }
  }
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCreatedStartCity: (state, payload: PayloadAction<CityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startCity: payload.payload,
        }}
    },
    setCreatedEndCity: (state, payload: PayloadAction<CityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          endCity: payload.payload,
        }}
    },
    setStartCityOrEndCity: (state, payload: PayloadAction<StartCityOrEndCityType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startCityOrEndCity: payload.payload
        }}
    },
    setStartStoreOrEndStore: (state, payload: PayloadAction<StartStoreOrEndStoreType>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          startStoreOrEndStore: payload.payload
        }}
    },
    setCreateOrderIsForeignCity: (state, payload: PayloadAction<boolean>): InitialStateType => {
      return {
        ...state, createOrder: {
          ...state.createOrder,
          isForeignCity: payload.payload
        }}
    },
    // 设置开始城市的门店数据
    setStarCityStores: (state, payload: PayloadAction<AreaStoreType[]>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          starCityStores: payload.payload
        }
      }
    },
    // 设置用于还车的商店列表
    setEndCityStores: (state, payload: PayloadAction<AreaStoreType[]>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          endCityStores: payload.payload
        }
      }
    },
    // 选择开始的商店
    setStarStore: (state, payload: PayloadAction<StoreItemType>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          startCity: payload.payload.city,
          startStore: payload.payload
        }
      }
    },
    // 选择结束的商店
    setEndStore: (state, payload: PayloadAction<StoreItemType>) => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          endCity: payload.payload.city,
          endStore: payload.payload
        }
      }
    },
    setTime: (state, payload: PayloadAction<{startTime: TimestampType; endTime: TimestampType}>): InitialStateType => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          starTime: payload.payload.startTime,
          endTime: payload.payload.endTime
        }
      }
    },
    resetStartStore: (state) => {
      return {...state, createOrder: {...state.createOrder, startStore: null}}
    },
    resetEndStore: (state) => {
      return {...state, createOrder: {...state.createOrder, endStore: null}}
    },

    /**
     * 设置优惠卷
     * @param state
     * @param action
     */
    setUserCoupon: (state, action: PayloadAction<UserCouponItemType>): InitialStateType => {
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          userCoupon: action.payload
        }
      }
    },

    /**
     * 设置订单中的汽车
     * @param state
     * @param action
     */
    setCar: (state, action: PayloadAction<CarItemType>): InitialStateType => {
      return {...state, createOrder: {...state.createOrder, car: action.payload}}
    }
  }
})
const {reducer: orderReducer, actions} = orderSlice

const initLocationThunk = (lat: number, lng: number) => {
  return async (dispatch: AppDispatch) => {
    const store = await getStoreByLocation({lat, lng})
    if (store) {
      await dispatch(setStartCityThunk(store.city))
      await dispatch(setStarStore(store))
    }
  }
}

const setStartCityThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedStartCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setStarCityStores(areaStores))
    const {startStore} = getState().order.createOrder
    if (startStore && startStore.city.code !== city.code) {
      dispatch(resetStartStore())
    }
  }
}

const setEndCityStoresThunk = (city: CityType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCreatedEndCity(city))
    const areaStores = await getAreaStores(city.code)
    dispatch(setEndCityStores(areaStores))
    const {endStore} = getState().order.createOrder
    if (endStore && endStore.city.code !== city.code) {
      dispatch(resetEndStore())
    }
  }
}

export const {
  setCreatedStartCity,
  setCreatedEndCity,
  setStartCityOrEndCity,
  setCreateOrderIsForeignCity,
  setStartStoreOrEndStore,
  setStarCityStores,
  setStarStore,
  setEndStore,
  setEndCityStores,
  setTime,
  resetEndStore,
  resetStartStore,
  setUserCoupon,
  setCar
} = actions
export {setStartCityThunk, setEndCityStoresThunk, initLocationThunk}
export default orderReducer

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "..";
import {CarItemType, StoreItemType} from "../../typings";
import {getCars} from "../../api/cars";

type CategoryType = {
  id: number
  name: string
  price: number
  cars: CarItemType[]
}
type InitialStateType = {
  list: CarItemType[]
  categories: CategoryType[]
  loading: boolean
  showCarItemDetail?: CarItemType
}
const initialState: InitialStateType = {
  list: [],
  categories: [],
  loading: false,
  showCarItemDetail: {
    "createdAt": "2022-04-10 22:23:37",
    "updatedAt": "2022-04-10 22:23:37",
    "id": 4,
    "powerType": "ELECTRIC_GAS",
    "isSelfHelp": false,
    "displacement": 1.6,
    "shift": "AUTO",
    "gasVolume": 12.0,
    "seats": 5,
    "engineType": "NATURALLY_ASPIRATED",
    "name": "日产轩逸",
    "cover": "https://zhuche-a1001.qiniu.wuchuheng.com/2022-4-10-22-22-23-1649600543498-cover.jpg",
    "type": "三厢",
    "tags": [
      "朗逸",
      "奶造型"
    ],
    "isOnline": true,
    "number": "浙A81220",
    "price": 200.0,
    "deposit": 3000.0,
    "store": {
      "id": 2,
      "name": "惠阳店",
      "mark": "",
      "starAt": "00:00",
      "endAt": "23:59",
      "address": "天山一路壹方天第东北侧约90米",
      "servicePhone": "13427969604",
      "lat": 22.7679,
      "lng": 114.442,
      "isEnable": true,
      "isStation": true,
      "isAirport": true,
      "isSelfService": true,
      "admin": {
        "id": 4,
        "username": "惠阳店",
        "isEnabled": true,
      },
      "banners": [
        {
          "id": 3,
          "imgKey": "2022-3-17-17-41-12-1647510072337-231_3.jpg",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        },
        {
          "id": 4,
          "imgKey": "2022-3-17-17-41-15-1647510075296-231_4.jpg",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "pickupGuides": [
        {
          "id": 2,
          "imgKey": "2022-3-17-17-41-45-1647510105072-806d6cd71f7141e9b2d8e1d1c8d3140c.jpg",
          "title": "取车指引图1标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "returnGuides": [
        {
          "id": 3,
          "imgKey": "2022-3-17-17-41-53-1647510113946-85882bc629a74de2a76e480a112f2108.jpg",
          "title": "还车指引图1标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        },
        {
          "id": 4,
          "imgKey": "2022-3-17-17-42-6-1647510126282-dc20ea7c29cb4dc2872bfce0905e39fa.jpg",
          "title": "还车指引图2标题",
          "prefixUrl": "https://zhuche-a1001.qiniu.wuchuheng.com"
        }
      ],
      "area": {
        "code": "441303",
        "name": "惠阳区"
      },
      "city": {
        "code": "4413",
        "name": "惠州市",
        "pinyin": "huizhou"
      },
      "province": {
        "code": "44",
        "name": "广东省"
      }
    },
    "brandSeries": {
      "id": 4,
      "name": "IX35"
    },
    "carCategory": {
      "id": 12,
      "name": "舒适型",
      store: null
    }
  }
}
const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    save: (state, action: PayloadAction<CarItemType[]>): InitialStateType => {
      return {...state, list: action.payload}
    },
    setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading: action.payload}
    },
    setCategories: (state, action:PayloadAction<CategoryType[]>) => {
      return {...state, categories: action.payload}
    },
    setCarDetail: (state,action: PayloadAction<CarItemType>): InitialStateType => {
      return {...state, showCarItemDetail: action.payload}
    }
  }
})
const carReducer = carSlice.reducer

const getCarsThunk = (storeId: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      const newCars = await getCars(storeId)
      dispatch(save(newCars))
      const categoryNameMapCars: Map<string, CategoryType> = new Map<string, CategoryType>();
      newCars.forEach(car => {
        if (categoryNameMapCars.has(car.carCategory.name)) {
          const categoryCars = categoryNameMapCars.get(car.carCategory.name)
          if (car.price < categoryCars.price) {
            categoryCars.price = car.price
            categoryCars.id = car.carCategory.id
            categoryCars.name = car.name
            categoryCars.cars = [...categoryCars.cars, car]
          }
        } else {
          categoryNameMapCars.set(car.carCategory.name,{
            id: car.carCategory.id,
            name: car.carCategory.name,
            price: car.price,
            cars: [car]
          })
        }
      })
      dispatch(setCategories(Array.from(categoryNameMapCars.values())))
    }finally {
      dispatch(setLoading(false))
    }
  }
}


export const {save, setLoading, setCategories, setCarDetail} = carSlice.actions
export {getCarsThunk}
export default carReducer

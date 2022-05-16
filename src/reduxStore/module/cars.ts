import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "..";
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
          if (car.rent < categoryCars.price) {
            categoryCars.price = car.rent
            categoryCars.id = car.carCategory.id
            categoryCars.name = car.name
            categoryCars.cars = [...categoryCars.cars, car]
          }
        } else {
          categoryNameMapCars.set(car.carCategory.name,{
            id: car.carCategory.id,
            name: car.carCategory.name,
            price: car.rent,
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

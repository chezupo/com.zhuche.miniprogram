import {SearchStateType} from "../index";
// @ts-ignore
import style from "./style.module.scss"
import {View} from "@tarojs/components";


type SearchPropsType = {
  searchState: SearchStateType
  onChangeState: () => void
}
const Search = (props: SearchPropsType): React.ReactElement=> {
  return (
    <View className={style.main}>
      <View className={style.container}>
        <View className={style.searchSpinner}>input </View>
        <View className={style.button}>地图</View>
      </View>
    </View>
  )
}

export default Search;

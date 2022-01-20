import useObserve from "../../../../../util/useObserve";
import Getters, {CityInfoType} from "../../../../../store/getters";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import Search from "../../../../../components/Search"
import NotFound from "../../../../../components/NotFound";
import {CategoryMapCitiesType, cityCategoriesObserve, CityCategory, pickCity} from "../../../../../store/cityStore";


const PleaseEnterSomeThing = (): React.ReactElement => {
  return (<View className={style.emptyContainer}>
    <Search />
  </View>)
}
const ResultRender = (): React.ReactElement => {
  const [cityName] = useObserve(Getters.citySearchObserve)
  const [categoryMapCities] = useObserve<CategoryMapCitiesType>(cityCategoriesObserve)
  const cities: CityInfoType[] = []
  categoryMapCities.forEach((list,cityCategory) => {
    if (cityCategory === CityCategory.POPULAR) return;
    list.forEach(cityInfo => {
      const regName = new RegExp("^" + cityName)
      const isMatch = !!cityInfo.name.match(regName) || !!cityInfo.pinyin.match(regName)
      isMatch && cities.push(cityInfo)
    })
  })
  const ListRender = () => {
    return (<View className={style.listWrapper}>
      <View className={style.itemWrapper}>
        {cities.map(item =>
          (<View className={style.item} key={item.code} onClick={() => pickCity(item)} >
            {item.name}
          </View>)
        )}
      </View>
    </View>)
  }
  return (<View className={style.emptyContainer}>
    {cities.length > 0 && <ListRender /> }
    {cities.length === 0 && <NotFound title='很抱歉，没有找到结果，您可以换个词试试。' /> }
  </View>)
}

const SearchResult = (): React.ReactElement => {
  const [cityName] = useObserve(Getters.citySearchObserve)
  return (<>
    {cityName.length === 0 && <PleaseEnterSomeThing /> }
    {cityName.length > 0 && <ResultRender /> }
  </>)
}

export default SearchResult
import {Image, View} from "@tarojs/components";
import {useMemo, useState} from "react";
// @ts-ignore
import style from "./style.module.scss";

type SeriesType = {
  id: number;
  name: string;
  isCheck: boolean;
}
type BrandType = {
  name: string;
  id: number;
  url: string;
  series: SeriesType[],
  isCheckAll: boolean
}
const BrandRender = (): React.ReactElement => {
  const [brands, setBrands] = useState<BrandType[]>([
      {id: 1, name: '爱驰', isCheckAll: false, series: [
          {id: 1, name: 'U5', isCheck: true },
          {id: 2, name: 'U5', isCheck: true },
          {id: 3, name: 'U5', isCheck: true },
          {id: 4, name: 'U5', isCheck: true },
          {id: 5, name: 'U5', isCheck: true },
          {id: 6, name: 'U5', isCheck: true },
          {id: 7, name: 'U5', isCheck: true },
          {id: 8, name: 'U5', isCheck: true },
          {id: 9, name: 'U5', isCheck: true },
          {id: 10, name: 'U5', isCheck: true },
          {id: 11, name: 'U5', isCheck: true },
          {id: 12, name: 'U5', isCheck: true },
          {id: 13, name: 'U5', isCheck: true },
          {id: 14, name: 'U5', isCheck: true },
          {id: 15, name: 'U5', isCheck: true },
          {id: 16, name: 'U5', isCheck: true },
          {id: 17, name: 'U5', isCheck: true },
          {id: 18, name: 'U5', isCheck: true },
          {id: 19, name: 'U5', isCheck: true },
          {id: 20, name: 'U5', isCheck: true },
          {id: 21, name: 'U5', isCheck: true },
          {id: 22, name: 'U5', isCheck: true },
          {id: 23, name: 'U5', isCheck: true },
          {id: 24, name: 'U5', isCheck: true },
          {id: 25, name: 'U5', isCheck: true },
          {id: 26, name: 'U5', isCheck: true },
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/aici.jpeg'},
      {id: 2, name: '奔驰', isCheckAll: false, series: [{id: 2, name: 'A200', isCheck: false}], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/beici.png'},
      {id: 3, name: '别克', isCheckAll: false, series: [{id: 3, name: 'GL8', isCheck: false},
          {id: 4, name: '昂科威', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/beike.jpeg'},
      {id: 4, name: '本田', isCheckAll: false, series: [
          {id: 5, name: '凌派', isCheck: false},
          {id: 6, name: '缤智', isCheck: false},
          {id: 7, name: '新飞度', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/bentian.jpeg'},
      {id: 5, name: '大众', isCheckAll: false, series: [
          {id: 8, name: '迈腾', isCheck: false},
          {id: 9, name: '速腾', isCheck: false},
          {id: 10, name: '探歌', isCheck: false},
          {id: 11, name: '高尔夫', isCheck: false},
          {id: 12, name: '帕萨特', isCheck: false},
          {id: 13, name: '宝来', isCheck: false},
          {id: 14, name: '速腾 经典', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/dazhong.jpeg'},
      {id: 6, name: '丰田', isCheckAll: false, series: [
          {id: 15, name: 'RAV4荣放', isCheck: false},
          {id: 16, name: '亚洲狮', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/fentian.png'},
      {id: 7, name: '日产', isCheckAll: false, series: [
          {id: 17, name: '轩逸', isCheck: false},
          {id: 18, name: '奇骏', isCheck: false},
          {id: 19, name: '天籁', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/fentian.png'},
      {id: 8, name: '荣威', isCheckAll: false, series: [
          {id: 20, name: 'ERX5', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/ronwei.jpeg'},
      {id: 9, name: '现代', isCheckAll: false, series: [
          {id: 21, name: 'IX35', isCheck: false}
        ], url: 'https://zhuche-a1001.qiniu.wuchuheng.com/xiandai.jpeg'},
    ])
  const [activeBrand, setActiveBrand] = useState<BrandType>(brands[0])
  const checkBrandIds = useMemo<number[]>(() => {
    const res: number[] = [];
    for (const i of brands) {
      if (i.isCheckAll) res.push(i.id)
      else {
        for (const s of i.series) {
          if (s.isCheck) {
            res.push(i.id); break;
          }
        }
      }
    }

    return res
  }, [brands])

  const handleActiveBrand = (item: BrandType) => setActiveBrand(item)

  const handleCheckAllSeries = (): void => {
    const tmpBrands = JSON.parse(JSON.stringify(brands)) as BrandType[]
    const index = tmpBrands.findIndex(i => i.id === activeBrand.id)
    tmpBrands[index] = {
      ...activeBrand,
      isCheckAll: !activeBrand.isCheckAll,
      series: activeBrand.series.map(i => ({...i, isCheck: false}))
    }
    setBrands(tmpBrands)
    setActiveBrand(tmpBrands[index])
  }
  const handleActiveSeries = (activeSeries: SeriesType): void => {
    const tmpActiveBrand = JSON.parse(JSON.stringify(activeBrand)) as BrandType
    tmpActiveBrand.series = [
      ...tmpActiveBrand
        .series
        .map(
          i => i.id === activeSeries.id ? {...activeSeries, isCheck: !activeSeries.isCheck} : i
        )
    ]
    tmpActiveBrand.isCheckAll = false
    setActiveBrand(tmpActiveBrand)
    const tmpBrands = JSON.parse(JSON.stringify(brands))
    const newBrands = tmpBrands.map(i => i.id === tmpActiveBrand.id ? tmpActiveBrand : i)
    setBrands(newBrands)
  }

  return (
    <View className={style.main}>
      <View className={style.listWrapper}>
        <View className={style.leftWrapper}>
          {brands.map(item => (
            <View
              className={[style.leftItemWrapper, activeBrand.id === item.id ? style.active : ''].join(' ')}
              key={item.id}
              onClick={() => handleActiveBrand(item)}
            >
              <Image src={item.url} className={style.image} />
              <View>{item.name}</View>
              {
                checkBrandIds.includes(item.id) && <View className={style.point} />
              }
            </View>
          ))}
        </View>
        <View className={style.rightWrapper}>
          <View
            className={[style.seriesWrapper, activeBrand.isCheckAll ? style.activeBrand : ''].join(' ')}
            onClick={handleCheckAllSeries}
          >
            <View> 不限车系 </View>
            { activeBrand.isCheckAll && <View className='at-icon at-icon-check' /> }
          </View>

          {activeBrand.series.map(i => (
            <View
              className={[style.seriesWrapper, i.isCheck ? style.activeBrand : ''].join(' ')}
              key={i.id}
              onClick={() => handleActiveSeries(i)}
            >
              <View> {i.name}</View>
              { i.isCheck && <View className='at-icon at-icon-check' /> }
            </View>
          ))}

        </View>


      </View>

      <View>
        button
      </View>
    </View>
  )
}

export default BrandRender

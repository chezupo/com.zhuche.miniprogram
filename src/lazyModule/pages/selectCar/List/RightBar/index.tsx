import {View} from "@tarojs/components";
import {showModal} from "@tarojs/taro"
import * as React from "react";
// @ts-ignore
import style from './style.module.scss'
import Car, {CarInfoType} from "./Car";
import Notice from "../Notice";
import {switchTab, TabBarType} from "../../../../../store/module/router";

const RightBar = (): React.ReactElement => {
  const cars: CarInfoType[] = [
    {
      id: 1,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 2,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 3,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 4,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 5,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 6,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
    {
      id: 7,
      cover: 'https://zhuche-a1001.qiniu.wuchuheng.com/cover.jpg',
      mp4: 'https://zhuche-a1001.qiniu.wuchuheng.com/car.mp4',
      banners: [
        'https://zhuche-a1001.qiniu.wuchuheng.com/a.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/b.png',
        'https://zhuche-a1001.qiniu.wuchuheng.com/c.png',
      ],
      name: '大众迈腾',
      tags: [
        '省油',
        '舒适',
        '时尚',
        '蓝牙连接'
      ],
      configurations: new Set<{name: string, value: string}>([
        {name: '变速箱', value: '自动'},
        {name: '进气', value: '自然吸气'},
        {name: '油箱容量', value: '61'},
        {name: '排量', value: '2.0L'},
        {name: '座位数', value: '5'},
      ]),
      subtitle: '自动1.6L/三厢/5座',
      satisfaction: 100,
      price: 300,
      license: '浙A牌'
    },
  ]
  const handleSelectCar = (car: CarInfoType) => switchTab(TabBarType.ORDER)


  return (<View className={style.main}>
    <Notice />
    {
      cars.map(car => (
        <Car key={car.id}
          carInfo={car}
          onClick={handleSelectCar}
        />
      ))
    }
  </View>)
}

export default RightBar

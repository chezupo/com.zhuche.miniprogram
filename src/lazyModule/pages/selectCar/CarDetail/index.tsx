import React from "react";
import { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "preact/hooks";
import { View } from "@tarojs/components";
import BaseInfoRender from "./BaseInfoRender";
import ConfigRender from "./ConfigRender";
import CommonRender, { CommonTagItemType } from "./CommonRender/CommonRender";
import Button from "../../../../components/Button";
import style from "./style.module.scss";
import { useCheckedCar } from "../../../../util/carUtil";
import Loading from "../../../../components/Loading";
import { getCarByid } from "../../../../api/cars";

const CarDetail: React.FC = () => {
  const [data, setData] = useState<CarItemType | undefined>();
  const handleSelectCar = useCheckedCar();
  const { params } = useRouter();
  useEffect(() => {
    params?.id && getCarByid(parseInt(params.id)).then(res => setData(res));
  }, []);
  const commonTags: CommonTagItemType[] = [
    { name: "全部", total: 4 },
    { name: "全部", total: 4 },
    { name: "全部", total: 4 }
  ];
  return (
    <>
      {!data && <Loading />}
      {!!data && (
        <View className={style.main}>
          <BaseInfoRender data={data} />
          <ConfigRender data={data} />
          <CommonRender commonTags={commonTags} id={data.id} />
          <View className={style.buttonWrapper}>
            <Button
              className={style.button}
              onClick={() => handleSelectCar(data)}
            >
              立即预订
            </Button>
          </View>
        </View>
      )}
    </>
  );
};

export default CarDetail;

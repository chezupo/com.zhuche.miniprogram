import React from "preact/compat";
import { ReactNode } from "react";
import { Image, View } from "@tarojs/components";
import { useEffect, useState } from "preact/hooks";
import { getPromotionInfo } from "../../../../api/promotion";
import style from "./style.module.scss";
import Button from "../../../../components/Button";
import NotFound from "../../../../components/NotFound";
import Loading from "../../../../components/Loading";

enum ActiveType {
  PROMOTION_LEVEL_1_USERS,
  PROMOTION_LEVEL_2_USERS
}
type UserItemRenderPropsType = {
  data: UserItemType;
};
const UserItemRender: React.FC<UserItemRenderPropsType> = props => {
  const nickname = props.data?.alipayAccount.nickName || "";
  const createdAt = props.data?.alipayAccount.createdAt || "";

  return (
    <>
      <View className={style.userItemWrapper}>
        <Image
          src={props.data?.alipayAccount.avatar}
          className={style.avatar}
        />
        <View className={style.infoWrapper}>
          <View className={style.itemWrapper}>
            <View>名字: </View>
            <View>{nickname}</View>
          </View>
          <View className={style.itemWrapper}>
            <View>时间: </View>
            <View>{createdAt}</View>
          </View>
        </View>
      </View>
    </>
  );
};
const PromotionUsersPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [promotionInfo, setPromotionInfo] = useState<PromotionInfoType>({
    downLineCount: 0,
    orders: [],
    promotionLevel1Users: [],
    promotionLevel2Users: []
  });
  const [active, setActive] = useState<ActiveType>(
    ActiveType.PROMOTION_LEVEL_1_USERS
  );
  useEffect(() => {
    setLoading(true);
    getPromotionInfo()
      .then(res => setPromotionInfo(res))
      .finally(() => setLoading(false));
  }, []);

  let userItemsDom: ReactNode[] = [];
  if (active === ActiveType.PROMOTION_LEVEL_1_USERS) {
    userItemsDom = promotionInfo.promotionLevel1Users.map(user => (
      <UserItemRender data={user} key={user.id} />
    ));
  } else {
    userItemsDom = promotionInfo.promotionLevel2Users.map(user => (
      <UserItemRender data={user} key={user.id} />
    ));
  }

  return (
    <>
      {loading && <Loading />}
      <View className={style.main}>
        <View className={style.tabWrapper}>
          <Button
            {...(active === ActiveType.PROMOTION_LEVEL_1_USERS
              ? { type: "primary" }
              : {})}
            onClick={() => setActive(ActiveType.PROMOTION_LEVEL_1_USERS)}
          >
            一级下线
          </Button>
          <Button
            {...(active === ActiveType.PROMOTION_LEVEL_2_USERS
              ? { type: "primary" }
              : {})}
            onClick={() => setActive(ActiveType.PROMOTION_LEVEL_2_USERS)}
          >
            二级下线
          </Button>
        </View>
        <View className={style.userWrapper}>
          {userItemsDom.length === 0 && <NotFound />}
          {userItemsDom.length > 0 && (
            <>
              {userItemsDom}
              <View className={style.bottomNotice}>-- 到底了 --</View>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default PromotionUsersPage;

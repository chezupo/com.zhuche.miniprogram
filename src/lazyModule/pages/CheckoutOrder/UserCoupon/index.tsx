import React from "preact/compat";
import { useRouter } from "@tarojs/taro";
import { Text, View } from "@tarojs/components";
import { useEffect, useState } from "preact/hooks";
import MenuContainer from "../../../../components/MenuContainer";
import Container from "../components";
import style from "./style.module.scss";
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../../reduxStore";
import { setUserCoupon as setStoreUserCoupon } from "../../../../reduxStore/module/order";
import { iniUserCouponThunk } from "../../../../reduxStore/module/userCoupons";
import SpinContainer from "../../../../components/SpinContainer";
import Radio from "../../../../components/Radio";
import { primaryThemeColor } from "../../../../global";
import { navigateToCheckoutOrder } from "../../../../store/module/router";

type ItemRenderPropsType = {
  data: UserCouponItemType;
  onShowRule: (rule: string) => void;
  checkedUserCoupon?: UserCouponItemType;
  onChange: (newUserCoupon: UserCouponItemType) => void;
  onCancel: () => void;
};
const ItemRender: React.FC<ItemRenderPropsType> = ({
  data,
  onShowRule,
  onChange,
  checkedUserCoupon,
  onCancel
}) => {
  const { params } = useRouter();
  const isMeetAmount =
    !params?.amount || parseFloat(params.amount) >= data.meetAmount;
  const isValid = data.isValid && isMeetAmount;
  const reason = !isValid ? data.reason || "消费额度不足" : "";
  const isValidClassName = isValid ? "" : style.disableColor;
  const dayTimeStamp = 60 * 60 * 24 * 1000;
  const now = new Date(
    new Date(data.createdAt).getTime() + data.expired * dayTimeStamp
  );
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const checked = checkedUserCoupon && checkedUserCoupon.id === data.id;
  const handleClick = () => {
    if (!isValid) return;
    checkedUserCoupon && checkedUserCoupon.id === data.id
      ? onCancel()
      : onChange(data);
  };

  return (
    <>
      <Container className={style.item}>
        <View className={style.topBar} onClick={handleClick}>
          <View className={style.leftBar}>
            <View className={[style.amountWrapper].join(" ")}>
              <Text className={isValidClassName}>￥</Text>
              <Text className={[style.amount, isValidClassName].join(" ")}>
                {data.amount}
              </Text>
            </View>
            <View className={style.titleWrapper}>
              <View className={[style.title, isValidClassName].join(" ")}>
                {data.title}
              </View>
              <View className={[style.dateTime, isValidClassName].join(" ")}>
                有效期到{y}-{m > 9 ? m : "0" + m}-{d}
              </View>
            </View>
          </View>
          <View>
            {isValid && <Radio checked={checked} color={primaryThemeColor} />}
          </View>
        </View>
        <View className={style.lineWrapper}>
          <View className={style.leftPoint} />
          <View className={style.rightPoint} />
          <View className={style.line} />
        </View>
        <View className={style.bottomWrapper}>
          <View className={style.reasonWrapper}>
            {!isValid && (
              <>
                <View className={style.title}>
                  <Icon value="exclamation-mark" className={style.icon} />
                  <View>不可用原因</View>
                </View>
                <View className={style.reason}>{reason}</View>
              </>
            )}
          </View>
          <View className={style.rule} onClick={() => onShowRule(data.content)}>
            使用规则
          </View>
        </View>
      </Container>
    </>
  );
};
const UserCoupon: React.FC = () => {
  const { params } = useRouter();
  const [rule, setRule] = useState<string | undefined>();
  const [userCoupon, setUserCoupon] = useState<
    UserCouponItemType | undefined
  >();
  const { list: coupons } = useAppSelector(state => state.userCoupons);
  const { userCoupon: checkedUserCoupon } = useAppSelector(
    state => state.order.createOrder
  );
  useEffect(() => {
    setUserCoupon(checkedUserCoupon);
  }, [coupons]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (coupons.length === 0) {
      dispatch(iniUserCouponThunk()).then(() => {
        console.log("init coupons");
      });
    }
  }, []);
  const handleChange = (newUserCoupon: UserCouponItemType) => {
    setUserCoupon(newUserCoupon);
  };
  const handleReset = () => {
    dispatch(setStoreUserCoupon(undefined));
    navigateToCheckoutOrder();
  };
  const handleConfirm = () => {
    dispatch(setStoreUserCoupon(userCoupon));
    navigateToCheckoutOrder();
  };

  const body = (
    <View
      className={[
        style.bodyWrapper,
        !params.amount ? style.fullHeight : ""
      ].join(" ")}
    >
      <View className={style.main}>
        {coupons.map(coupon => (
          <ItemRender
            onChange={handleChange}
            onCancel={() => setUserCoupon(undefined)}
            checkedUserCoupon={userCoupon}
            key={coupon.id}
            data={coupon}
            onShowRule={setRule}
          />
        ))}
      </View>
    </View>
  );
  return (
    <>
      {!!!params.amount && <>{body}</>}
      {params.amount && (
        <>
          <MenuContainer
            menuBar={
              <View className={style.menuWrapper}>
                <Button isDisable={!userCoupon} onClick={handleReset}>
                  不使用优惠卷
                </Button>
                <Button
                  type="primary"
                  isDisable={!userCoupon}
                  onClick={handleConfirm}
                >
                  绑卷
                </Button>
              </View>
            }
          >
            {body}
          </MenuContainer>
        </>
      )}
      {rule && (
        <SpinContainer
          className={style.spinContainer}
          onClick={() => setRule(undefined)}
        >
          <View
            className={style.content}
            dangerouslySetInnerHTML={{ __html: rule }}
          />
        </SpinContainer>
      )}
    </>
  );
};

export default UserCoupon;

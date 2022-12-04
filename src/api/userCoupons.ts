import { get } from "../util/requestClient";

type GetUserCouponsReturnType = UserCouponItemType[];

const getUserCoupons = async (): Promise<GetUserCouponsReturnType> => {
  return await get<GetUserCouponsReturnType>("/me/userCoupons");
};

export { getUserCoupons };

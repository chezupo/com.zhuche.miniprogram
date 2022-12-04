import React from "preact/compat";
import { useEffect } from "preact/hooks";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "../../../reduxStore";
import ItemRender from "../BalancePage/TransactionRender/ItemRender";
import { getTransactionThunk } from "../../../reduxStore/module/me";
import NotFound from "../../../components/NotFound";

const TransactionPage: React.FC = () => {
  const transactionItems = useAppSelector(
    state => state.me.data?.transactions || []
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTransactionThunk()).then(() => {
      console.log("Get transaction.");
    });
  }, []);

  return (
    <View className={style.main}>
      {transactionItems.length > 0 && (
        <>
          {transactionItems.map(item => (
            <ItemRender data={item} key={item.id} />
          ))}
        </>
      )}
      {transactionItems.length === 0 && (
        <View className={style.notFound}>
          <NotFound title="没有账单" />
        </View>
      )}
    </View>
  );
};

export default TransactionPage;

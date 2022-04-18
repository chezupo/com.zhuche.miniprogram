import {useAppSelector} from "../reduxStore";

const useIsLogin = (): boolean => {
  const {data} = useAppSelector(state => state.me)


  return !!data?.isAuthorizeBaseInfo
}

export {useIsLogin}

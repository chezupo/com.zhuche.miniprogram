import useObserve from "../../../../../services/subscriptionService/useObserve";
import SubscriptionScheduler from "../../../../../services/subscriptionService/SubscriptionScheduler";

const SearchResult = (): React.ReactElement => {
  const [cityname, cityNameObserve] = useObserve(SubscriptionScheduler.citySearchObserve)
  const PleaseEnterSomeThing = (): React.ReactElement => {
    return <>PleaseEnterSomeThing</>
  }
  const ResultRender = (): React.ReactElement => {
    return <>result list OR empty!</>
  }

  return (<>
    {cityname.length === 0 && <PleaseEnterSomeThing /> }
    {cityname.length > 0 && <ResultRender /> }
  </>)
}

export default SearchResult

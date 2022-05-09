import {get} from "../util/requestClient";

const getViolations = async () => {
  return await get<ViolationItemType[]>(`/violations`)
}

export {getViolations}

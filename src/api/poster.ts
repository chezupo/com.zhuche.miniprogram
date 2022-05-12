import {get} from "../util/requestClient";

const getPosters = async (): Promise<PosterItemType[]> => {
  return await get<PosterItemType[]>('/promotionPosters')
}

export {getPosters}

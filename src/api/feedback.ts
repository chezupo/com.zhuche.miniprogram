import {post} from "../util/requestClient";

export type CreateFeedbackQueryType = Omit<FeedbackItemType, 'id'>

const createFeedback = async (query: CreateFeedbackQueryType) => {
   await post<FeedbackItemType>(`/feedbacks`, query)
}

export {createFeedback}

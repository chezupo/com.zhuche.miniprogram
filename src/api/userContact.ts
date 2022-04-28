import {deleteRequest, get, post, put} from "../util/requestClient";
import {UserContactItemType} from "../typings";

const getUserContact = async () => {
  return await get<UserContactItemType[]>('/userContacts')
}

const createUserContact = async (data: Omit<UserContactItemType, 'id'>) => {
  return await post<UserContactItemType[]>('/userContacts', data)
}

const editUserContact = async (id: number, data: Omit<UserContactItemType, 'id'>) => {
  return await put<UserContactItemType[]>(`/userContacts/${id}`, data)
}

const deleteUserContact = async (id: number) => await deleteRequest(`/userContacts/${id}`)

export {
  getUserContact,
  deleteUserContact,
  createUserContact,
  editUserContact
}



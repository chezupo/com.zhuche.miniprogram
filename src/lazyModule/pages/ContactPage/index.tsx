import React from "preact/compat";
import {View} from "@tarojs/components";
import {useEffect, useState} from "preact/hooks";
import MenuContainer from "../../../components/MenuContainer";
import ItemRender from "./ItemRender";
import style from './style.module.scss'
import FormRender from "./FormRender";
import {createUserContact, deleteUserContact, editUserContact, getUserContact} from "../../../api/userContact";
import Loading from "../../../components/Loading";
import PopModal from "../../../components/PopModal";
import ButtonRender from "./ButtonRender";
import Message from "../../../components/Message";
import {messageObserve} from "../../../store/module/message";
import NotFound from "../../../components/NotFound";

const ContactPage: React.FC = () => {
  const [editItem, setEditItem] = useState<UserContactItemType| undefined>()
  const [userContacts, setUserContacts] = useState<UserContactItemType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getUserContact()
      setUserContacts(res)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData().then(() => {
      console.log("Fetch contacts.")
    })
  }, [])
  const createId = 0;
  const handleCreate = () => {
    setEditItem({
      id: createId,
      relation: '',
      name: '',
      phone: ''
    })
  }
  const handleSubmit = async ()  => {
    // 创建
    if (editItem.id === createId) {
      await createUserContact(editItem)
      await fetchData()
      setEditItem(undefined)
      messageObserve.next({
        title: '创建成功',
        type: 'success',
        duration: 3000
      })
      // 编辑
    } else {
      await editUserContact(editItem.id, editItem)
      await fetchData()
      setEditItem(undefined)
      messageObserve.next({
        title: '修改成功',
        type: 'success',
        duration: 3000
      })
    }
  }
  const handleDelete = async () => {
    await deleteUserContact(deleteItem.id)
    setUserContacts( userContacts.filter(i => i.id !== deleteItem.id) )
    setDeleteItem(undefined)
    messageObserve.next({
      title: '删除成功',
      type: 'success',
      duration: 3000
    })
  }
  const handleEdit = async (item: UserContactItemType) => {
    setEditItem(item);
    await handleSubmit()
  }
  const [deleteItem, setDeleteItem] = useState<UserContactItemType | undefined>()
  return (<>
    <Message />
    {
      !!deleteItem && <PopModal
        onCancel={() =>setDeleteItem(undefined)}
        onConfirm={handleDelete}
        content='你真的要删除吗?' title='删除联系人'
        okText='删除'
        cancelText='取消'
      />
    }
    {loading && <Loading />}
    { !!editItem && (<FormRender
      onChange={newValue => setEditItem({...editItem, ...newValue})}
      value={editItem}
      onCancel={() => setEditItem(undefined)}
      onSubmit={handleSubmit}
    /> ) }
    <MenuContainer
      menuBar={( <ButtonRender onClick={handleCreate} /> )}
      bodyClassName={style.main}
    >
      {
        userContacts.length === 0 && (
          <View className={style.emptyWrapper}>
            <NotFound title='请添加您的联系人' />
          </View>
        )
      }

      {
        userContacts.map(item=> (
          <ItemRender
            value={item}
            key={item.id}
            onEdit={handleEdit}
            onDelete={() => {
              setDeleteItem(item)
            }}
          />
        ))
      }

    </MenuContainer>
  </>)
}

export default ContactPage

import * as React from "react";

type PermissionPropsType = {
  children: React.ReactChild | React.ReactChildren | React.ReactNode[]
}
const Permission: React.FC<PermissionPropsType> = (props) => {
  return <>
    {props.children}
  </>
}

export default Permission

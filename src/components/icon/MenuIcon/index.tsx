import * as React from "react";
import {IconPropsType} from "../icon";
import BaseIcon from "../BaseIcon";

const MenuIcon = (props: IconPropsType): React.ReactElement => {
  const color = props.color ? props.color : 'black';
  const svg = `
<svg t="1642751851483" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1229" width="200" height="200" color="${color}">
<path d="M223.701333 427.264a95.701333 95.701333 0 1 0 0 191.36 95.701333 95.701333 0 0 0 0-191.36z m289.621334 0a95.658667 95.658667 0 1 0 0 191.317333 95.658667 95.658667 0 0 0-0.042667-191.317333z m289.621333 0a95.658667 95.658667 0 1 0 0.042667 191.402667 95.658667 95.658667 0 1 0 0-191.402667z" p-id="1230">
</path></svg>
           `
  return <BaseIcon svg={svg} className={props.className} />
}

export default MenuIcon;

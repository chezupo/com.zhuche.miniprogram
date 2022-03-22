import * as React from "react";
import {ReactChild} from "react";
import {useEffect, useState} from "preact/hooks";

type MessagePropsType = {
  children: ReactChild
  height: string
  className?: string
  style?: Record<string, string>
}
type HideAndShowPropsType = {
  disableVisitableStyle: Record<string, string>
  enableVisitableStyle: Record<string, string>
  isInit: boolean
}
type TransitionEasePropsType = {
  visitable: boolean
} & MessagePropsType

const TransitionEase: React.FC<TransitionEasePropsType> = props => {
  const [isInit, setIsInt] = useState<boolean>(true)
  useEffect(() => {
    setIsInt(false)
  }, [props.visitable])
  const [disableVisitableStyle] = useState<Record<string, string>>({
    maxHeight: '0',
    transition: 'max-height 0.25s ease-in'
  })
  const [enableVisitableStyle] = useState<Record<string, string>>({
    maxHeight: props.height,
    transition: 'max-height 0.25s ease-out'
  })

  return (<>
    {
      props.visitable && <Show
        isInit={isInit}
        style={props.style}
        height={props.height}
        disableVisitableStyle={disableVisitableStyle}
        enableVisitableStyle={enableVisitableStyle}
        className={props.className}
      >{props.children}</Show>
    }
    {
      !props.visitable && <Hide
        isInit={isInit}
        height={props.height}
        disableVisitableStyle={disableVisitableStyle}
        enableVisitableStyle={enableVisitableStyle}
        style={props.style}
        className={props.className}
      />
    }
  </>)
}


const Hide: React.FC<Omit<MessagePropsType, 'children'> & HideAndShowPropsType  > = props => {
  const [dynamicStyle, setDynamicStyle] = useState<Record<string, string>>(props.enableVisitableStyle)
  const [hidden, setHidden] = useState<boolean>(false)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    setDynamicStyle(props.disableVisitableStyle)
    timer = setTimeout(()  => {
      setHidden(true)
    }, 250)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [])

  return(
    <>
      {!hidden && !props.isInit && <view
        className={[props.className || ''].join(' ')}
        style={{height:props.height, ...dynamicStyle, ...props?.style}}
      /> }
    </>
  )
}

const Show: React.FC<MessagePropsType & HideAndShowPropsType> = props => {
  const [message, setMessage] = useState<ReactChild>(<></>)
  const [dynamicStyle, setDynamicStyle] = useState<Record<string, string>>(props.disableVisitableStyle)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    setDynamicStyle(props.enableVisitableStyle)
    timer = setTimeout(() => {
      setMessage(props.children)
    }, 250)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [])

  return(
    <>
      {
        !props.isInit &&
        <view
          className={[props.className || ''].join(' ')}
          style={{height: props.height, ...dynamicStyle, ...props?.style}}
        >
          {message}
        </view>
      }
    </>
  )
}

export default TransitionEase


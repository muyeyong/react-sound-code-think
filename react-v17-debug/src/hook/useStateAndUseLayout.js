/* eslint-disable import/no-anonymous-default-export */
/* 
  调试useState useLayout源码
 */
import { useState } from 'react'
export default () => {
  const [num, setNum] = useState(0)
  return <div onClick={() => setNum(pre => pre + 1)}>{num}</div>
}
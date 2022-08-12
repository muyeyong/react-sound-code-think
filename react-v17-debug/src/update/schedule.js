import { useState, useRef, useEffect } from 'react'
const Schedule = () => {
  const [num, setNum] = useState(0)
  const btnRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      setNum(1)
    }, 1000)
    // 会先显示2，在显示3，如果将第二个的setTimeOut时间放大，会先显示1，然后显示3
    setTimeout(() => {
      btnRef.current.click()
    }, 1100) 
  }, [])
  return <>
  <button onClick={() => setNum(pre =>  pre + 2)} ref={btnRef}>Add</button>
  {
    Array.from({ length: 5000}).map(() => {
      return <sapn>{num}</sapn>
    })
  }
  </>
}
export default Schedule
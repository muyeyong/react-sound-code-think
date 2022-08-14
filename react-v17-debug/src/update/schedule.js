import { useState, useRef, useEffect } from 'react'
const Schedule = () => {
  const [num, setNum] = useState(0)
  const btnRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      setNum(1)
    }, 1000)
    setTimeout(() => {
      btnRef.current.click()
    }, 1006) 
  }, [])
  return <>
  <button onClick={() => setNum(pre =>  pre + 2)} ref={btnRef}>Add</button>
  {
    Array.from({ length: 100}).map(() => {
      return <span>{num}</span>
    })
  }
  </>
}
export default Schedule
import { useState } from 'react'

const Diff = () => {
  const [num, setNum] = useState(0)
  const a = (
    <ul>
      <li key='1'>1</li>
      <li key='2'>2</li>
    </ul>
  )
  const b = (
    <ul>
      <li key='2'>2</li>
      <li key='1'>1</li>
    </ul>
  )
  return <>
  <div onClick={() => setNum(pre => pre + 1)}>
      { num % 2 === 0 ? a : b}
    </div>
  </>
}

export default Diff
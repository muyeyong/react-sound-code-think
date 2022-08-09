import { useState } from 'react'
const Diff = () => {
  const [num, setNum] = useState(0)
  const a = (
    <ul>
      <li key= '1'>One</li>
      <li key= '2'>Tow</li>
    </ul>
  )
  const b = (
    <ul>
      <p key='1'>PPP</p>
    </ul>
  )
  return <div onClick={() => setNum(pre => pre + 1)}>
    { num % 2 === 0? a : b}
  </div>
}
export default Diff
import { useState } from 'react'

const  UpdateBase = () => {
  const [num, setNum] = useState(0)
  return <>
  <button onClick={() => setNum(pre => pre + 1)}>
    {num}
  </button>
  </>
}

export default UpdateBase
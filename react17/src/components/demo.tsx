import React, { useCallback, useEffect, useState } from 'react'

// export const Demo = () => {
//   const [v, setValue] = useState(0)

//   // useEffect(()=>{
//   //   setValue(v + 1)
//   //   setValue(v +  1)
//   //   console.log(v)
//   //   setValue(() => {
//   //     setValue(v + 1)
//   //     setValue(v + 1)
//   //   })
//   // },[v])

//   // const handleEvent = useCallback(() => {
//   //   setValue(v+ 1)
//   //   setValue(v+ 1)
//   //   console.log(1,v)
//   //   setValue(v => v + 1)
//   //   setValue(v => v + 1)
//   //   console.log(2,v)
//   // },[v])

//   const handleEvent = useCallback(() => {
//     setTimeout(() => {
//       setValue(v+ 1)
//       setValue(v+ 1)
//       console.log(1,v)
//       setValue(v => v + 1)
//       setValue(v => v + 1)
//       console.log(2,v) 
//     });
//   },[v])
//   return <div>
//     <div>{v}</div>
//     <div>{React.version}</div>
//     <button onClick={handleEvent}>点击事件</button>
//   </div>
// }

class Demo extends React.Component {
  state = {
    data: 1
  }

  constructor(){
    super()
  }

  test = () => {
    setTimeout(() => {
      this.setState({data: 2});
      console.log('data', this.state.data);
      this.setState({data: 3});
      console.log('data', this.state.data);
    }, 0);
  }

  render() {
    console.log("render");
    return (
      <div>
        <div>{this.state.data}</div>
        <button onClick={this.test}>点击事件{React.version}</button>
      </div>
    )
  }
}

export { Demo }
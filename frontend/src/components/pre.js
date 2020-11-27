import React, { useState, useEffect } from 'react'

const Pre = (props) => {
  const [jsonTreeData, setQwerty] = useState([])

  useEffect(() => {
    setQwerty(props.treeData)
  }, [props])

  const divStyle = {
    height: '800px',
    padding: '20px',
    marginTop: '200px',
    overflowY: 'auto',
  }
  return (
    <div style={divStyle}>
      <pre>{JSON.stringify(jsonTreeData, null, 2)}</pre>
    </div>
  )
}

export default Pre

import React, { useState, useEffect } from 'react'

const Pre = ({ treeData }) => {
  const [jsonTreeData, setJsonTreeData] = useState([])

  useEffect(() => {
    setJsonTreeData(treeData)
  }, [treeData])

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

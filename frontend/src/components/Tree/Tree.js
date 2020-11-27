import React, { useState, useMemo } from 'react'
import Pre from './../pre'
import styles from './Tree.module.css'
import { Button, Tree, Dialog } from 'element-react'

function getTreeData() {
  return [
    {
      id: 1,
      label: 'level one 1',
      children: [
        {
          id: 4,
          label: 'level two 1-1',
          children: [
            {
              id: 9,
              label: 'level three 1-1-1',
            },
            {
              id: 10,
              label: 'level three 1-1-2',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: 'level one 2',
      children: [
        {
          id: 5,
          label: 'level two 2-1',
        },
        {
          id: 6,
          label: 'level two 2-2',
        },
      ],
    },
    {
      id: 3,
      label: 'level one 3',
      children: [
        {
          id: 7,
          label: 'level two 3-1',
        },
        {
          id: 8,
          label: 'level two 3-2',
        },
      ],
    },
  ]
}

const TreeComponent = () => {
  let id = 100

  const [treeData, setTreeData] = useState(() => {
    return getTreeData()
  })

  const [form, setForm] = useState({
    attr: '',
    value: '',
  })

  const [visibleDialog, setVisibleDialog] = useState(false)

  const [dialogTitle, setDialogTitle] = useState('')

  const [currentObj, setCurrentObj] = useState({})

  const append = (node, data) => {
    const newChild = {
      id: id++,
      label: `testtest_${id}`,
      children: [],
    }
    if (!data.children) {
      Object.assign(data, {
        children: [],
      })
    }

    data.children.push(newChild)
    setTreeData(node.store.data)
    node.store.append(newChild, data)
  }

  const remove = (node, data) => {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex(
      (d) => d.id === data.id
    )
    children.splice(index, 1)

    setTreeData(node.store.data)
    node.store.remove(data)
  }

  const edit = (node, data) => {
    setCurrentObj(data)
    setDialogTitle(data.label)
    setVisibleDialog(true)
  }

  const submitForm = () => {
    setCurrentObj((prevCurrentObj) => {
      return Object.assign(prevCurrentObj, {
        [form.attr]: form.value,
      })
    })
    resetForm()
    setVisibleDialog(false)
  }

  const closeDialog = () => {
    resetForm()
    setVisibleDialog(false)
  }

  const resetForm = () => {
    setForm({
      attr: '',
      value: '',
    })
  }

  const renderContent = (node, data) => {
    return (
      <span>
        <span>
          <span>{data.label}</span>
        </span>
        <span
          style={{ float: 'right', marginRight: '20px' }}
        >
          <Button
            size='mini'
            type='success'
            onClick={() => {
              append(node, data)
            }}
          >
            Добавить
          </Button>
          <Button
            size='mini'
            type='danger'
            onClick={() => remove(node, data)}
          >
            Удалить
          </Button>
          <Button
            size='mini'
            type='primary'
            onClick={() => {
              edit(node, data)
            }}
          >
            Изменить
          </Button>
        </span>
      </span>
    )
  }

  return (
    <div className={styles.main}>
      <Tree
        className={styles.tree}
        data={treeData}
        nodeKey='id'
        defaultExpandAll={true}
        expandOnClickNode={false}
        renderContent={(...args) => renderContent(...args)}
        emptyText='Данные отсутсвуют'
      />
      <Pre treeData={treeData} />
      <div>
        <Dialog
          title={dialogTitle}
          size='tiny'
          visible={visibleDialog}
          onCancel={closeDialog}
          lockScroll={false}
        >
          <Dialog.Body>
            <div className={styles.new_attr}>
              <form className={styles.form}>
                <div>
                  <div className={styles.form_field}>
                    <label>Атрибут</label>

                    <input
                      value={form.attr}
                      placeholder='Введите название атрибута'
                      onChange={(e) =>
                        setForm({
                          attr: e.target.value,
                        })
                      }
                    ></input>
                  </div>

                  <div className={styles.form_field}>
                    <label>Значение</label>
                    <input
                      value={form.value}
                      placeholder='Введите значение атрибута'
                      onChange={(e) =>
                        setForm((prev) => {
                          return {
                            ...prev,
                            value: e.target.value,
                          }
                        })
                      }
                    ></input>
                  </div>
                </div>
              </form>
            </div>
          </Dialog.Body>
          <Dialog.Footer className='dialog-footer'>
            <Button onClick={closeDialog}>Отменить</Button>
            <Button
              type='primary'
              nativeType='submit'
              onClick={submitForm}
            >
              Добавить
            </Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    </div>
  )
}

export default TreeComponent

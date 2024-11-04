import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, InputNumber, Modal, Row, Space, Spin, Tooltip, Typography } from 'antd'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import TextArea from 'antd/es/input/TextArea'
import { useAuthContext } from 'contexts/AuthContext'



const { Title } = Typography
export default function ShowProducts() {
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [deleteProcessingId, setDeleteProcessingId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [form] = useForm()
  const { payload } = useAuthContext()


  const { user } = payload

  const fetchDocuments = async () => {
    setIsLoading(true)
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const array = []
      querySnapshot.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        // doc.data() is never undefined for query doc snapshots
        console.log(data);
        array.push(data)
      });
      setProducts(array)
    } catch (err) {
      console.error(err)
      window.notify("error loading products", "error")
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDocuments()
  }, [])


  const handleDelete = async (item) => {
    setDeleteProcessingId(item.id)
    try {
      await deleteDoc(doc(firestore, "products", item.id));
      setProducts(products.filter((product) => product.id !== item.id))
      window.notify("product deleted successfully", "success")
    } catch (err) {
      console.error(err)
      window.notify("something went wrong while deleting product", "error")
    }
    setDeleteProcessingId(null)
  }

  const handleEdit = (item) => {
    setProduct(item)
    setModalOpen(true)
    console.log(item)
  }

  const handleChange = e => setProduct(s => ({ ...s, [e.target.name]: e.target.value }))
  const handlePriceChange = value => setProduct(s => ({ ...s, price: value }))


  const handleUpdate = async () => {
    let updatedProduct = { ...product }

    updatedProduct.dateModified = serverTimestamp()
    updatedProduct.modifiedBy = {
      email: user.email,
      uid: user.uid
    }

    try {
      await setDoc(doc(firestore, "products", updatedProduct.id), updatedProduct);
      let newDocuments = products.map((doc) => {
        if (product.id === doc.id)
          return updatedProduct
        return doc
      })
      setProducts(newDocuments)
      window.notify("product updated successfully", "success")
    } catch (err) {
      console.error(err)
      window.notify("error occured while updating product", "error")
    }
    setModalOpen(false)
  }

  return (
    <>
      <div className='container'>
        <Row>
          <Col span={24} >
            <Card className='products-card my-5'>
              <Row justify={'center'}>
                <Col >
                  <Title className='text-center mb-0'>Products</Title>
                </Col>
              </Row>
              <Row justify={'center'} className='mt-4 mb-2'>
                <Col span={24}>
                  {isLoading
                    ? <div className='text-center'><Spin tip="Loading" size="large"></Spin></div>
                    : <Table className='w-100'>
                      <Thead>
                        <Tr className='text-center'>
                          <Th>Sr No.</Th>
                          <Th>Title</Th>
                          <Th>Location</Th>
                          <Th>Description</Th>
                          <Th>price ($)</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          products.map((item, i) => {
                            const { title, location, description, price } = item
                            return <Tr key={i} className='text-center'>
                              <Td>{i + 1}</Td>
                              <Td>{title}</Td>
                              <Td>{location}</Td>
                              <Td>{description}</Td>
                              <Td>{price}</Td>
                              <Td>{
                                <>
                                  <Space>
                                    <Tooltip title='Edit'><Button type='primary' icon={<EditOutlined />} onClick={() => { handleEdit(item) }}></Button></Tooltip>
                                    {
                                      deleteProcessingId === item.id
                                        ? <Button type='primary' danger icon={<LoadingOutlined />}  ></Button>
                                        : <Tooltip title='Delete'>
                                          <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => { handleDelete(item) }}></Button>
                                        </Tooltip>
                                    }
                                  </Space>
                                </>
                              }</Td>
                            </Tr>

                          })
                        }
                      </Tbody>
                    </Table>
                  }
                </Col>
              </Row>

            </Card>
          </Col>
        </Row>

      </div >

      <Modal
        // style={{
        //   top: 20,
        // }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Row justify={'center'} gutter={[16, 16]}>
          <Col>
            <Title level={2} className='mb-4 text-center'>Update Product</Title>
            <Form form={form} onFinish={handleUpdate}>
              <Row gutter={16}>
                <Col xs={24} lg={12}>
                  <Form.Item>
                    <Input name='title' placeholder='Title' value={product.title} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Form.Item>
                    <Input name='location' placeholder='Location' value={product.location} onChange={handleChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <TextArea name='description' style={{ resize: "none" }} placeholder='Description' value={product.description} onChange={handleChange} ></TextArea>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item>
                    <InputNumber name='price' className='w-100' placeholder='price in $' value={product.price} onChange={handlePriceChange}></InputNumber>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={'center'}>
                <Col>
                  <Button type='primary' htmlType='submit'>Update Product</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

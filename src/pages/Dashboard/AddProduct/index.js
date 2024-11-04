import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, InputNumber, Row, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/es/form/Form'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { LoadingOutlined } from '@ant-design/icons'

const { Title } = Typography
const initialState = { title: "", location: "", description: "", price: "" }

export default function AddProduct() {
  const [formData, setformData] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [form] = useForm()
  const { payload } = useAuthContext()

  const { user } = payload

  const handleChange = e => setformData(s => ({ ...s, [e.target.name]: e.target.value }))
  const handlePriceChange = value => setformData(s => ({ ...s, price: value }))

  const handleSubmit = () => {

    let { title, location, description, price } = formData

    title = title.trim()
    location = location.trim()
    description = description.trim()

    if (title.length < 3) {
      return window.notify("please enter title atleat 3 characters", "error")
    }
    if (location.length < 3) {
      return window.notify("please enter location atleat 3 characters", "error")
    }
    if (description.length < 10) {
      return window.notify("please enter description atleat 10 characters", "error")
    }
    if (!price || price <= 0) {
      return window.notify("please enter price correctly", "error")
    }


    let product = { title, location, description, price }
    product.id = window.getRandomId()
    product.dateCreated = serverTimestamp()
    product.createdBy = {
      email: user.email,
      uid: user.uid
    }
    addDocument(product)
  }

  const addDocument = async (product) => {
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "products", product.id), product);
      window.notify("product added successfully", "success")
      console.log(product)
    } catch (error) {
      console.error(error)
      window.notify("something went wrong while adding product", "error")
    } finally {
      setformData(initialState)
      form.resetFields()
      setIsProcessing(false)
    }
  }

  return (
    <div className='container'>
      <Row className='card-center'>
        <Col>
          <Card className='card'>
            <Row gutter={[16, 16]}>
              <Col>
                <Title level={2} className='mb-4 text-center'>Add Product</Title>
                <Form form={form} onFinish={handleSubmit}>
                  <Row gutter={16}>
                    <Col xs={24} lg={12}>
                      <Form.Item name="title">
                        <Input name='title' placeholder='Title' value={formData.title} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} lg={12}>
                      <Form.Item name="location">
                        <Input name='location' placeholder='Location' value={formData.location} onChange={handleChange} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item>
                        <TextArea name='description' style={{ resize: "none" }} placeholder='Description' value={formData.description} onChange={handleChange} ></TextArea>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item >
                        <InputNumber name='price' className='w-100' placeholder='price in $' value={formData.price} onChange={handlePriceChange}></InputNumber>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item >
                        <Input type='file' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item>{
                        !isProcessing
                          ? <Button type='primary' htmlType='submit' block>Add Product</Button>
                          : <Button type='primary' className='custom-disabled-button' disabled={true} icon={<LoadingOutlined />} block>Add Product</Button>
                      }
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

    </div>
  )
}

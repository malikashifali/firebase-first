import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography, } from 'antd'
import {LoadingOutlined} from "@ant-design/icons"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from 'config/firebase'

const { Title, Text } = Typography

const initialState = { email: "", Password: "" }

export default function Login() {
    const [formData, setFormData] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    const { email, password } = formData


    const handleChange = e => setFormData(s => ({ ...s, [e.target.name]: e.target.value }))


    const handleLogin = () => {
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch({ type: "SET_LOGGED_IN", payload: { user } },)
                window.notify("successfully signed in", "success")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                window.notify(errorMessage, "error")
            });
        setIsProcessing(false)
    }
    return (
        <div className='container-fluid auth'>
            <Row>
                <Col>
                    <Card className='border-0 text-center auth-card'>
                        <Row>
                            <Col xs={24} lg={12} className='p-4 bg-light rounded-start-2'>
                                <Row justify={'center'}>
                                    <Col> <Title level={3}>Welcome Back!</Title></Col>
                                </Row>
                                <Row justify={'center'}>
                                    <Col>
                                        <Text className=''>Sign in to your account</Text>
                                    </Col>
                                </Row>
                                <Row justify={'center'}>
                                    <Col>
                                        <Form onFinish={handleLogin}>
                                            <Row justify={'center'} style={{ marginBottom: "-12px" }}>
                                                <Col span={24}>
                                                    <Form.Item name="email" className='mt-4'>
                                                        <Input name='email' placeholder='Enter Email' value={email} onChange={handleChange} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginBottom: "-22px" }}>
                                                <Col>
                                                    <Form.Item name="password">
                                                        <Input.Password name='password' placeholder='Enter Password' value={password} onChange={handleChange} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Link to="/auth/forgot-password" className='text-last text-decoration-none' style={{ fontSize: "10px" }}>Forgot Password?</Link>
                                                </Col>
                                            </Row>
                                            <Row justify={'center'}>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        {
                                                            !isProcessing
                                                                ? <Button Button block type='primary' style={{ marginTop: "10px" }} htmlType='submit'>SIGN IN</Button>
                                                                : <Button Button block disabled={true} icon={<LoadingOutlined spin />} type='primary' style={{ marginTop: "10px" }} htmlType='submit'></Button>
                                                        }
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} lg={12} className='p-4 d-flex flex-column justify-content-center align-items-center bg-info rounded-end-2'>
                                <Title level={2} className='d-block text-light'>New Here?</Title>
                                <Text className='d-block mb-4 text-light'>Create an account to start using the service.</Text>
                                <Button onClick={() => { navigate("/auth/register") }}>SIGN UP</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col >
            </Row >
        </div >
    )
}
import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore/lite'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { LoadingOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

export default function Register() {
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()
    const [form] = useForm()
    const [isProcessing, setIsProcessing] = useState(false)
    const { dispatch } = useAuthContext()


    const handleChange = e => setFormData(s => ({ ...s, [e.target.name]: e.target.value }))

    const { fullName, email, password, confirmPassword } = formData

    const handleSignUp = () => {


        if (fullName < 3) {
            return window.notify("please enter full name correctly", "error")
        }
        if (!window.isValidEmail(email)) {
            return window.notify("please enter email correctly", "error")
        }
        if (!window.isValidPassword(password)) {
            return window.notify("please enter password correctly", "error")
        }
        if (password !== confirmPassword) {
            return window.notify("password don't match try again", "error")
        }

        formData.dateCreated = serverTimestamp()
        formData.status = "active"
        formData.role = "customer"

        // console.log(formData)
        // console.log(email)
        setIsProcessing(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user)
                // console.log(user.uid)
                addDocument(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                form.resetFields()
                setIsProcessing(false)
                console.log(errorCode)
                window.notify(errorMessage, "error")
                // ..
            });

        const addDocument = async (user) => {

            try {
                await setDoc(doc(firestore, "users", user.uid), {
                    name: fullName,
                    email: email,
                    uid: user.uid,
                });
                dispatch({ type: "SET_LOGGED_IN", payload: { user } })
                window.notify("user sign up successfully", "success")
            } catch (err) {
                console.error(err)
                window.notify(err.message, "error")
            }
            form.resetFields()
            setIsProcessing(false)
        }
    }

    return (
        <div className='container-fluid auth'>
            <Row>
                <Col>
                    <Card className='border-0 text-center auth-card'>
                        <Row>
                            <Col xs={24} md={12} className='p-4 d-flex flex-column justify-content-center align-items-center bg-light custom-rounded-start'>
                                <Form form={form} onFinish={handleSignUp}>
                                    <Title level={2}>Welcome</Title>
                                    <Text className=''>Sign Up to new Account</Text>
                                    <Form.Item name="fullName" className='mt-4 mb-3'>
                                        <Input name='fullName' placeholder='Full Name' value={fullName} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item name="email" className='mb-3'>
                                        <Input name='email' placeholder='Email' value={email} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item name="password" className='mb-3'>
                                        <Input.Password name='password' placeholder='Password' value={password} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item name="confirmPassword">
                                        <Input.Password name='confirmPassword' placeholder='Confrim Password' value={confirmPassword} onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item>
                                        {
                                            !isProcessing
                                                ? <Button type='primary' htmlType='submit'>SIGN UP</Button>
                                                : <Button type='primary' className="custom-disabled-button" disabled={true} icon={<LoadingOutlined />}>SIGN UP</Button>
                                        }
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col xs={24} md={12} className='p-4 d-flex flex-column justify-content-center align-items-center bg-info custom-rounded-end'>
                                <Title level={2} className='d-block text-light'>Already Have An Account?</Title>
                                <Text className='d-block mb-4 text-light'>Sign In to your account</Text>
                                <Button onClick={() => { navigate("/auth/login") }}>SIGN IN</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
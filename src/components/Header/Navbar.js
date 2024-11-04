import React from 'react'
import { Button, Space } from 'antd'
import { useAuthContext } from 'contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { DashboardOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons"
import { signOut } from 'firebase/auth'
import { auth } from 'config/firebase'




export default function Navbar() {
    const navigate = useNavigate()
    const { isAuthenticated, payload, dispatch } = useAuthContext()

    const handleLogin = () => {
        navigate("/auth/login")
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch({ type: "SET_LOGGED_OUT" })
            window.notify("signed out sucessfully", "success")
        }).catch((error) => {
            console.error(error)
            window.notify(error.message)
        });

    }
    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">KM Production</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header bg-secondary">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">KM Production</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body bg-primary">
                        <ul className="navbar-nav justify-content-start align-items-start align-items-lg-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard/add-product" className="nav-link">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboard/show-products" className="nav-link">Products</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            {!isAuthenticated
                                ? <Space>
                                    <Button type='primary' icon={<LoginOutlined />} onClick={handleLogin}>Login</Button>
                                </Space>
                                : <>
                                    <Space>
                                        <Button type='primary' icon={<DashboardOutlined />} danger><Link to="/dashboard" className='text-decoration-none'>Dashboard</Link></Button>
                                        <Button type='primary' icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
                                    </Space>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

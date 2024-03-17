import React from 'react'
import {
    HomeOutlined,
    DiffOutlined,
    TeamOutlined,
    CompassOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd';
import '@/pages/SkiLayout/index.scss'
import { Outlet,useNavigate } from 'react-router-dom';


export default function SkiLayout() {

    const { Header, Footer, Content } = Layout;

    const items = [
        {
            label: 'Home',
            key: '/',
            icon: <HomeOutlined style={{color:'black'}}/>,
        },
        {
            label: 'About',
            key: '/about',
            icon: <DiffOutlined style={{color:'black'}}/>,
        },
        {
            label: 'Contact us',
            key: '/contact',
            icon: <TeamOutlined style={{color:'black'}}/>,
        },
        {
            label: 'Piste Map',
            key: '/map',
            icon: <CompassOutlined style={{color:'black'}}/>
        }
    ]

    const navigate = useNavigate()

    const onMeunClick = (route) => {
        console.log(route)
        const path = route.key
        navigate(path)
    }

    return (
        <div>
            <Layout >
                <Header className='layout-header '>
                    <div className="logo" />
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items}
                        className='layout-menu'
                        onSelect={onMeunClick}
                    />
                </Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer
                    className='layout-footer'
                >
                    SKI Website ©{new Date().getFullYear()} Created by Group 11
                </Footer>
            </Layout>
        </div>
    )
}

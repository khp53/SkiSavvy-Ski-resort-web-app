import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { MapContainer } from 'react-leaflet';
import MapWithGraph from './components/MapWithGraph';
import ChooseSlopeDifficulty from '@/pages/Map/components/ChooseSlopeDifficulty'
import { Select, Button, Modal } from 'antd';


const Map = () => {

    //need use API send to the backend
    const [customerDifficulty, setCustomerDifficulty] = useState([])

    const [showChoose, setShowChoose] = useState(false)

    //need use API send to the backend
    const [strategyChoice, setStrategyChoice] = useState()

    const [isStartPointModalOpen, setIsStartPointModalOpen] = useState(false);

    const [isEndPointModalOpen, setIsEndPointModalOpen] = useState(false)

    const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false)


    const chooseDifficulty = (data) => {
        setCustomerDifficulty(data)
    }

    const isDifficultyFinish = (data) => {
        setIsStartPointModalOpen(data)
    }

    const isSelectStartPointFinish = (data) => [
        setIsEndPointModalOpen(data)
    ]

    const isSelectEndPointFinish = (data) => [
        setIsStrategyModalOpen(data)
    ]

    useEffect(() => {
        if (customerDifficulty.length > 0) {
            setShowChoose(true)
        }
    }, [customerDifficulty])



    const option = [
        {
            value: 'shortest',
            label: 'Shortest Route',
        },
        {
            value: 'quickest',
            label: 'Quickest Route',
        },
        {
            value: 'easiest',
            label: 'Easiest Route',
        },
        {
            value: 'minimal',
            label: 'Minimal Lift Usage',
        },
    ]

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setStrategyChoice(value)
    };

    const handleClick = () => {
        //using API put the strategyChoice to the backend

    }

    const handleStartPointOk = () => {
        setIsStartPointModalOpen(false)
    }

    const handleEndPointOk = () => {
        setIsEndPointModalOpen(false)
    }

    const handleStrategyOk = () => {
        setIsStrategyModalOpen(false)
    }


    return (
        <div>
            <ChooseSlopeDifficulty chooseDifficulty={chooseDifficulty} isDifficultyFinish={isDifficultyFinish} />
            <Row justify='space-around'>
                <Col xs={22} sm={22} md={16} lg={16}>
                    <MapContainer center={[66, 375]} zoom={2} style={{ height: '600px', width: '100%' }}>
                        <MapWithGraph isSelectStartPointFinish={isSelectStartPointFinish} isSelectEndPointFinish={isSelectEndPointFinish} />
                    </MapContainer>
                </Col>
                <Col xs={18} sm={18} md={6} lg={6}>
                    {showChoose ?
                        <h4 style={{ marginTop: '3vw', marginBottom: '4vw' }}>
                            Your choose is :
                            {customerDifficulty.map((item) => {
                                return (<span style={{ color: `${item}` }}>{item}! </span>)
                            })}
                            slope!
                        </h4>
                        :
                        ''}
                    <h4>Choose a route option:</h4>
                    <Select
                        placeholder='Select your prefer'
                        style={{
                            width: '18vw',
                            marginTop: '0.5vw',
                            marginBottom: '1.5vw',
                        }}
                        onChange={handleChange}
                        options={option}
                    />
                    <Button type="primary" style={{ width: '18vw' }} onClick={handleClick}>Calculate Route</Button>
                </Col>

            </Row>
            <Modal title="Select Start Point" open={isStartPointModalOpen} onOk={handleStartPointOk} onCancel={handleStartPointOk} centered={true}>
                <p>Select one point from the map!</p>
            </Modal>
            <Modal title="Select End Point" open={isEndPointModalOpen} onOk={handleEndPointOk} onCancel={handleEndPointOk} centered={true}>
                <p>Select one point from the map!</p>
            </Modal>
            <Modal title="Choose a Route Option" open={isStrategyModalOpen} onOk={handleStrategyOk} onCancel={handleStrategyOk} centered={true}>
                <p>Select one strategy from the drop-down box!</p>
            </Modal>
        </div>



    );
};

export default Map;

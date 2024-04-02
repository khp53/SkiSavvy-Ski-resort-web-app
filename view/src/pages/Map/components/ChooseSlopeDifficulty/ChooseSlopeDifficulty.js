import React, { useState, useEffect } from 'react';
import { Modal, Button, Radio } from 'antd';
import '@/pages/Map/components/ChooseSlopeDifficulty/index.scss'

export default function ChooseSlopeDifficulty() {
    const [visible, setVisible] = useState(false);
    const [difficulty, setDifficulty] = useState(null);

    useEffect(() => {
        setVisible(true);
        console.log('aaaaa')
    }, []);

    const handleOk = () => {
        console.log('Selected difficulty:', difficulty);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleChange = e => {
        setDifficulty(e.target.value);
    };
    return (
        <Modal
            title="Select Snow Trail Difficulty"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            className='difficulty-slope'
        >
            <Radio.Group onChange={handleChange} value={difficulty}>
                <Radio value="green" style={{color:'green'}}>green</Radio>
                <Radio value="blue" style={{color:'blue'}}>blue</Radio>
                <Radio value="black" style={{color:'black'}}>black</Radio>
            </Radio.Group>
        </Modal>
    )
}

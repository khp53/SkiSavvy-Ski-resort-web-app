import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox } from 'antd';
import '@/pages/Map/components/ChooseSlopeDifficulty/index.scss'

export default function ChooseSlopeDifficulty({chooseDifficulty,isDifficultyFinish}) {
    const [visible, setVisible] = useState(false);
    const [difficulty, setDifficulty] = useState([]);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleOk = () => {
        console.log('Selected difficulty:', difficulty);
        setVisible(false);
        chooseDifficulty(difficulty);
        isDifficultyFinish(true)
    };

    const handleCancel = () => {
        setVisible(false);
        isDifficultyFinish(true)
    };

    const handleChange = e => {
        setDifficulty(e);
        console.log(e)
    };
    return (
        <Modal
            title="Select Snow Trail Difficulty"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            className='difficulty-slope'
        >
            <Checkbox.Group onChange={handleChange}>
                <Checkbox value="green" style={{color:'green'}}>green</Checkbox>
                <Checkbox value="blue" style={{color:'blue'}}>blue</Checkbox>
                <Checkbox value="black" style={{color:'black'}}>black</Checkbox>
            </Checkbox.Group>
        </Modal>
    )
}

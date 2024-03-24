import React, { useEffect, useState } from 'react'
import { getMapSlopeAPI } from "@/api/map"
import { Cascader, Col, Row, Button } from 'antd';
import ChooseSlopeDifficulty from './components/ChooseSlopeDifficulty/ChooseSlopeDifficulty'
import '@/pages/Map/index.scss'

export default function Map() {

  const [slopeList, setSlopeList] = useState([])
  const [viewSlopeList, setViewSlopeList] = useState(false)

  const getSlopesList = async () => {
    const res = await getMapSlopeAPI()
    setSlopeList(res.data.data.edges)
    setViewSlopeList(true)
  }

  const options = [
    {
      value: 'easiestRoute',
      label: 'Easiest route',
    },
    {
      value: 'fastestRoute',
      label: 'Fastest route',
    },
    {
      value: 'scenicRoute',
      label: 'Scenic route',
    },
    {
      value: 'miniumLiftUsage',
      label: 'minimum lift usage',
    },
    {
      value: 'longestRoute',
      label: 'Longest route',
    },
  ];

  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h2 style={{ margin: '2rem 5rem' }}>Piste Map</h2>
      <button onClick={getSlopesList}>get slopes</button>
      <ChooseSlopeDifficulty />




      <Row gutter={24}>

        <Col span={16} style={{ paddingLeft: '15rem' }}>
          {viewSlopeList &&
            <h3>
              {slopeList.map((item) => <p key={item.id}>{item.name}</p>)}
            </h3>
          }

        </Col>

        <Col span={8} style={{ paddingLeft: '10rem' }} className='col2'>
          <Cascader options={options} onChange={onChange} placeholder="select option" style={{ marginBottom: '2rem', width: '15rem' }} />
          <Button type="primary" style={{ width: '15rem' }}>Calculate Route</Button>
        </Col>

      </Row>
    </div>

  )
}


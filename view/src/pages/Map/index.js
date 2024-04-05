import { Col, Row, Checkbox, Tour, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer } from 'react-leaflet';
import MapWithGraph from './components/MapWithGraph';
import { Select, Button } from 'antd';
import { fetchCalculatedRoute } from '@/api/map';
import { sendSelections } from '@/api/map';
import { current } from '@reduxjs/toolkit';
import { set } from 'mongoose';


const Map = () => {

  //need use API send to the backend
  const [difficulty, setDifficulty] = useState([]);

  //need use filter search the same strategy from the back data
  const [strategyChoice, setStrategyChoice] = useState(null)

  //startNodeId in the Map component
  const [startNodeId, setStartNodeId] = useState(null);
  // start node title
  const [startNodeTitle, setStartNodeTitle] = useState(null);
  // start node latLng
  const [startNodeLatLng, setStartNodeLatLng] = useState([]);

  //endNodeId in the Map component
  const [endNodeId, setEndNodeId] = useState(null);
  // end node title
  const [endNodeTitle, setEndNodeTitle] = useState(null);
  // end node latLng
  const [endNodeLatLng, setEndNodeLatLng] = useState([]);

  const [open, setOpen] = useState(false);

  //control 3 step
  const [step, setStep] = useState(1);

  //alert no startpoint or endpoint
  const [messageApi, contextHolder] = message.useMessage()

  //get the customer start point from the son component (MapWithGraph)
  const getStartNodeId = (data) => [
    setStartNodeId(data)
  ]
  // get the start node title and latLng
  const getStartNodeTitleAndLatLng = (title, latLng) => {
    setStartNodeTitle(title);
    setStartNodeLatLng(latLng);
  }

  //get the customer end point from the son component (MapWithGraph)
  const getEndNodeId = (data) => [
    setEndNodeId(data)
  ]
  // get the end node title and latLng
  const getEndNodeTitleAndLatLng = (title, latLng) => {
    setEndNodeTitle(title);
    setEndNodeLatLng(latLng);
  }

  //4 strategy in the pull down
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

  //get customer prefer strategy
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStrategyChoice(value)
  };

  //verify is valid (already select start and end point or not, is valid then to the step2)
  const handleClick = async () => {
    if (startNodeId === null || endNodeId === null) {
      messageApi.open({
        type: 'warning',
        content: 'Please select the start point or the end point!',

      });
      return
    }

    //using API put the start end point to the backend

    try {
      const bodyData = {
        "start": {
          "id": startNodeId,
          "title": startNodeTitle,
          "latLng": startNodeLatLng
        },
        "end": {
          "id": endNodeId,
          "title": endNodeTitle,
          "latLng": endNodeLatLng
        },
        "profile": {
          "difficulty": difficulty
        }
      };
      const data = await sendSelections(bodyData);
      console.log('response data:', data);
      //get the data then give the data to the MapWithGraph replace the graphData1 in the MapWithGraph component
      try {
        const routes = await fetchCalculatedRoute();
        //setData(data);
        console.log(routes);
        //the go to the step 2
        setStep(2)
      } catch (error) {
        alert('Error fetching data:', error);
      }
    } catch (error) {
      alert('Error sending data:', error);
    }
  }


  //verify already select one strategy or not, if vaild then to the step3 description the route
  const handleClick2 = () => {
    if (strategyChoice === null) {
      messageApi.open({
        type: 'warning',
        content: 'Please select one strategy you prefer!',
      });
      return
    }
    //use API put the strategy to the backend (or use filter from the back data)
    //get the data then to the step 3



    setStep(3)
  }


  const handleClick3 = () => {
    setStep(1)
    //setStrategyChoice(null)
  }

  const handleClick4 = () => {
    setStep(2)
  }

  //reset button, clear all include the son component's(MapWithGraph) start and end point
  const handleClick5 = () => {
    setStep(1)
    setStartNodeId(null)
    setEndNodeId(null)
    resetStartPoint()
    resetEndPoint()
    setDifficulty([])
    setStrategyChoice(null)
  }

  //get the difficulty
  const handleDifficutyChange = e => {
    setDifficulty(e);
    console.log(e)
  };

  const childRef = useRef();

  //use this function can clear the start point both the Map and MapWithGraph
  const resetStartPoint = () => {
    childRef.current.resetStart();
    setStartNodeId(null)
    setStartNodeTitle(null)
    setStartNodeLatLng(null)
  }

  //use this function can clear the end point both the Map and MapWithGraph
  const resetEndPoint = () => {
    childRef.current.resetEnd();
    setEndNodeId(null)
    setEndNodeTitle(null)
    setEndNodeLatLng(null)
  }

  //description about the Tour box
  const steps = [
    {
      title: 'Select the Start Point and reset buttom',
      description: 'You can select the start point in the map by click the node.  Also you can reset your start point.',
      //placement: 'center',
      target: () => ref1.current,
    },
    {
      title: 'Select the End Point and reset buttom',
      description: 'You can select the end point in the map by click the node.  Also you can reset your end point.',
      //placement: 'center',
      target: () => ref2.current,
    },
    {
      title: 'Select the difficultly your prefer, and click buttom for calculating',
      description: 'You can choose easy(blue line) medium(red line) and hard(black line). It is multiple choice, then click the calculate route buttom will show you all the possible routes.',
      //placement: 'center',
      target: () => ref3.current,
    },
    // {
    //     title: 'Select the strategy you prefer',
    //     description: 'After calculate route, you can choose one strategy that you prefer, and it will show the differernt color route on the map.',
    //     //placement: 'center',
    //     target: () => ref4.current,
    // },
  ];

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  //const ref4 = useRef(null);

  // Open Tour box
  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div>
      {/* <ChooseSlopeDifficulty chooseDifficulty={chooseDifficulty} isDifficultyFinish={isDifficultyFinish} /> */}
      <Row justify='space-around'>
        <Col xs={22} sm={22} md={16} lg={16}>
          <MapContainer center={[66, 375]} zoom={2} style={{ height: '40vw', width: '100%' }}>
            <MapWithGraph
              getStartNodeId={getStartNodeId}
              getEndNodeId={getEndNodeId}
              getStartNodeTitleAndLatLng={getStartNodeTitleAndLatLng}
              getEndNodeTitleAndLatLng={getEndNodeTitleAndLatLng}
              ref={childRef}
            />
          </MapContainer>
        </Col>
        <Col xs={18} sm={18} md={6} lg={6}>
          {
            step === 1 &&
            <div>
              <div style={{ marginTop: '4vw', marginBottom: '1vw' }}>
                <Checkbox checked={startNodeId !== null ? true : false} style={{ marginLeft: '4vw', marginRight: '4vw' }}>Start Point</Checkbox>
                <Checkbox checked={endNodeId !== null ? true : false} >End Point</Checkbox>
              </div>
              <div style={{ marginBottom: '4vw' }}>
                <Button ref={ref1} value="small" style={{ marginLeft: '5vw' }} onClick={resetStartPoint}>Reset</Button>
                <Button ref={ref2} value="small" style={{ marginLeft: '5vw' }} onClick={resetEndPoint}>Reset</Button>
              </div>
              <Checkbox.Group value={difficulty} onChange={handleDifficutyChange} style={{ marginLeft: '6vw', marginBottom: '1vw' }}>
                <Checkbox value="blue" style={{ color: 'blue' }}>Blue</Checkbox>
                <Checkbox value="red" style={{ color: 'red' }}>Red</Checkbox>
                <Checkbox value="black" style={{ color: 'black' }}>black</Checkbox>
              </Checkbox.Group>
              <br />
              {contextHolder}
              <Button ref={ref3} type="primary" style={{ width: '18vw', marginLeft: '3vw', marginBottom: '4vw' }} onClick={handleClick}>Calculate Route</Button>
            </div>
          }
          {
            step === 2 &&
            <div style={{ marginTop: '5vw' }}>
              <h4 style={{ marginLeft: '3vw' }}>Choose a route option:</h4>
              <Select
                placeholder='Select your prefer'
                style={{
                  width: '18vw',
                  marginTop: '0.5vw',
                  marginBottom: '1.5vw',
                  marginLeft: '3vw',
                }}
                onChange={handleChange}
                options={option}
                defaultValue={strategyChoice}
              />
              <br />
              <div style={{ width: '100%', display: 'flex' }}>
                <Button style={{ marginLeft: '2vw', width: '9vw' }} onClick={handleClick3}>Previous</Button>
                {contextHolder}
                <Button type="primary" style={{ width: '9vw', marginLeft: '3vw', marginBottom: '4vw' }} onClick={handleClick2}>Search</Button>
              </div>


            </div>
          }

          {
            step === 3 &&
            <div style={{ marginTop: '5vw' }}>
              <p>
                {/* need be replace by the real description from the backend */}
                result
              </p>
              <div style={{ width: '100%', display: 'flex' }}>
                <Button style={{ marginLeft: '2vw', width: '9vw' }} onClick={handleClick4}>previous</Button>
                <Button style={{ width: '9vw', marginLeft: '3vw', marginBottom: '4vw', backgroundColor: 'green', color: 'white', }} onClick={handleClick5}>Reset all</Button>
              </div>

            </div>
          }
          {/* Tour box */}
          <Tour open={open} onClose={() => setOpen(false)} steps={steps} scrollIntoViewOptions={true}
            indicatorsRender={(current, total) => (
              <span>
                {current + 1} / {total}
              </span>
            )} />

        </Col>

      </Row>

    </div >


  );
};

export default Map;

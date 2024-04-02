import React, { useState } from 'react'
import { Carousel, Card, Col, Row, BackTop } from 'antd';
import picture1 from '@/assets/homePicture1.jpg'
import picture2 from '@/assets/homePicture2.jpg'
import picture3 from '@/assets/homePicture3.jpg'
import picture4 from '@/assets/homePicture4.jpg'
import findRestaurant from '@/assets/findRestaurant.jpg'
import calculateRoute from '@/assets/calculateRoute.jpg';
import useLift from '@/assets/useLift.jpg'
import '@/pages/Home/index.scss'
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import liftMap from '@/assets/liftMap.png'
import HomeSlide from './components/HomeSlide';

const { Meta } = Card;

export default function Home() {

  //mouse hovering on arrow icon or not
  const [isHovering, setIsHovering] = useState(false)

  const handleScrollDown = () => {
    // Here you write the scroll logic, for example using window.scrollBy or some other method
    window.scrollBy({
      top: window.innerHeight, // Or the pixel value you wish to roll down
      behavior: 'smooth' // Smooth rolling
    });
  };


  return (

    <div className='ant-card'>

      <Carousel
        autoplay={true}
        dotPosition='right'
        effect="fade"
        speed={2000}
        autoplaySpeed={5000}
        waitForAnimate={true}
        style={{ marginBottom: '5vw' }}
      >
        <HomeSlide picture={picture1} />
        <HomeSlide picture={picture2} />
        <HomeSlide picture={picture3} />
        <HomeSlide picture={picture4} />
      </Carousel>

      <h3 className='lift-map-title'>Lift Map</h3>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5vw' }}>
        <img src={liftMap} alt='liftMap' width='80%' style={{ paddingBottom: '20px', position: 'center' }}></img>
      </div>

      <h3 className='lift-map-title'>Other Functions</h3>

      <Row gutter={16} justify="space-evenly" className='three-card'>
        <Col xs={10} sm={10} md={5} lg={5}>
          <Card
            hoverable
            className='card-style'
            style={{
              width: '100%',
            }}
          >
            <div style={{width:'100%', marginBottom:'2vw'}}>
              <img src={findRestaurant}  className='card-image-style'/>
            </div>
            <div className='card-description'>Find Restaurant</div>
          </Card>

        </Col>

        <Col xs={10} sm={10} md={5} lg={5}>
        <Card
            hoverable
            className='card-style'
            style={{
              width: '100%',
            }}
          >
            <div style={{width:'100%', marginBottom:'2vw'}}>
              <img src={calculateRoute} className='card-image-style'/>
            </div>
            <div className='card-description'>Calculate Route</div>
          </Card>
        </Col>

        <Col xs={10} sm={10} md={5} lg={5}>
        <Card
            hoverable
            className='card-style'
            style={{
              width: '100%',
            }}
          >
            <div style={{width:'100%', marginBottom:'2vw'}}>
              <img src={useLift} className='card-image-style'/>
            </div>
            <div className='card-description'>Use Lift</div>
          </Card>
        </Col>
        
        <Col xs={10} sm={10} md={5} lg={5}>
          <Card
            hoverable
            className='card-style'
            style={{
              width: '100%',
            }}
          >
            <div style={{width:'100%', marginBottom:'2vw'}}>
              <img src={findRestaurant} className='card-image-style'/>
            </div>
            <div className='card-description'>Europe Street beat</div>
          </Card>
        </Col>

      </Row>

      {/* back to top */}
      <BackTop>
        <div style={{
          height: 40,
          width: 40,
          lineHeight: '40px',
          borderRadius: 4,
          color: 'gray',
          textAlign: 'center',
          fontSize: 14,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)', // Translucent background
        }}>
          <VerticalAlignTopOutlined
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)} />
        </div>
      </BackTop>
    </div >
  )
}

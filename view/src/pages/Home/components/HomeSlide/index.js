import { useState } from 'react';
import React from 'react'
import { DownOutlined } from '@ant-design/icons';
import './index.scss'

export default function HomeSlide(props) {

    console.log(props)

    // mouse hovering on arrow icon or not
    const [isHovering, setIsHovering] = useState(false)

    const handleScrollDown = () => {
        // Here you write the scroll logic, for example using window.scrollBy or some other method
        window.scrollBy({
          top: window.innerHeight, // Or the pixel value you wish to roll down
          behavior: 'smooth' // Smooth rolling
        });
      };
    return (
        <div>
            <h3 className='content-style'>
                <img src={props.picture} alt="First Slide" className='image-style' />
                <div className='text-style1'>ski area overview for st.john's,NL,Canada</div>
                <div className='text-style2'>Group-11's Ski Resort Piste Map</div>
                <div className='downOutlined-case'>
                    <DownOutlined
                        style={{
                            fontSize: '36px',
                            cursor: 'pointer',
                            opacity: 0.7,
                            transform: isHovering ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.3s ease',
                        }}
                        onClick={handleScrollDown}
                        onMouseOver={() => setIsHovering(true)}
                        onMouseOut={() => setIsHovering(false)}
                    />
                </div>
            </h3>
        </div>
    )
}

import React from 'react'
import Image from 'next/future/image'
import img from '../../public/static/TourTracking.png'

const Logo = (props) => {
      return (
            <Image src={img} {...props} alt="TourTracking Logo"/>
      )
}

export default Logo

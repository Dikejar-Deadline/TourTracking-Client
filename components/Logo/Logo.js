import React from 'react'
import Image from 'next/future/image'
import img from '~/static/TourTracking.png'

const Logo = (props) => {
      return (
            <Image src={img} {...props} alt="TourTracking Logo"/>
      )
}

export default Logo

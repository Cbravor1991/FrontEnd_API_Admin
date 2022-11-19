import React from 'react'
const images = require.context('../images/')

export default function Slider (props) {
    console.log(props)
    return (
        <div>
        <img src={images(`./${props.coverImg}`)} className="card--image" />

        </div>
    )
}

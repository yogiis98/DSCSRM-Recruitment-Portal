
import React, { Component } from 'react'

export default class SuccessModal extends Component {
    colors = ["#4285f4", "#db4437", "#f4b400", "#0f9d58"];

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // eslint-disable-next-line no-undef
        confetti({
            decay: 0.93,
            ticks: 600,
            particleCount: 200,
            angle: 60,
            spread: 100,
            origin: {
                x: 0,
                y: 0.5,
            },
            colors: this.colors,
            zIndex: 1500,
            shapes: ['circle', 'circle', 'square']
        })

        // eslint-disable-next-line no-undef
        confetti({
            decay: 0.93,
            ticks: 600,
            particleCount: 200,
            angle: 120,
            spread: 100,
            origin: {
                x: 1,
                y: 0.5,
            },
            colors: this.colors,
            zIndex: 1500,
            shapes: ['circle', 'circle', 'square']
        })
    }
    render() {
        return (<></>)
    }
}
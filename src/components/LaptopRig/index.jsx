import React, { useEffect, useState } from 'react';
import anime from "animejs";
import { Controller, Scene } from 'react-scrollmagic';

import Laptop from '../Laptop';
import './style.less';

let position = {
  angle: 90,
  x: 0,
  y: 0,
  z: 0,
  roty: 0,
  rotx: -90,
  rotz: 180,
}

let timeline;
let percentage = 0;
class LaptopRig extends React.Component {

  componentDidMount() {
    this.initTimeline();
  };


  initTimeline() {
    timeline = anime.timeline({
      autoplay: false,
      duration: 20000,
      easing: 'linear'
    });
    timeline.add({
      targets: position,
      angle: 0,
      x: 0,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0.1,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: 0.1,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: 200,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: -200,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: 200,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: -200,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: 0,
      y: 0,
      z: 499,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 1000
    })
    .add({
      targets: position,
      angle: 0,
      x: 0,
      y: 0,
      z: 500,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 5000
    })
    .add({
      targets: position,
      angle: 0,
      x: 0,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: 0,
      y: 0,
      z: 0,
      roty: 0,
      rotx: 0,
      rotz: 0,
      duration: 2000
    })
  }

  render() {
    return (
      <div>
        <div className="first-section"/>
        <div id="trigger" />
        <Controller>
          <Scene duration="2000%" triggerElement="#trigger">
            {(progress, event) => {
              console.log(progress);
              if(timeline) {
                timeline.seek(timeline.duration * progress);
              }
              return(<Laptop angle={position.angle} x={position.x} y={position.y} z={position.z} rotx={position.rotx} roty={position.roty} rotz={position.rotz}/>)
            }}
          </Scene>
        </Controller>
          <div className="second-section"/>
      </div>
    )
  };
};

export default LaptopRig;

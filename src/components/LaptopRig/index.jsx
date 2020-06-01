import React, { useEffect, useState } from 'react';
import anime from "animejs";
import { Controller, Scene } from 'react-scrollmagic';
import { setProgress } from '../../actions/progressActions';
import { connect } from 'react-redux';

import Laptop from '../Laptop';
import './style.less';

let position = {
  angle: 90,
  x: 0,
  y: -150,
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
      angle: 10,
      x: 400,
      y: 100,
      z: -300,
      roty: 0,
      rotx: -5,
      rotz: 0,
      duration: 2000
    })
    .add({
      targets: position,
      angle: 0,
      x: -200,
      y: 0,
      z: 0,
      roty: -400,
      rotx: 40,
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
              if(timeline) {
                // TODO: Bug here with rendering multiple components at once.
                this.props.setProgress(progress);
                timeline.seek(timeline.duration * progress);
              }
              return(<Laptop store={this.props.store} angle={position.angle} x={position.x} y={position.y} z={position.z} rotx={position.rotx} roty={position.roty} rotz={position.rotz}/>)
            }}
          </Scene>
        </Controller>
        <div className="second-section"/>
      </div>
    )
  };
};

export default connect(
  null,
  { setProgress }
)(LaptopRig);

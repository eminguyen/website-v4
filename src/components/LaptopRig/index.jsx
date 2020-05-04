import React, { useEffect, useState } from 'react';
import anime from "animejs";

import Laptop from '../Laptop';

let _event = {
  y: 0,
  deltaY: 0
};

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
let touchStartY = 0;
// container height - window height to limit the scroll at the top of the screen when we are at the bottom of the container
let maxHeight = 0; //- window.innerHeight;

function onWheel (e) {
    var evt = _event;
    evt.deltaY = e.wheelDeltaY || e.deltaY * -1;
    // reduce by half the delta amount otherwise it scroll too fast (in a other way we could increase the height of the container too)
    evt.deltaY *= 0.5;

    scroll(e);
};

function scroll (e) {
  var evt = _event;
  // limit scroll top
  if ((evt.y + evt.deltaY) > 0 ) {
    evt.y = 0;
  // limit scroll bottom
  } else if ((-(evt.y + evt.deltaY)) >= maxHeight) {
    evt.y = -maxHeight;
  } else {
      evt.y += evt.deltaY;
  }
  percentage = lerp(percentage, - _event.y, .07);
  if(timeline) {
    timeline.seek(percentage * (20000 / maxHeight));
  }
}

function lerp(a, b, t) {
  return ((1 - t) * a + t * b);
}

function onTouchStart (e) {
  var t = (e.targetTouches) ? e.targetTouches[0] : e;
  touchStartY = t.pageY;
}

function onTouchMove (e) {
  var evt = _event;
  var t = (e.targetTouches) ? e.targetTouches[0] : e;
  // the multiply factor on mobile must be about 10x the factor applied on the wheel
  evt.deltaY = (t.pageY - touchStartY) * 5;
  touchStartY = t.pageY;
  scroll(e)
}

function init () {
  maxHeight = 20 * (document.documentElement.clientHeight || document.documentElement.offsetHeight);
  document.addEventListener('wheel', onWheel, { passive: false });
}

const LaptopRig = () => {

  useEffect(() => {
    init();
    initTimeline();
  },[])

  const [angle, setAngle] = useState(90);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [rotx, setRotX] = useState(-90);
  const [roty, setRotY] = useState(0);
  const [rotz, setRotZ] = useState(180);


  const initTimeline = () => {
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
      duration: 1500,
      update: updatePosition
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
      duration: 2000,
      update: updatePosition
    })
    .add({
      targets: position,
      angle: 30,
      x: 400,
      y: 0,
      z: 0,
      roty: -20,
      rotx: 50,
      rotz: -20,
      duration: 1000,
      update: updatePosition
    })
  }

  const updatePosition = () => {
    setAngle(position.angle);
    setX(position.x);
    setY(position.y);
    setZ(position.z);
    setRotX(position.rotx);
    setRotY(position.roty);
    setRotZ(position.rotz);
  }

  return (
    <div>
      <Laptop angle={angle} x={x} y={y} z={z} rotx={rotx} roty={roty} rotz={rotz}/>
    </div>
  );
};

export default LaptopRig;

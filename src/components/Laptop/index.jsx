import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';

import Screen from '../Screen';
import './style.less';

class Laptop extends React.Component {
  componentDidMount() {
    var glScene = new THREE.Scene();
    var cssScene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 2000 );
    var renderer =  new THREE.WebGLRenderer({alpha:true});
    var cssrenderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = 0;
    cssrenderer.setSize( window.innerWidth, window.innerHeight );
    cssrenderer.domElement.style.position = 'absolute';
cssrenderer.domElement.style.top = 0;
const topMesh = new THREE.Object3D();

    var material = new THREE.MeshBasicMaterial({color: 0x0000ff});
    var geometry = new THREE.PlaneGeometry(500, 500);
    var planeMesh= new THREE.Mesh( geometry, material );
    planeMesh.position.z = 51;
    topMesh.add(planeMesh);
    // add it to the WebGL scene

    renderer.setClearColor( 0x000000, 0 );
     cssrenderer.domElement.style.zIndex = 100;
     this.mount.appendChild( renderer.domElement );
     this.mount.appendChild( cssrenderer.domElement );


     var box = new THREE.BoxGeometry( window.innerWidth / 2, window.innerHeight / 2, 100 );
     var material3 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
     var cube = new THREE.Mesh( box, material3 );
     topMesh.add(cube);
     glScene.add( topMesh );


    // create the object3d for this element
    var element = document.createElement( 'div' );
    ReactDOM.render(<Screen />, element );
    var cssObject = new CSS3DObject( element );
    // add it to the css scene
    cssScene.add(cssObject);



    // TODO: this is honestly an arbitrary number that just works well in testing
    camera.position.z = 680;
    var animate = function () {
      requestAnimationFrame( animate );
      var quaternion = new THREE.Quaternion();
      planeMesh.getWorldQuaternion( quaternion )

      let rotation = new THREE.Euler()
      rotation.setFromQuaternion(quaternion);
      topMesh.rotation.x += 0.001;
      topMesh.rotation.y += 0.001;
      cssObject.position.x = planeMesh.getWorldPosition().x;
      cssObject.rotation.x = rotation.x;
      cssObject.position.y = planeMesh.getWorldPosition().y;
      cssObject.rotation.y = rotation.y;
      cssObject.position.z = planeMesh.getWorldPosition().z + 50;
      cssrenderer.render( cssScene, camera );
      renderer.render( glScene, camera );
    };
    animate();
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default Laptop;

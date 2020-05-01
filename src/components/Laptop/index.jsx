import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from "three";
import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';
import * as WindowResize from 'three-window-resize';

import Screen from '../Screen';
import './style.less';

// TODO: Move to utils file
const vh = (v) => {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h ) / 100;
}

// TODO: Move to utils file
const vw = (v) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w ) / 100;
}

class Laptop extends React.Component {
  componentDidMount() {
    const cssScene = new THREE.Scene();
    const glScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 50, 1, 0.1, 2000 );

    // Initial CSS Renderer
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize( vw(100), vw(100));
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.margin	= 0;
    cssRenderer.domElement.style.padding	= 0;

    // Top Mesh
    const topMesh = new THREE.Object3D();

    // Top Casing
    var topCaseBox = new THREE.BoxGeometry(vw(45), vw(35), 100 );
    var topCaseMaterial = new THREE.MeshPhongMaterial({
      // light
      specular: 0xD76531,
      // intermediate
      color: 0xef8834,
         // dark
      emissive: 0x8c2317,
      shininess: 50,
      wireframe: false,
    });
    const topCase = new THREE.Mesh( topCaseBox, topCaseMaterial );
    topMesh.add(topCase);

    // Screen Plane
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});
    const planeGeometry = new THREE.PlaneGeometry(vw(45), vw(35));
    const planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    planeMesh.position.z = 50;
    topMesh.add(planeMesh);

    // Create a glRenderer
    const glRenderer =  new THREE.WebGLRenderer({alpha:true});
    glRenderer.setClearColor( 0x000000, 0 );
    glRenderer.setSize( vw(100), vw(100) );
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.zIndex = 0;
    glRenderer.domElement.appendChild(cssRenderer.domElement);
    glScene.add( topMesh );

    // Add light
    const light = new THREE.DirectionalLight(0xfdfdfd, 2);
    light.position.set(2, 2, 1).normalize();
    glScene.add(light);

    // 3D Object
    const element = document.createElement( 'div' );
    ReactDOM.render(<Screen />, element );
    const cssObject = new CSS3DObject( element );
    cssScene.add(cssObject);
    element.style.width  = vw(45) + "px";
    element.style.height = vw(35) + "px";

    this.mount.appendChild( glRenderer.domElement );
    this.mount.appendChild( cssRenderer.domElement );

    camera.position.z = vw(100);
    var animate = function () {
      requestAnimationFrame( animate );
      topMesh.rotation.x += 0.01;
      topMesh.rotation.y += 0.01;
      cssObject.rotation.x = topMesh.rotation.x;
      cssObject.rotation.y = topMesh.rotation.y;
      cssObject.position.x = planeMesh.getWorldPosition().x;
      cssObject.position.y = planeMesh.getWorldPosition().y;
      cssObject.position.z = planeMesh.getWorldPosition().z;
      cssRenderer.render( cssScene, camera );
      glRenderer.render( glScene, camera );
    };
    animate();

    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        glRenderer.setSize( window.innerWidth, window.innerHeight );
        cssRenderer.setSize( window.innerWidth, window.innerHeight );
    }
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default Laptop;

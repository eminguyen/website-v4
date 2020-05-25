import React from 'react';
import ReactDOM from 'react-dom';
import * as THREE from "three";
//import * as RoundedBox from 'three-rounded-box';
import { CSS3DObject, CSS3DRenderer } from 'three-css3drenderer';
import * as WindowResize from 'three-window-resize';

import Screen from '../Screen';
import './style.less';


let quaternion = new THREE.Quaternion();
const pi = Math.PI;
const cameraVector = new THREE.Vector3(0, 0, 1);

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

const degToRad = (deg) => {
  return deg * (pi / 180);
}


function makeElementObject(element) {
    const obj = new THREE.Object3D;
    element.style.opacity = 0.999;
    var css3dObject = new CSS3DObject( element );
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.

    return obj
}

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnWorldAxis(axis, theta); // rotate the OBJECT
}
let tempVector = new THREE.Vector3();
class Laptop extends React.Component {
  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      this.element = document.createElement( 'div' );
      ReactDOM.render(<Screen />, this.element );
    }
  }

  componentDidMount() {
    const glScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 50, vw(100) / vh(100), 0.1, 2000 );
    this.glScene = glScene;
    this.camera = camera;

    // Initial CSS Renderer
    const cssRenderer = new CSS3DRenderer({antialias: true});
    cssRenderer.setSize( vw(100), vh(100));
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.margin	= 0;
    cssRenderer.domElement.style.padding	= 0;

    // Top Mesh
    const topMesh = new THREE.Object3D();
    this.topMesh = topMesh;
    const bottomMesh = new THREE.Object3D();
    const laptopMesh = new THREE.Object3D();
    this.laptopMesh = laptopMesh;

    // Top Casing
    var topCaseBox = new THREE.BoxGeometry(vw(45), vw(35), vw(1.2));
    var topCaseMaterial = new THREE.MeshLambertMaterial({color: 0xDDDDDD, shading: THREE.FlatShading});
    topCaseMaterial.flatShading = true;
    const topCase = new THREE.Mesh( topCaseBox, topCaseMaterial );
    topMesh.add(topCase);

    // Bottom Casing
    var bottomCaseBox = new THREE.BoxGeometry(vw(45), vw(1.2), vw(35));
    var bottomCaseMaterial = new THREE.MeshLambertMaterial({color: 0xDDDDDD, shading: THREE.FlatShading});
    const bottomCase = new THREE.Mesh( bottomCaseBox, bottomCaseMaterial );
    bottomCaseMaterial.flatShading = true;
    bottomCase.position.y = vw(-18.1);
    bottomCase.position.z = vw(17.5);
    bottomMesh.add(bottomCase);

    var keyboardBox = new THREE.BoxGeometry(vw(38), vw(.4), vw(18));
    var keyboardMaterial = new THREE.MeshLambertMaterial({color: 0xBBBBBB, shading: THREE.FlatShading});
    const keyboard = new THREE.Mesh( keyboardBox, keyboardMaterial );
    keyboard.position.y = vw(-17.3);
    keyboard.position.z = vw(14);
    bottomMesh.add(keyboard);

    // Screen Plane
    const planeMaterial = new THREE.MeshPhongMaterial({
      opacity	: 0,
      color	: new THREE.Color( 0x000000 ),
      blending: THREE.NoBlending,
      side: THREE.DoubleSide
    });
    const planeGeometry = new THREE.BoxGeometry(vw(42), vw(32), vw(1));
    const planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
    this.planeMesh = planeMesh;
    planeMesh.position.z = vw(.7);
    topMesh.add(planeMesh);

    // Create a glRenderer
    const glRenderer =  new THREE.WebGLRenderer({alpha:true, antialias: true});
    glRenderer.setPixelRatio( window.devicePixelRatio );
    glRenderer.setClearColor( 0x000000, 0 );
    glRenderer.setSize( vw(100), vh(100) );
    glRenderer.domElement.style.position = 'absolute';
    glRenderer.domElement.style.top = 0;
    cssRenderer.domElement.appendChild(glRenderer.domElement);
    glRenderer.domElement.style.pointerEvents = 'none';
    this.cssRenderer = cssRenderer;
    this.glRenderer = glRenderer;
    laptopMesh.add(topMesh);
    laptopMesh.add(bottomMesh);
    const cssObject = makeElementObject(this.element );
    this.cssObject = cssObject;
    planeMesh.add(cssObject);
    this.element.style.width  = vw(42) + "px";
    this.element.style.height = vw(32) + "px";

    // starting positions on render
    laptopMesh.position.x = 0;
    laptopMesh.position.y = 0;
    laptopMesh.position.z = 0;
    laptopMesh.rotation.x = degToRad(-90);
    laptopMesh.rotation.y = degToRad(0);
    laptopMesh.rotation.z = degToRad(180);
    this.setAngle(90);
    glScene.add( laptopMesh );

    // Add light
    var ambient = new THREE.AmbientLight( 0xAAAAAA );
    glScene.add( ambient );

    var light = new THREE.DirectionalLight( 0xffffff, .5 );
  	light.position.set( 0, 1.5, 1 ).normalize();
    glScene.add( light );
    // 3D Object

    //this.mount.appendChild( glRenderer.domElement );
    this.mount.appendChild( cssRenderer.domElement );

    let axis = new THREE.Vector3(1, 0, 0).normalize();
    camera.position.z = vw(80);
    cssRenderer.render( glScene, camera );
    glRenderer.render( glScene, camera );
    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      glRenderer.setSize( window.innerWidth, window.innerHeight );
      cssRenderer.setSize( window.innerWidth, window.innerHeight );
    }
  }
  componentWillUpdate() {
    this.setAngle(this.props.angle);
    this.laptopMesh.position.x = this.props.x;
    this.laptopMesh.position.y = this.props.y;
    this.laptopMesh.position.z = this.props.z;
    this.laptopMesh.rotation.x = degToRad(this.props.rotx);
    this.laptopMesh.rotation.y = degToRad(this.props.roty);
    this.laptopMesh.rotation.z = degToRad(this.props.rotz);

    this.cssRenderer.render( this.glScene, this.camera );
    this.glRenderer.render( this.glScene, this.camera );
  }

  setAngle(ang) {
    const angle = degToRad(ang);
    this.topMesh.rotation.x = angle;
    const size = vw(17.5);
    const x = Math.sin(angle) * size;
    const y = -((Math.cos(angle) * size) - size);
    this.topMesh.position.set(0, -y, x);
  }

  render() {
    return (
      <div className="laptop" ref={ref => (this.mount = ref)} />
    )
  }
}

export default Laptop;

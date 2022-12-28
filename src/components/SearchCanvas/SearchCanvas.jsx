import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment, Html, useProgress} from '@react-three/drei';
import { Physics, useBox, useConvexPolyhedron, useCylinder, useHeightfield, usePlane, useTrimesh } from '@react-three/cannon';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Mesh} from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import "./styles.css"
import Loader2D from "../loader/Loader2D"
import { connect } from 'react-redux';
import { setGarage, setSettings } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/3DepotLogoBig.png';
import imgAlpha from '../../assets/3DepotLogoAlpha.png';
import crate from '../../assets/crate.png';
import crateWall from '../../assets/warehouseBG.png';
import floorAlpha from '../../assets/floorAlpha.png';


const pi= Math.PI;

const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/b_transparent/v1670880755/3DepotProducts/${assetSourceName}.png`

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = .5;
      controls.maxDistance = 20;
      controls.enableZoom = false;
      controls.enableRotate = false;

      
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

const ScrollController = () =>{

}

function ObjToPrimitive({ url, mat }) {
  const [obj, setObj] = useState();
  useMemo(() => new OBJLoader().load(url, setObj), [url]);
  if (obj) {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = mat;
      }
    });
    return <primitive object={obj} />;
  }
  return null;
}

 const OBJAsset = () => {
  const mat = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load("url"),                   //--color--
    metalnessMap:new THREE.TextureLoader().load("url"),           //--metalness--
    roughnessMap:new THREE.TextureLoader().load("url"),           //--roughness--
    normalMap:new THREE.TextureLoader().load("url"),              //--normals--
    transmissionMap : new THREE.TextureLoader().load("url"),      //--opacity--
    aoMap : new THREE.TextureLoader().load("url"),                //--ambient occlusion--
    emissiveMap : new THREE.TextureLoader().load("url"),          //--emission--
    clearcoatMap : new THREE.TextureLoader().load("url")          //--clearcoat--
  })
  return (
    <mesh scale={.01} position={[0, 0, 0]}>
      {ObjToPrimitive({ url: "astronaut002/z2_spacesuit.obj", mat })}
    </mesh>
  );
};


function FBXAsset() {
  const fbx = useLoader(FBXLoader, 'https://res.cloudinary.com/dirwjcohx/raw/upload/v1670880728/3DepotProducts/Sci-fi_Rifle_2_qu1tv8.fbx') 
 /*  const fbx = useLoader(FBXLoader, 'https://res.cloudinary.com/dirwjcohx/raw/upload/v1671546685/3DepotProducts/Baloon_y4frgi.fbx') */
  const newMesh = <mesh >
  <primitive scale={.01} object={fbx} />
  </mesh>
  return (
    newMesh
    )
    
}

function Loader() {
  const {progress} = useProgress()
  return <Html center>
    <Loader2D/>
  </Html>
}

function Box(props) {
    const texture = new THREE.TextureLoader().load( crate );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1);
    texture.rotation=(pi)
    const texture2 = new THREE.TextureLoader().load( assetURL );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1);
    texture.rotation=(pi)

    const [ref, api] = useBox(()=>({
      mass:1,
      position: [props.xPos,5,0],
      rotation:[-pi/3,-pi/3,0]
    }));
    
    return(
  <mesh onClick={()=>{
    const raycaster = new THREE.Raycaster();
    const vector = new THREE.Vector3( 0, 0, 0 ); // instead of event.client.x and event.client.y
    const direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( camera.matrixWorld );
    raycaster.set( vector, direction );
    const intersects = raycaster.intersectObjects(objects);
    if(props.canClick){
        props.setCanClick(false);
        setTimeout(()=>props.setCanClick(true),2000)
        if(!props.clicked){
    api.velocity.set(0,3,3);
    api.applyTorque([4,10,1])
    props.setClicked(true)}
    else{
        api.velocity.set(0,3,-3);
        api.applyTorque([-4,-10,-1])
        props.setClicked(false)}
    }}
}
  
  ref={ref} >
    <boxBufferGeometry attach="geometry" args={[1,1]}/>
    <meshStandardMaterial attatch="material" map={texture}/>
    <mesh rotation={[pi/2,0,pi]} position={[0,-.51,0]}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} transparent/>
    </mesh>
    <mesh rotation={[pi/2,pi,0]} position={[0,.51,0]}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} transparent/>
    </mesh>
  </mesh>

  
    );
  }



function FloorPlane() {
    const textureAlpha = useLoader(THREE.TextureLoader, floorAlpha)
     const [ref] = usePlane(()=>({
        position:[0,-1,3],
        rotation:[-pi/2,0,0]
      }));
  return(
<mesh ref={ref} position={[0,-1,0]} rotation={[-pi/2,0,pi/2]}>
  <planeBufferGeometry  attach="geometry" args={[10,10,200]}/>
  <meshStandardMaterial attach="material" alphaMap={textureAlpha} transparent /* map={textureFC} roughnessMap={textureFR} normalMap={textureFN} *//>
</mesh>
  );
}
function RearPlane() {
    const textureWC = new THREE.TextureLoader().load( crateWall );
  return(
<mesh position={[0,-.2,-1]} rotation={[0,0,0]}>
  <planeBufferGeometry  attach="geometry" args={[18,9,200]}/>
  <meshLambertMaterial attach="material"  map={textureWC} />
</mesh>
  );
}

function Image() {
  const texture = useLoader(THREE.TextureLoader, img)
  const textureAlpha = useLoader(THREE.TextureLoader, imgAlpha)
  return (
    <mesh position={[0,-10,0]} rotation={[-pi/2,0,pi/2]}>
      <planeBufferGeometry attach="geometry" args={[30, 30]} />
      <meshStandardMaterial attach="material" color={"#cccccc"} alphaMap={textureAlpha} transparent/>
    </mesh>
  )
}

const mapStateToProps = state => {
  return {
  settings: state.garageSettings
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setSettings: (settings)=> {
      dispatch(setSettings(settings));
    }     
  };  
};




function SearchCanvas(props) {
    const [clicked,setClicked] = useState(false);
    const [canClick,setCanClick] = useState(true);
  const navigate = useNavigate();
  const goToLogIn = () => navigate('/LogIn');
  
/*   useEffect(()=>{
    !props.user._id && goToLogIn()
  },[]) */


  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={<Loader/>}>
        <CameraController/>
        {/* <Environment background={true} files={'industrial_workshop_foundry_bw2.hdr'}
              path={'/'} ></Environment> */}
        <Image/>
        <Physics>
        <RearPlane/>
        <FloorPlane/>
        <Box xPos={1.5} setClicked={setClicked} clicked={clicked} canClick={canClick} setCanClick={setCanClick}/>
        <Box xPos={3.5} setClicked={setClicked} clicked={clicked} canClick={canClick} setCanClick={setCanClick}/>
        <Box xPos={5.5} setClicked={setClicked} clicked={clicked} canClick={canClick} setCanClick={setCanClick}/>
        </Physics>
        <ambientLight intensity={.3}/>
        <spotLight position={[200,800,500]} angle={0.3} color={`rgb(${props.settings.red},${props.settings.green},${props.settings.blue})`} intensity={props.settings.intensity}/>
        <spotLight position={[-600,800,500]} angle={0.3} color={`rgb(${props.settings.red},${props.settings.green},${props.settings.blue})`} intensity={props.settings.intensity}/>
        <primitive object={new THREE.AxesHelper(props.settings.axesSize)}></primitive>

        </Suspense>
      </Canvas>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCanvas);
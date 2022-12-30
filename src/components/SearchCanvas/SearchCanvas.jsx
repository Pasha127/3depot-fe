import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
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
import { setGarage, setSearchSettings, setSettings } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/3DepotLogoBig.png';
import imgAlpha from '../../assets/3DepotLogoAlpha.png';
import crate from '../../assets/crate.png';
import crateStencil from '../../assets/crateStencil2.png';
import crateWall from '../../assets/warehouseBG.png';
import floorAlpha from '../../assets/floorAlpha.png';
import { useRef } from 'react';


const pi= Math.PI;

const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/b_transparent/v1670880755/3DepotProducts/${assetSourceName}.png`

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

const ScrollController = () =>{
    
}

function Loader() {
    return <Html center>
    <Loader2D/>
  </Html>
}

const CameraController = () => {
    const { camera, gl } = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = .5;
      controls.maxDistance = 20;
/*       controls.enableZoom = false;
      controls.enableRotate = false; */

      
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};



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


function Box(props) {
    const [clicked,setClicked] = useState(false);
    const [canClick,setCanClick] = useState(true);
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');
    const texture = new THREE.TextureLoader().load( crate );
    const textureStencil = new THREE.TextureLoader().load( crateStencil );
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
    
    return(<>
  <mesh onClick={(e)=>{
    e.stopPropagation()
    /* const raycaster = new THREE.Raycaster();
    const vector = new THREE.Vector3( 0, 0, 0 ); // instead of event.client.x and event.client.y
    const direction = new THREE.Vector3( 0, 0, -1 ).transformDirection( camera.matrixWorld );
    raycaster.set( vector, direction );
    const intersects = raycaster.intersectObjects(objects); */
    if(canClick){
        props.setActiveAsset("rifle placeholder")  /////////////!!!!!!!MAKE DYNAMIC!!!!!/////////////
        setCanClick(false);
        setTimeout(()=>setCanClick(true),2000)
        if(!clicked){
            api.velocity.set(0,3,3);
            api.applyTorque([4,10,1])
            setClicked(true)}
            else{
                props.setActiveAsset("")  /////////////!!!!!!!MAKE DYNAMIC!!!!!/////////////
                api.velocity.set(0,3,-3);
                api.applyTorque([-4,-10,-1])
                setClicked(false)}
            }}
}
  
  ref={ref} >
    <boxBufferGeometry attach="geometry" args={[1,1]}/>
    <meshStandardMaterial attatch="material" map={texture} transparent/>
    <mesh rotation={[pi/2,0,pi]} position={[0,-.501,0]}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} transparent/>
    </mesh>
    <mesh rotation={[pi/2,pi,0]} position={[0,.501,0]} onClick={(e)=>{
        /* e.stopPropagation()
        goToGarage(); */
    }}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} color="black" transparent/>
    </mesh>
  </mesh>

  
    </>);
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
  <planeBufferGeometry  attach="geometry" args={[19,9,200]}/>
  <meshLambertMaterial attach="material"  map={textureWC} />
</mesh>
  );
}


function PreviewAsset(props){
const rotatingMesh = useRef();

    const SelectedMesh =()=>{
        return(<>
        {props.activeAsset &&<FBXAsset/>}{/*  //refreshing entire page */}
        </>
        )
    }
useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    rotatingMesh.current.rotation.y = elapsedTime;
  });

    return(<>
        <mesh ref={rotatingMesh} position={[.05,.5,1.73]} rotation={[0,0,0]}>
          <boxBufferGeometry  attach="geometry" args={[1,1,1]}/>
          <meshLambertMaterial attach="material" wireframe={true} />
            <SelectedMesh/>
        </mesh>
    </>);
}


const mapStateToProps = state => {
  return {
  settings: state.garageSettings,
  searchSettings: state.searchSettings
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setSearchSettings: (settings)=> {
      dispatch(setSettings(settings));
    }    
  };  
};




function SearchCanvas(props) {
    const [oneActive,setOneActive] = useState(false);
    const [activeAsset,setActiveAsset] = useState("");
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
        <Physics>
        <RearPlane/>
        <FloorPlane/>
        <Box activeAsset={activeAsset} setActiveAsset={setActiveAsset} key={1.5} xPos={1.5}/>{/* !! MAKE THESE WITH A MAP !!*/}
        <Box activeAsset={props.searchSettings.activeAsset} setActiveAsset={props.setSearchSettings} key={3.5} xPos={3.5}/>
        <Box activeAsset={props.searchSettings.activeAsset} setActiveAsset={props.setSearchSettings} key={5.5} xPos={5.5}/>
        </Physics>
        <PreviewAsset  activeAsset={activeAsset}/>
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
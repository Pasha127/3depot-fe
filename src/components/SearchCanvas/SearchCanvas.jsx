import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Physics, useBox, usePlane} from '@react-three/cannon';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Mesh, Vector3} from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import "./styles.css"
import Loader2D from "../loader/Loader2D"
import { connect } from 'react-redux';
import {  setSearchSettings} from '../../lib/redux/actions';
import { useNavigate } from 'react-router-dom';
import crate from '../../assets/crate.png';
import warehouseWall from '../../assets/warehouseBGDark.png';
import { useRef } from 'react';
import ScrollRightTab from './ScrollTabs/ScrollRightTab/ScrollRightTab';
import ScrollLeftTab from './ScrollTabs/ScrollLeftTab/ScrollLeftTab';
import DropdownSign from './DropdownSign/DropdownSign';
import InstructionHolograms from './InstructionHolograms/InstructionHolograms';

const pi= Math.PI;

const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/b_transparent/v1670880755/3DepotProducts/${assetSourceName}.png`

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

let objectsArray =[] 

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
    const [canClick,setCanClick] = useState(false);
    const [activeAsset,setActiveAsset] = useState("");
    const [boxOpen,setBoxOpen] = useState(false);
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
    useEffect(()=>{
      if(props.settings.cameraPos !== props.xPos && boxOpen){closeBox()}
    },[props.settings.cameraPos])
    useEffect(()=>{
      setTimeout(()=>{setCanClick(true)},2400)
    },[])
    objectsArray.push(this);

    const openBox = ()=>{
      if(canClick){api.velocity.set(0,3,3);
      api.applyTorque([4,10,1])
      setTimeout(()=>setActiveAsset("rifle placeholder"),2000)  /////////////!!!!!!!MAKE DYNAMIC!!!!!/////////////
      setTimeout(()=>props.setSearchSettings({activeAsset:"rifle placeholder"}),2000)  /////////////!!!!!!!MAKE DYNAMIC!!!!!/////////////
      setClicked(true)}
      setBoxOpen(true)}
    const closeBox = ()=>{
      if(canClick){setActiveAsset("")  /////////////!!!!!!!MAKE DYNAMIC!!!!!/////////////
      props.setSearchSettings({activeAsset:""})
      api.velocity.set(0,3,-3);
      api.applyTorque([-4,-10,-1])
      setClicked(false)
      setBoxOpen(false)}
    }
    const clickBox = ()=>{
      if(canClick){
      props.setSearchSettings({cameraPos:props.xPos-1.45})
      setCanClick(false);
      setTimeout(()=>setCanClick(true),2000)
      props.setActiveBox(props.xPos)
    }}

    const [ref, api] = useBox(()=>({
      mass:1,
      position: [props.xPos,5,0],
      rotation:[-pi/3,-pi/3,0]
    }));
    
    return(<>
  <mesh onClick={(e)=>{
    e.stopPropagation()    
      clickBox()
      if(!clicked){
        openBox()}
        else{
          closeBox()
        }
  }}
  
ref={ref} >
    <boxBufferGeometry attach="geometry" args={[1,1]}/>
    <meshStandardMaterial attatch="material" map={texture} transparent/>
    <mesh rotation={[pi/2,0,pi]} position={[0,-.501,0]}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} transparent/>
    </mesh>
    <mesh rotation={[pi/2,pi,0]} position={[0,.501,0]}>
        <planeBufferGeometry attach="geometry" args={[1,1]}/>
        <meshStandardMaterial attach="material" map={texture2} color="black" transparent/>
    </mesh>
    <PreviewAsset activeAsset={activeAsset}/>
  </mesh>

  
    </>);
  }



function FloorPlane() {
     const [ref] = usePlane(()=>({
        position:[0,-1,3],
        rotation:[-pi/2,0,0]
      }));
  return(
<mesh ref={ref} position={[0,-1,0]} rotation={[-pi/2,0,pi/2]}>
  <planeBufferGeometry  attach="geometry" args={[10,10,200]}/>
  <meshStandardMaterial attach="material" opacity={0} transparent /* map={textureFC} roughnessMap={textureFR} normalMap={textureFN} *//>
</mesh>
  );
}


function RearPlane(props) {
    const textureWC = new THREE.TextureLoader().load( warehouseWall );
  return(
<mesh position={[props.xPos,-.2,-1]} rotation={[0,0,0]}>
  <planeBufferGeometry  attach="geometry" args={[19,9,200]}/>
  <meshLambertMaterial attach="material"  map={textureWC} />
</mesh>
  );
}


function PreviewAsset(props){
const rotatingMesh = useRef();
const navigate = useNavigate();
const goToGarage = () => navigate('/Garage');
 const [displayable,setDisplayable] =useState(true)
 setTimeout(()=>{setDisplayable(false)},1)
    
useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    rotatingMesh.current.rotation.y = elapsedTime;
  });

    return(<>
        <mesh ref={rotatingMesh} position={[0,0,1]} rotation={[pi/2,0,0]} 
        onClick={goToGarage}>
          <boxBufferGeometry  attach="geometry" args={[.01,.01,.01]}/>
          <meshStandardMaterial attach="material" opacity={0} color={"rgba(0,0,0,0)"} transparent/>
            {(displayable || props.activeAsset) && <FBXAsset/>}
        </mesh>
    </>);
}


const mapStateToProps = state => {
  return {
  searchSettings: state.searchSettings
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setSearchSettings: (settings)=> {
      dispatch(setSearchSettings(settings));
    }    
  };  
};




/* const onDocumentMouseMove = (e,camera)=>{
  const mouse = new THREE.Vector2();
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( objectsArray );

  if(intersects.length > 0) {
      document.getElementsByTagName('html')[0].classList.add('pointer-cursor-class');
  } else {
    document.getElementsByTagName('html')[0].classList.add('default-cursor-class');
  }

} */

function SearchCanvas(props) {
  

  useEffect(()=>{
    props.setSearchSettings({activeAsset:""});
   /*  document.addEventListener('mousemove', onDocumentMouseMove) */
},[])
    const [activeBox,setActiveBox] = useState(1.5);
   /*  const [camVector,setCamVector] = useState(0); */

  const navigate = useNavigate();
  const goToLogIn = () => navigate('/LogIn');
    const goToGarage = () => navigate('/Garage');
  
  const ScrollController = () =>{
    const { camera, gl } = useThree();
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
      camera.position.lerp(new Vector3(props.searchSettings.cameraPos, 1,10), 0.1);
    });
  }


  let choicesLength = 5;

  return (<>
    <div className="canvas-container">
      <Canvas camera={{fov:30, position: [0,0,10]}}>
        <Suspense fallback={<Loader/>}>
        {/* <CameraController/> */}
        <ScrollController/>
        <Physics>
        <RearPlane xPos={0} />
        <RearPlane xPos={19}/>
        <FloorPlane/>
        <Box key={1.5} activeBox={activeBox} setActiveBox={setActiveBox} settings={props.searchSettings} setSearchSettings={props.setSearchSettings} xPos={1.5}/>{/* !! MAKE THESE WITH A MAP !!*/}
        <Box key={3.5} activeBox={activeBox} setActiveBox={setActiveBox} settings={props.searchSettings} setSearchSettings={props.setSearchSettings} xPos={3.5}/>
        <Box key={5.5} activeBox={activeBox} setActiveBox={setActiveBox} settings={props.searchSettings} setSearchSettings={props.setSearchSettings} xPos={5.5}/>
        <Box key={7.5} activeBox={activeBox} setActiveBox={setActiveBox} settings={props.searchSettings} setSearchSettings={props.setSearchSettings} xPos={7.5}/>
        <Box key={9.5} activeBox={activeBox} setActiveBox={setActiveBox} settings={props.searchSettings} setSearchSettings={props.setSearchSettings} xPos={9.5}/>
        </Physics>
        <ambientLight intensity={.3}/>
        <spotLight position={[200,800,500]} angle={0.3} />
        <spotLight position={[-600,800,500]} angle={0.3}/>
        {/* <primitive object={new THREE.AxesHelper(1)}></primitive> */}
        </Suspense>
      </Canvas>

    </div>
    <DropdownSign/>
    <ScrollRightTab listLength={choicesLength}/>
    <div className="ui-container">
      <ScrollLeftTab/>
      <InstructionHolograms/>
      {/* <div className="view-btn" onClick={()=>
          goToGarage()
      }>
        <div className="btn-interior-txt">View in 3D</div>
      </div> */}
    </div>
    </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCanvas);
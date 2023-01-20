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
import JSZip from 'jszip';

const pi= Math.PI;

const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/b_transparent/v1670880755/3DepotProducts/${assetSourceName}.png`

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

let objectsArray =[] 

function Loader() {
  return <Html>
    <div className='search-loader-container'>
    <Loader2D/>
    </div>
  </Html>
}
//const CameraController = () => {
//  const { camera, gl } = useThree();
//    useEffect(
//        () => {
//            const controls = new OrbitControls(camera, gl.domElement);
//            controls.minDistance = .5;
//      controls.maxDistance = 20;
///*       controls.enableZoom = false;
//      controls.enableRotate = false; */
//
//      
//      return () => {
//        controls.dispose();
//      };
//    },
//    [camera, gl]
//  );
//  return null;
//};



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


function Box(props) {
    /* console.log("asset in box", props.asset) */
    const [clicked,setClicked] = useState(false);
    const [canClick,setCanClick] = useState(false);
    const [boxOpen,setBoxOpen] = useState(false);
    const texture = new THREE.TextureLoader().load( crate );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1);
    texture.rotation=(pi)
    let link= props.asset?.file.link;
    let fileId = link.split("/").pop()
    const assetImage = ` https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/v1670880755/3DepotProducts/${fileId.split(".")[0]}.png` 
    const texture2 = new THREE.TextureLoader().load(assetImage );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1);
    texture.rotation=(pi)
    useEffect(()=>{
      if(props.settings.cameraPos !== props.xPos && boxOpen){closeBox()}
    },[props.settings.cameraPos, props.xPos])
    useEffect(()=>{
      setTimeout(()=>{setCanClick(true)},2400);
    },[])
    objectsArray.push(this);

    const openBox = ()=>{
      if(canClick){api.velocity.set(0,3,3);
      api.applyTorque([4,10,1])
/*       setTimeout(()=>setActiveAsset(props.asset.name),2000)  */
      setTimeout(()=>props.setSearchSettings({activeAsset: props.asset.name}),2000)  
      setClicked(true)}
      setBoxOpen(true)}
    const closeBox = ()=>{
      if(canClick){
       /*  setActiveAsset({})   */
      props.setSearchSettings({activeAsset: ""})
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
    <PreviewAsset boxOpen={boxOpen} asset={props.asset}/>
  </mesh>

  
    </>);
  }




function PreviewAsset(props){
const rotatingMesh = useRef();
const navigate = useNavigate();
const goToGarage = () => navigate('/Garage');
 const [unzippedModel, setUnzippedModel] = useState("");
 const [unzipped, setUnzipped] = useState(false);


  useEffect(()=>{
    console.log("use effect fires");
    if(props.asset.file){
      fetch(props.asset.file.link)
      .then((response) => {
        if (response.ok) {
          console.log("has asset")
        return Promise.resolve(response.blob());
      } else {
            return Promise.reject(new Error(response.statusText));
        }
      })
      .then(JSZip.loadAsync)
      .then((zip) => {
        return zip.file(`${props.asset.name}.fbx`);
      })
      .then((file) => {
          return file.async("blob")
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setUnzippedModel(url);
      }, (e) => {
        console.log(e);
      }).then(setUnzipped(true));
  return;    
  }
  },[props.asset.name, props.asset.file]) 

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(unzippedModel);
    };
  }, [unzippedModel]);

    
useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    rotatingMesh.current.rotation.y = elapsedTime;
  });

   
    return(<>
        <mesh ref={rotatingMesh} position={[0,0,1]} rotation={[pi/2,0,0]} 
        onClick={goToGarage}>
          <boxBufferGeometry  attach="geometry" args={[.01,.01,.01]}/>
          <meshStandardMaterial attach="material" opacity={0} color={"rgba(0,0,0,0)"} transparent/>
           {unzippedModel && <FBXAsset boxOpen={props.boxOpen} unzipped={unzipped} model={unzippedModel}/>}
        </mesh>
    </>);
}
const FBXAsset = (props) => {
  const [fbx, setFbx] = useState();
  const fbxLoaderRef = useRef(new FBXLoader());
  const fbxLoader = fbxLoaderRef.current;

  useEffect(() => {
    fbxLoader.load(props.model, (object) => {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.visible = false;
        }
      });
      setFbx(object);
    });
  }, [props.model]);

  useEffect(() => {
    if (fbx) {
      if (props.boxOpen) {
        setTimeout(() => {
          fbx.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.visible = true;
          }
        });
        }, 2000);
      } else {
        fbx.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.visible = false;
          }
        });
      }
    }
  }, [props.boxOpen, fbx]);

  return fbx ? <mesh>
    <primitive scale={.01} object={fbx} />
  </mesh> : null;
};



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



const mapStateToProps = state => {
  return {
  searchSettings: state.searchSettings,
  searchResults: state.searchResults
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setSearchSettings: (settings)=> {
      dispatch(setSearchSettings(settings));
    }    
  };  
};

function SearchCanvas(props) {

  useEffect(()=>{
    let vw = window.innerWidth;
     console.log(vw) 
     if(vw < 500){props.setSearchSettings({cameraPos: 0})}
    else if(vw < 1000){props.setSearchSettings({cameraPos: 2})}
    else{props.setSearchSettings({cameraPos: 4})}
  },[])
  

  useEffect(()=>{
    props.setSearchSettings({activeAsset:""});
   /*  document.addEventListener('mousemove', onDocumentMouseMove) */
},[])
    const [activeBox,setActiveBox] = useState(1.5);
   /*  const [camVector,setCamVector] = useState(0); */
  
  const ScrollController = () =>{
    const { camera } = useThree();
    useFrame(({ clock }) => {
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
          {props.searchResults && props.searchResults.map((asset, i) =>{
            const boxIndex = (i*2)+1.5;
                 return(
                 
                 <Box key={boxIndex}                   
                  activeBox={activeBox} 
                  setActiveBox={setActiveBox} 
                  settings={props.searchSettings} 
                  setSearchSettings={props.setSearchSettings} 
                  xPos={boxIndex}
                  asset={asset}
                  />
                  )
          })}
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
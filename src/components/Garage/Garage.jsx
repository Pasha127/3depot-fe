import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Environment, Html, useProgress} from '@react-three/drei';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {Mesh, Vector3} from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { DDSLoader } from "three-stdlib";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import "./styles.css"
import Loader2D from "../loader/Loader2D"
import { connect } from 'react-redux';
import { getAssetByIdWithThunk, setGarage, setSettings } from '../../lib/redux/actions';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/3DepotLogoBig.png';
import imgAlpha from '../../assets/3DepotLogoAlpha.png';
import JSZip from 'jszip';



const pi= Math.PI;

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = .5;
      controls.maxDistance = 20;
      camera.position.set(1,1,3);
      camera.lookAt(0,0,0);
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};


/* function ObjToPrimitive({ url, mat }) {
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
 */
/*  const OBJAsset = () => {
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
}; */


function FBXAsset(props) {
  const fbx = useLoader(FBXLoader, props.model) 
  const newMesh = <mesh >
  <primitive scale={.01} object={fbx} />
  </mesh>
  return (
    newMesh
    )
    
}

function Loader() {
  const {progress} = useProgress()
  return <Html>
    <div className='garage-loader-container'>
    <Loader2D/>
    </div>
  </Html>
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
  settings: state.garageSettings,
  activeAsset: state.activeAsset
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setSettings: (settings)=> {
      dispatch(setSettings(settings));
    },
    getAsset: (id) =>{
      dispatch(getAssetByIdWithThunk(id))
    }    
  };  
};


function Garage(props) {

  const navigate = useNavigate();
  const goToLogIn = () => navigate('/LogIn');
  const [unzippedModel, setUnzippedModel] = useState("");
    
  useEffect(()=>{
    if(props.activeAsset.file){
      fetch(props.activeAsset.file.link)
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
        return zip.file(`${props.activeAsset.name}.fbx`);
      })
      .then((file) => {
          return file.async("blob")
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob)
        setUnzippedModel(url);
      }, (e) => {
        console.log(e);
      });
  return;    
}

  },[props.activeAsset.name, props.activeAsset.file]) 


  useEffect(()=>{
    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const assetId = searchParams.get('asset');
    /* console.log("url_id",assetId) */
    props.getAsset(assetId)
    setUnzippedModel("https://res.cloudinary.com/dirwjcohx/raw/upload/v1674126029/3DepotProducts/3DepotTextBlue_cv6yq6.fbx")
  },[])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(unzippedModel);
    };
  }, [unzippedModel]);

  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={<Loader/>}>
        <CameraController />
        <Environment background={true} files={'industrial_workshop_foundry_bw4.hdr'}
              path={'/'} ></Environment>
              <Image/>
        <ambientLight intensity={.3}/>
        {props.settings.light && <spotLight position={[200,800,500]} angle={0.3} color={`rgb(${props.settings.red},${props.settings.green},${props.settings.blue})`} intensity={props.settings.intensity}/>}
        {props.settings.light && <spotLight position={[-600,800,500]} angle={0.3} color={`rgb(${props.settings.red},${props.settings.green},${props.settings.blue})`} intensity={props.settings.intensity}/>}
        {props.settings.axes && <primitive object={new THREE.AxesHelper(props.settings.axesSize)}></primitive>}
        <FBXAsset model={unzippedModel}/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Garage);
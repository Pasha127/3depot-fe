import React, { Suspense, useMemo, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls,Stars, useTexture } from '@react-three/drei';
import { Physics, useBox, useConvexPolyhedron, useCylinder, useHeightfield, usePlane, useTrimesh } from '@react-three/cannon';
import * as THREE from "three";
import {Mesh} from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { DDSLoader } from "three-stdlib";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Search from '../search/Search';
import "./styles.css"



const pi= Math.PI;

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());


/*function ObjToPrimitive({ url, mat }) {
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

 const Asset = () => {
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


function Asset2() {
  const fbx = useLoader(FBXLoader, 'https://res.cloudinary.com/dirwjcohx/raw/upload/v1670880728/3DepotProducts/Sci-fi_Rifle_2_qu1tv8.fbx')
  return (
  <mesh >
    <primitive scale={.01} object={fbx} />
    </mesh>)
    
}



function Garage() {
  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={null}>
        <OrbitControls/>
        <Environment preset="warehouse" background="only"/>
        <ambientLight intensity={0.2}/>
        <spotLight position={[2,8,5]} angle={0.3} color="white" intensity={1}/>
        <spotLight position={[-6,8,5]} angle={0.3} color="white"/>
        <Asset2/>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Garage;
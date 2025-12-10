import {Environment, Lightformer} from "@react-three/drei";


const StudioLights = () => {
    return (
        <group name="Lights">
            <Environment resolution={256}>
                <group>
                    <Lightformer
                        form="rect"
                        intensity={10}
                        position={[-10, 5, -5]}
                        scale={10}
                        rotation-y={Math.PI/ 2}
                        />
                </group>
            </Environment>
        </group>
    )
}
export default StudioLights

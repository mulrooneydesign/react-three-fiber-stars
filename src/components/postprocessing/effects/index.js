import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export const Effects = () => {
  return (
    <EffectComposer>
      <Bloom mipmapBlur />
      <ChromaticAberration blendFunction={BlendFunction.ALPHA} />
    </EffectComposer>
  )
}

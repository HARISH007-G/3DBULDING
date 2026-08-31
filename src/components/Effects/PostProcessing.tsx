import { EffectComposer, Bloom, Vignette, SMAA } from '@react-three/postprocessing';
import { useExperienceStore } from '../../store/useExperienceStore';

export function PostProcessing() {
  const tier = useExperienceStore((state) => state.tier);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);

  // If reduced motion or low tier, render minimal post processing for maximum performance
  if (reducedMotion || tier === 'low') {
    return (
      <EffectComposer enableNormalPass={false}>
        <Vignette eskil={false} offset={0.2} darkness={0.3} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={tier === 'high' ? 0.15 : 0.08}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.4}
        mipmapBlur
      />
      <Vignette eskil={false} offset={0.2} darkness={0.35} />
      {tier === 'high' && <SMAA />}
    </EffectComposer>
  );
}

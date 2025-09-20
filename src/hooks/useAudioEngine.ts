import { useState, useEffect } from 'react';
import { OrpheusAudioEngine } from '../Orpheus_audio/OrpheusAudioEngine';

export const useAudioEngine = () => {
  const [audioEngine] = useState(() => new OrpheusAudioEngine());
  
  useEffect(() => {
    audioEngine.initialize();
    return () => {
      const ctx = audioEngine.getAudioContext();
      if (ctx) {
        ctx.close();
      }
    };
  }, [audioEngine]);
  
  return audioEngine;
};
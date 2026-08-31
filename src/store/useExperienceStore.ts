import { create } from 'zustand';

export interface FloorInfo {
  id: number;
  numberStr: string;
  name: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  accentHex: string;
  description: string;
  stats: { label: string; value: string }[];
}

export const FLOOR_DATA: Record<number, FloorInfo> = {
  6: {
    id: 6,
    numberStr: '06',
    name: 'Executive Suite',
    subtitle: 'Leadership & Global Strategy',
    tagline: 'LUXURY EXECUTIVE EXPERIENCE',
    accentColor: 'text-amber-400',
    accentHex: '#D4AF37',
    description: 'Bespoke C-suite office suite featuring marble floor inlays, executive conference room, panoramic glass walls, and private sky lounge.',
    stats: [
      { label: 'Area', value: '1,200 m²' },
      { label: 'Capacity', value: '25 Executives' },
      { label: 'View', value: '360° Skyline' }
    ]
  },
  5: {
    id: 5,
    numberStr: '05',
    name: 'Technology & Prototyping',
    subtitle: 'AI Research & Volumetric Labs',
    tagline: 'HIGH-PERFORMANCE TECH HUB',
    accentColor: 'text-cyan-400',
    accentHex: '#00F0FF',
    description: 'State-of-the-art engineering lab equipped with multi-monitor dev pods, glass collaboration cells, and volumetric 3D photo & avatar scan booth.',
    stats: [
      { label: 'Area', value: '1,500 m²' },
      { label: 'Photo Booth', value: '3D Scan Pod' },
      { label: 'Dev Stations', value: '80 Pods' }
    ]
  },
  4: {
    id: 4,
    numberStr: '04',
    name: 'Creative & Design Studio',
    subtitle: 'Brand Experience & Industrial Design',
    tagline: 'IMMERSIVE CREATIVE WORKSPACE',
    accentColor: 'text-purple-400',
    accentHex: '#8A2BE2',
    description: 'Dynamic atelier featuring digital draft displays, 3D prototyping tables, color palette walls, and open brainstorming lounges.',
    stats: [
      { label: 'Area', value: '1,500 m²' },
      { label: 'Lab Space', value: '3D Print Hub' },
      { label: 'Display Units', value: '4K Color Calibrated' }
    ]
  },
  3: {
    id: 3,
    numberStr: '03',
    name: 'Meeting & Collaboration Hub',
    subtitle: 'Global Conference & Interactive Media',
    tagline: 'CONNECTED MEETING ECOSYSTEM',
    accentColor: 'text-blue-400',
    accentHex: '#0F52BA',
    description: 'Acoustically tuned glass conference chambers, interactive wall screens, smart video systems, and executive presentation arenas.',
    stats: [
      { label: 'Area', value: '1,500 m²' },
      { label: 'Boardrooms', value: '6 Suites' },
      { label: 'Screen Matrix', value: 'Interactive Wall' }
    ]
  },
  2: {
    id: 2,
    numberStr: '02',
    name: 'Open Employee Workspace',
    subtitle: 'Agile Teams & Operations',
    tagline: 'PRODUCTIVE OPEN WORKSPACE',
    accentColor: 'text-emerald-400',
    accentHex: '#00C853',
    description: 'Ergonomic open-plan pods with standing desks, task lamps, phone booths, printing stations, and collaborative coffee nooks.',
    stats: [
      { label: 'Area', value: '1,600 m²' },
      { label: 'Workstations', value: '140 Desks' },
      { label: 'Phone Booths', value: '8 Soundproof' }
    ]
  },
  1: {
    id: 1,
    numberStr: '01',
    name: 'Wellness & Breakout Floor',
    subtitle: 'Employee Recreation & Culinary Bar',
    tagline: 'RELAXATION & WELLBEING HUB',
    accentColor: 'text-amber-500',
    accentHex: '#FFBF00',
    description: 'Artisanal espresso bar, botanical relaxation zone, gaming tables, indoor trees, and quiet library lounge for team rejuvenation.',
    stats: [
      { label: 'Area', value: '1,600 m²' },
      { label: 'Bar Seats', value: '30 Lounge' },
      { label: 'Recreation', value: 'Ping-Pong & Library' }
    ]
  },
  0: {
    id: 0,
    numberStr: '00',
    name: 'Grand Reception Lobby',
    subtitle: 'HQ Welcome & Atrium Entrance',
    tagline: 'ARCHITECTURAL LOBBY STATEMENT',
    accentColor: 'text-amber-300',
    accentHex: '#FFD700',
    description: 'Double-height marble atrium, backlit illuminated NEXUS corporate logo wall, optical security turnstiles, and concierge desk.',
    stats: [
      { label: 'Ceiling Height', value: '8.0 meters' },
      { label: 'Atrium Glass', value: 'Ultra-Clear Facade' },
      { label: 'Access', value: 'Smart Turnstiles' }
    ]
  }
};

export type PostProcessingTier = 'high' | 'medium' | 'low';

interface ExperienceState {
  scrollProgress: number;
  activeFloor: number;
  isHero: boolean;
  isFinalReveal: boolean;
  
  isLoading: boolean;
  loadingProgress: number;
  isReady: boolean;
  
  audioEnabled: boolean;
  reducedMotion: boolean;
  debugMode: boolean; // Production mode: MUST be false
  
  fps: number;
  tier: PostProcessingTier;
  
  setScrollProgress: (progress: number) => void;
  setActiveFloor: (floor: number) => void;
  setLoadingProgress: (progress: number) => void;
  setIsReady: (ready: boolean) => void;
  toggleAudio: () => void;
  toggleReducedMotion: () => void;
  toggleDebugMode: () => void;
  setPerformanceMetrics: (fps: number, tier: PostProcessingTier) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  scrollProgress: 0,
  activeFloor: 6,
  isHero: true,
  isFinalReveal: false,
  
  isLoading: false,
  loadingProgress: 100,
  isReady: true,
  
  audioEnabled: false,
  reducedMotion: false,
  debugMode: false, // Set debugMode to false for clean production rendering
  
  fps: 60,
  tier: 'high',
  
  setScrollProgress: (progress) => {
    let floor = 6;
    let hero = false;
    let final = false;

    if (progress < 0.08) {
      floor = 6;
      hero = true;
    } else if (progress < 0.19) {
      floor = 6;
    } else if (progress < 0.36) {
      floor = 5;
    } else if (progress < 0.53) {
      floor = 4;
    } else if (progress < 0.70) {
      floor = 3;
    } else if (progress < 0.85) {
      floor = 2;
    } else if (progress < 0.92) {
      floor = 1;
    } else if (progress < 0.98) {
      floor = 0;
    } else {
      floor = 0;
      final = true;
    }

    set({
      scrollProgress: progress,
      activeFloor: floor,
      isHero: hero,
      isFinalReveal: final
    });
  },
  
  setActiveFloor: (activeFloor) => set({ activeFloor }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  setIsReady: (isReady) => set({ isReady, isLoading: false }),
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  toggleDebugMode: () => set((state) => ({ debugMode: !state.debugMode })),
  setPerformanceMetrics: (fps, tier) => set({ fps, tier })
}));

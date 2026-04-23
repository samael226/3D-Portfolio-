export interface PlanetData {
  id: string;
  name: string;
  orbitRadius: number;
  planetRadius: number;
  color: string;
  emissiveColor: string;
  orbitSpeed: number;
  content: {
    title: string;
    description: string;
    details: string[];
  };
}

export const planetData: PlanetData[] = [
  {
    id: 'skills',
    name: 'Skills',
    orbitRadius: 5,
    planetRadius: 0.8,
    color: '#4a9eff',
    emissiveColor: '#2a7edd',
    orbitSpeed: 0.01,
    content: {
      title: 'Technical Skills',
      description: 'Full-stack development with 3D expertise',
      details: [
        'React, Next.js, TypeScript',
        'Three.js, WebGL, 3D Modeling',
        'Node.js, Python, PostgreSQL',
        'UI/UX Design, Animation'
      ]
    }
  },
  {
    id: 'journey',
    name: 'Journey',
    orbitRadius: 8,
    planetRadius: 1.0,
    color: '#ff6b6b',
    emissiveColor: '#dd4b4b',
    orbitSpeed: 0.008,
    content: {
      title: 'My Journey',
      description: 'From code to creative experiences',
      details: [
        'Started with web development in 2020',
        'Discovered passion for 3D and interactive design',
        'Built immersive web experiences for clients',
        'Continuously learning and pushing boundaries'
      ]
    }
  },
  {
    id: 'passion',
    name: 'Passion',
    orbitRadius: 11,
    planetRadius: 0.9,
    color: '#ffd93d',
    emissiveColor: '#ddb90d',
    orbitSpeed: 0.006,
    content: {
      title: 'What Drives Me',
      description: 'Creating experiences that inspire',
      details: [
        'Blending art with technology',
        'Solving complex problems creatively',
        'Building things that matter',
        'Sharing knowledge with the community'
      ]
    }
  },
  {
    id: 'vision',
    name: 'Vision',
    orbitRadius: 14,
    planetRadius: 0.7,
    color: '#6bcf7f',
    emissiveColor: '#4baf5f',
    orbitSpeed: 0.004,
    content: {
      title: 'Future Vision',
      description: 'Where imagination meets innovation',
      details: [
        'Pioneering web-based 3D experiences',
        'Making immersive tech accessible',
        'Building the next generation of web',
        'Creating digital art that tells stories'
      ]
    }
  }
];

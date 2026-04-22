import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2021',
    title: 'Espoir Highschool',
    subtitle: 'Baccalaureate in computer science',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2024',
    title: 'ISIGK',
    subtitle: 'Computer Science Student',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2025',
    title: 'nefel education',
    subtitle: 'Software Developer Student',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: 'Coding Dojo',
    subtitle: 'Full Stack Developer Student',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -14),
    year: '2025',
    title: 'Hippomed Ai',
    subtitle: 'Full Stack Developer ',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -10),
    year: '2026',
    title: 'Freelancer',
    subtitle: 'Software Developer',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -18),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: '???',
    position: 'right',
  }
]
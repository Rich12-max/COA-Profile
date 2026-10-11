import React, { useState, useRef, useEffect } from 'react';
import profilePhoto from '../assets/profile/profile-photo.jpg';
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  // ── 1. 🧰 MY TOOLBOX state & technology items
  const [isTbHovered, setIsTbHovered] = useState(false);
  const [isTbMobileOpen, setIsTbMobileOpen] = useState(false);
  const [tbTilt, setTbTilt] = useState({ x: 0, y: 0 });
  const [tbSettled, setTbSettled] = useState(false);
  const tbStageRef = useRef(null);

  const isToolboxOpen = isTbHovered || isTbMobileOpen;

  useEffect(() => {
    let timer;
    if (isToolboxOpen) {
      timer = setTimeout(() => setTbSettled(true), 1100);
    } else {
      setTbSettled(false);
    }
    return () => clearTimeout(timer);
  }, [isToolboxOpen]);

  const toolboxItems = [
    {
      id: 'python',
      name: 'Python',
      category: 'Programming',
      color: '#387eb8',
      glow: 'rgba(56, 126, 184, 0.35)',
      tx: -290,
      ty: -160,
      rot: -4,
      delay: 0.18,
      floatDur: '4.8s',
      floatDelay: '0.2s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#387eb8" d="M63.5 8c-29.2 0-27.4 12.7-27.4 12.7l.1 13.1h27.9v4H25.4S8 35.8 8 65s15.2 28.3 15.2 28.3h9.1v-12.8s-.5-15.2 15-15.2h25.8s14.4.2 14.4-14V22.4S89.5 8 63.5 8zm-15.2 8.3a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6z"/>
          <path fill="#ffe052" d="M64.5 120c29.2 0 27.4-12.7 27.4-12.7l-.1-13.1H63.9v-4h38.7S120 92.2 120 63s-15.2-28.3-15.2-28.3h-9.1v12.8s.5 15.2-15 15.2H54.9s-14.4-.2-14.4 14v28.9s-2 14.4 24 14.4zm15.2-8.3a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6z"/>
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React',
      category: 'Web',
      color: '#61dafb',
      glow: 'rgba(97, 218, 251, 0.35)',
      tx: 175,
      ty: -210,
      rot: 3,
      delay: 0.14,
      floatDur: '5.0s',
      floatDelay: '0.4s',
      amp: '5px',
      icon: (
        <svg viewBox="-11.5 -10.23 23 20.46" aria-hidden="true">
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Web',
      color: '#f7df1e',
      glow: 'rgba(247, 223, 30, 0.35)',
      tx: 105,
      ty: -140,
      rot: -2,
      delay: 0.30,
      floatDur: '4.7s',
      floatDelay: '0.6s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <rect width="128" height="128" rx="14" fill="#f7df1e"/>
          <path d="M67.3 102.7c3.4 5.7 7.9 9.8 15.6 9.8 6.6 0 10.8-3.3 10.8-7.9 0-5.5-4.4-7.5-11.8-10.7-10.7-4.6-17.7-10.3-17.7-22.3 0-11.1 8.5-19.6 21.8-19.6 9.6 0 16.5 3.5 21.1 11.7l-9.6 6.2c-2.4-4.2-5.1-6-11.5-6-4.6 0-7.8 2.9-7.8 6.8 0 4.7 3.3 6.6 10.5 9.7 12.3 5.3 19.3 10.8 19.3 23.4 0 13.4-10.5 21.3-24.8 21.3-14 0-22.8-6.9-27.2-15.6l11.4-6.8zm-39.7.5c2.6 4.6 5.8 8.4 11.9 8.4 6.2 0 10.1-2.5 10.1-12.2V53.2h14v46.4c0 17-10 24.5-23.7 24.5-12.9 0-20.7-6.8-24.5-15.7l12.2-5.2z" fill="#000000"/>
        </svg>
      )
    },
    {
      id: 'html',
      name: 'HTML',
      category: 'Web',
      color: '#e44d26',
      glow: 'rgba(228, 77, 38, 0.35)',
      tx: -105,
      ty: -140,
      rot: 2,
      delay: 0.26,
      floatDur: '5.2s',
      floatDelay: '0.3s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#e44d26" d="M19.1 11.3l9 101 35.9 10 35.9-10 9-101H19.1z"/>
          <path fill="#f16529" d="M64 113.8l28.6-7.9 7.6-85.7H64v93.6z"/>
          <path fill="#ebebeb" d="M64 52.6H46.4l-1.2-13.8H64V25H31.5l3.6 41.5H64v-13.9zm0 33.6l-.1.1-15.9-4.3-1-11.4H33.2l2 22.3 28.8 8v-14.7z"/>
          <path fill="#ffffff" d="M64 52.6h17.6l-1.6 18.5-16 4.3v14.7l28.8-8 3.8-43.2H64v13.7zm0-27.6v13.8h32.5l1.2-13.8H64z"/>
        </svg>
      )
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'Web',
      color: '#1572b6',
      glow: 'rgba(21, 114, 182, 0.35)',
      tx: -320,
      ty: -85,
      rot: -3,
      delay: 0.34,
      floatDur: '5.3s',
      floatDelay: '0.5s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#1572b6" d="M19.1 11.3l9 101 35.9 10 35.9-10 9-101H19.1z"/>
          <path fill="#33a9dc" d="M64 113.8l28.6-7.9 7.6-85.7H64v93.6z"/>
          <path fill="#ebebeb" d="M64 52.6H46.4l-1.2-13.8H64V25H31.5l3.6 41.5H64v-13.9zm0 33.6l-.1.1-15.9-4.3-1-11.4H33.2l2 22.3 28.8 8v-14.7z"/>
          <path fill="#ffffff" d="M64 52.6h17.6l-1.6 18.5-16 4.3v14.7l28.8-8 3.8-43.2H64v13.7zm0-27.6v13.8h32.5l1.2-13.8H64z"/>
        </svg>
      )
    },
    {
      id: 'java',
      name: 'Java',
      category: 'Programming',
      color: '#e76f00',
      glow: 'rgba(231, 111, 0, 0.35)',
      tx: 290,
      ty: -160,
      rot: 4,
      delay: 0.22,
      floatDur: '4.9s',
      floatDelay: '0.7s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#5382a1" d="M46.7 94.8c-1.3.1-2.6.2-3.8.3 11.4 5.9 33.3 5.4 44.9-.7 3.8-2 6.7-4.6 7.7-7.4-12.7 7.7-36.8 8.1-48.8 7.8z"/>
          <path fill="#5382a1" d="M47.7 85.5c-7.9 3.9-1.9 8.2 5.5 8.1 11.5-.1 26.6-4.3 35.6-11.1 2.9-2.2 4.9-4.7 5.1-7.2-12.3 7.8-33.6 9.4-46.2 10.2z"/>
          <path fill="#e76f00" d="M66.4 12c-4.3 5-1.4 10.7 2.6 16.4 5.2 7.3 6.9 12.5.4 19.9-1.1 1.2-2.1 2.6-3.1 4.1 6.5-6.5 12.3-13.8 7.3-21.7-5.9-9.1-3.6-13.4-7.2-18.7z"/>
          <path fill="#e76f00" d="M53.6 30.6c-4.4 7.6-.8 13.9 4.3 19.8 4.2 4.9 5.8 8.7 1.8 14.8-1 1.5-2.1 3-3.2 4.7 5.7-6 10.9-13 7.1-20.8-5.3-10.7-3.7-14.2-10-18.5z"/>
          <path fill="#5382a1" d="M89.2 101.4c-15.3 7.5-47.5 7.4-60.8.2-2.3-1.2-3.7-2.6-4-4.1-1.3 4.2 3.8 8.3 13.2 11.5 17.5 6 43.1 5.4 58.7-2 4.3-2.1 7.2-4.6 7.7-7.3-3.2.7-9.5 1.4-14.8 1.7z"/>
        </svg>
      )
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'Backend',
      color: '#059669',
      glow: 'rgba(5, 150, 105, 0.35)',
      tx: -175,
      ty: -210,
      rot: -3,
      delay: 0.10,
      floatDur: '5.1s',
      floatDelay: '0.3s',
      amp: '5px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <circle cx="64" cy="64" r="56" fill="#059669"/>
          <path d="M69.8 19.2L35.2 67.8h23.5l-4.5 41 38.6-52.2H68.8l5.5-37.4z" fill="#ffffff"/>
        </svg>
      )
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      category: 'AI & Cloud',
      color: '#8b5cf6',
      glow: 'rgba(139, 92, 246, 0.4)',
      tx: 0,
      ty: -235,
      rot: 0,
      delay: 0.06,
      floatDur: '5.5s',
      floatDelay: '0.1s',
      amp: '5px',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="5" width="14" height="14" rx="3" stroke="#8b5cf6" strokeWidth="1.6" fill="#f5f3ff"/>
          <circle cx="9" cy="9" r="1.5" fill="#8b5cf6"/>
          <circle cx="15" cy="9" r="1.5" fill="#8b5cf6"/>
          <circle cx="12" cy="15" r="1.5" fill="#8b5cf6"/>
          <line x1="9" y1="9" x2="12" y2="15" stroke="#a78bfa" strokeWidth="1.2"/>
          <line x1="15" y1="9" x2="12" y2="15" stroke="#a78bfa" strokeWidth="1.2"/>
          <line x1="9" y1="9" x2="15" y2="9" stroke="#a78bfa" strokeWidth="1.2"/>
          <line x1="9" y1="2" x2="9" y2="5" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="15" y1="2" x2="15" y2="5" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="9" y1="19" x2="9" y2="22" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="15" y1="19" x2="15" y2="22" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="2" y1="9" x2="5" y2="9" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="2" y1="15" x2="5" y2="15" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="19" y1="9" x2="22" y2="9" stroke="#8b5cf6" strokeWidth="1.6"/>
          <line x1="19" y1="15" x2="22" y2="15" stroke="#8b5cf6" strokeWidth="1.6"/>
        </svg>
      )
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      category: 'AI & Cloud',
      color: '#0078d4',
      glow: 'rgba(0, 120, 212, 0.35)',
      tx: 320,
      ty: -85,
      rot: 3,
      delay: 0.38,
      floatDur: '5.2s',
      floatDelay: '0.2s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#0078d4" d="M72.9 8.2L32.4 78.4l27.1 23.3 45.9 18.1L120 98.4 72.9 8.2z"/>
          <path fill="#5ea0ef" d="M8 89.8l43.2-34.5 21.7 22.9-29.7 41.6L8 89.8z"/>
          <path fill="#005ba1" d="M51.2 55.3L32.4 78.4l10.8 41.4L8 89.8l43.2-34.5z"/>
        </svg>
      )
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'Programming',
      color: '#00599c',
      glow: 'rgba(0, 89, 156, 0.35)',
      tx: -305,
      ty: -5,
      rot: -2,
      delay: 0.42,
      floatDur: '5.0s',
      floatDelay: '0.4s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#00599c" d="M116.8 33.6L67.2 4.9c-2-.1-4-.1-6 0L11.6 33.6c-1.8 1-2.9 3-2.9 5v57.8c0 2 1.1 3.9 2.9 5l49.6 28.7c2 .1 4 .1 6 0l49.6-28.7c1.8-1 2.9-3 2.9-5V38.6c0-2-1.1-4-2.9-5z"/>
          <path fill="#004482" d="M64 4.9v118.2c2 .1 4 .1 6 0l49.6-28.7c1.8-1 2.9-3 2.9-5V38.6c0-2-1.1-4-2.9-5L70 4.9c-2-.1-4-.1-6 0z"/>
          <path fill="#ffffff" d="M53.5 86.8c-12.7 0-21.8-8.8-21.8-22.8 0-14 9.1-22.8 21.8-22.8 8.3 0 15.2 4.1 18.2 10.5l-9.1 5.3c-1.8-3.4-5.1-5.4-9.1-5.4-7.4 0-11.8 5.6-11.8 12.4s4.4 12.4 11.8 12.4c4 0 7.3-2 9.1-5.4l9.1 5.3c-3 6.4-9.9 10.5-18.2 10.5zm25.9-20.2h-4.3v-5.2h4.3v-4.3h5.2v4.3h4.3v5.2h-4.3v4.3h-5.2v-4.3zm18.3 0h-4.3v-5.2h4.3v-4.3h5.2v4.3h4.3v5.2h-4.3v4.3h-5.2v-4.3z"/>
        </svg>
      )
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Tools',
      color: '#f05032',
      glow: 'rgba(240, 80, 50, 0.35)',
      tx: 305,
      ty: -5,
      rot: 2,
      delay: 0.46,
      floatDur: '4.8s',
      floatDelay: '0.6s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#f05032" d="M122.7 56.6L71.4 5.3c-4.4-4.4-11.6-4.4-16 0L42.2 18.5l18.3 18.3c4.7-1.6 10.2-.5 13.9 3.2 3.7 3.7 4.8 9.2 3.2 13.9l17.6 17.6c4.7-1.6 10.2-.5 13.9 3.2 5.5 5.5 5.5 14.4 0 19.9-5.5 5.5-14.4 5.5-19.9 0-4-4-5-9.8-2.9-14.7L71.8 62.4v31.4c1.6.8 3.1 2 4.2 3.5 4.4 4.4 4.4 11.6 0 16-4.4 4.4-11.6 4.4-16 0-4.4-4.4-4.4-11.6 0-16 1.4-1.4 3.1-2.4 4.9-3V61.1c-1.8-.6-3.5-1.6-4.9-3-4-4-5-9.8-2.9-14.7L38.7 25.1 5.3 58.5c-4.4 4.4-4.4 11.6 0 16l51.3 51.3c4.4 4.4 11.6 4.4 16 0l50.1-50.1c4.4-4.4 4.4-11.6 0-15.1z"/>
        </svg>
      )
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Tools',
      color: '#24292e',
      glow: 'rgba(36, 41, 46, 0.35)',
      tx: 275,
      ty: 75,
      rot: -3,
      delay: 0.54,
      floatDur: '5.3s',
      floatDelay: '0.3s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#24292e" fillRule="evenodd" clipRule="evenodd" d="M64 5.3C28.7 5.3 0 34 0 69.4c0 28.3 18.4 52.3 43.8 60.8 3.2.6 4.4-1.4 4.4-3.1 0-1.5-.1-6.6-.1-12-17.8 3.9-21.6-7.6-21.6-7.6-2.9-7.4-7.1-9.4-7.1-9.4-5.8-4 .4-3.9.4-3.9 6.4.5 9.8 6.6 9.8 6.6 5.7 9.8 15 7 18.6 5.3 1.8-4.2 3.5-7 5.4-8.6-14.2-1.6-29.2-7.1-29.2-31.7 0-7 2.5-12.7 6.6-17.2-.7-1.6-2.9-8.2.6-17 0 0 5.4-1.7 17.7 6.6 5.1-1.4 10.6-2.1 16.1-2.2 5.5 0 11 .8 16.1 2.2 12.3-8.3 17.7-6.6 17.7-6.6 3.5 8.8 1.3 15.4.6 17 4.1 4.5 6.6 10.2 6.6 17.2 0 24.7-15 30.1-29.3 31.7 2.3 2 4.4 6 4.4 12.1 0 8.7-.1 15.8-.1 18 0 1.7 1.2 3.7 4.5 3.1 25.4-8.5 43.7-32.5 43.7-60.8 0-35.4-28.7-64.1-64-64.1z"/>
        </svg>
      )
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'Programming',
      color: '#0284c7',
      glow: 'rgba(2, 132, 199, 0.35)',
      tx: -275,
      ty: 75,
      rot: 3,
      delay: 0.50,
      floatDur: '5.1s',
      floatDelay: '0.5s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="8.5" ry="3" stroke="#0284c7" strokeWidth="1.8" fill="#e0f2fe"/>
          <path d="M3.5 5v5c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3V5" stroke="#0284c7" strokeWidth="1.8" fill="none"/>
          <path d="M3.5 10v5c0 1.66 3.8 3 8.5 3s8.5-1.34 8.5-3v-5" stroke="#0284c7" strokeWidth="1.8" fill="none"/>
          <text x="12" y="14" textAnchor="middle" fill="#0369a1" fontSize="5.5" fontWeight="bold" fontFamily="monospace">SQL</text>
        </svg>
      )
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Database',
      color: '#00758f',
      glow: 'rgba(0, 117, 143, 0.35)',
      tx: -190,
      ty: 145,
      rot: -2,
      delay: 0.58,
      floatDur: '5.4s',
      floatDelay: '0.7s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#00758f" d="M26.4 97.2c2.1-4.7 5.1-9 8.7-12.7 4.2-4.3 9.4-7.7 15.1-9.9 1.4-.5 2.8-1 4.3-1.4 3.7-.9 7.6-1.3 11.4-1.1 5.2.2 10.3 1.5 15 3.7 4.4 2.1 8.3 5 11.5 8.7 3.3 3.8 5.7 8.3 7 13.1.4 1.5.7 3.1.8 4.7.1 1.4-.4 2.7-1.4 3.6-1 1-2.4 1.4-3.8 1.2-2.8-.4-5.4-1.6-7.5-3.5-3.3-3-5.3-7.2-5.7-11.6-.2-2.1.2-4.2 1-6.1-4.1-1.3-8.5-1.7-12.8-1.2-4.3.5-8.3 2-11.8 4.3-3.6 2.4-6.4 5.7-8.1 9.6-1.5 3.3-1.8 7-.8 10.5.5 1.7 1.5 3.1 2.9 4.1-1.8.2-3.7-.2-5.3-1.1-3.6-2-6.1-5.5-7.1-9.5-1-4-.4-8.2 1.7-11.7z"/>
          <path fill="#f29111" d="M72.5 48.2c4.4-4.5 10.3-7.2 16.6-7.6 6.3-.4 12.5 1.5 17.5 5.3 4.8 3.7 8.2 9 9.6 15 1.3 6 .4 12.2-2.6 17.5-2.8 5-7.1 8.9-12.3 11.3 1.2-3.7 1.3-7.8.2-11.6-1-3.6-3.1-6.8-6-9.1-2.9-2.3-6.5-3.7-10.2-3.9-3.7-.3-7.4.6-10.6 2.4-1.2.7-2.3 1.5-3.3 2.5 1.1-4.1-.1-8.5-2.5-11.9z"/>
        </svg>
      )
    },
    {
      id: 'mariadb',
      name: 'MariaDB',
      category: 'Database',
      color: '#003545',
      glow: 'rgba(0, 53, 69, 0.35)',
      tx: 190,
      ty: 145,
      rot: 2,
      delay: 0.62,
      floatDur: '4.9s',
      floatDelay: '0.4s',
      amp: '4px',
      icon: (
        <svg viewBox="0 0 128 128" aria-hidden="true">
          <path fill="#003545" d="M21 78.4c4.3-13.8 15.6-24.3 29.8-27.4 9.1-2 18.6-.8 27 3.3 8.4 4.1 14.8 11.1 18.2 19.9 2.5 6.5 2.8 13.8.7 20.4-2 6.4-6.4 11.8-12.2 15.2-6 3.5-13.1 4.7-19.9 3.4-6.9-1.3-13.1-5.1-17.5-10.6-2.9-3.6-4.9-7.8-5.8-12.3-.9-4.5-.4-9.2 1.3-13.4 3-7.5 9-13.3 16.5-16 7.4-2.7 15.8-2 22.8 1.9 6.8 3.9 11.5 10.5 12.7 18.2.5 3.3.1 6.7-1.2 9.8"/>
          <circle cx="50" cy="58" r="4" fill="#c3996b"/>
        </svg>
      )
    }
  ];

  const handleTbMouseMove = (e) => {
    if (!tbStageRef.current) return;
    const rect = tbStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTbTilt({
      x: Math.round(-y * 8),
      y: Math.round(x * 8)
    });
  };

  const handleTbMouseEnter = () => {
    setIsTbHovered(true);
  };

  const handleTbMouseLeave = () => {
    setIsTbHovered(false);
    setTbTilt({ x: 0, y: 0 });
  };

  const handleTbToggle = () => {
    setIsTbMobileOpen((prev) => !prev);
  };

  // ── 2. 🧠 HOW MY BRAIN WORKS state
  const brainSteps = [
    { name: 'CURIOUS', desc: 'I like understanding how things work.' },
    { name: 'QUESTION', desc: 'I start by asking what, why and how.' },
    { name: 'EXPLORE', desc: 'I explore technologies and ideas that interest me.' },
    { name: 'EXPERIMENT', desc: 'I learn by trying things myself.' },
    { name: 'BUILD', desc: 'Projects help me turn concepts into something real.' },
    { name: 'LEARN', desc: 'Every project teaches me something new.' }
  ];
  const [isBrainExpanded, setIsBrainExpanded] = useState(true);
  const [activeBrainStep, setActiveBrainStep] = useState(0);

  // ── 3. 🎒 WHAT'S INSIDE MY BACKPACK state
  const [isBackpackOpen, setIsBackpackOpen] = useState(true);
  const backpackArtifacts = [
    {
      id: 'singing',
      emoji: '🎧',
      name: 'Singing',
      sub: 'Expression & melody',
      sentence: 'Finding rhythm, expression, and voice outside technology.'
    },
    {
      id: 'writing',
      emoji: '📓',
      name: 'Creative Writing',
      sub: 'Thoughts into words',
      sentence: 'A quiet space where I turn thoughts, observations, and reflections into words.'
    },
    {
      id: 'travel',
      emoji: '🗺️',
      name: 'Travelling',
      sub: 'New horizons',
      sentence: 'Stepping outside routine to discover new places, architecture, and perspectives.'
    },
    {
      id: 'ai',
      emoji: '🤖',
      name: 'AI',
      sub: 'Intelligent systems',
      sentence: 'Exploring machine learning, reasoning, and practical intelligent systems.'
    },
    {
      id: 'tech',
      emoji: '💻',
      name: 'Technology',
      sub: 'Building software',
      sentence: 'Turning logic and architecture into practical digital tools that work.'
    }
  ];
  const [activeBackpackArtifact, setActiveBackpackArtifact] = useState(backpackArtifacts[1]);

  // ── 4. 🧭 PERSONAL COMPASS state
  const compassBearings = {
    N: {
      label: 'CURIOUS',
      direction: 'North',
      angle: 0,
      desc: 'Always learning and questioning.'
    },
    E: {
      label: 'BUILDER',
      direction: 'East',
      angle: 90,
      desc: 'Turning ideas into projects.'
    },
    S: {
      label: 'EXPLORER',
      direction: 'South',
      angle: 180,
      desc: 'Discovering technologies, places and experiences.'
    },
    W: {
      label: 'CREATIVE',
      direction: 'West',
      angle: 270,
      desc: 'Finding ways to express ideas.'
    }
  };
  const [activeCompassKey, setActiveCompassKey] = useState('N');

  // ── 5. "You've Seen My Resume" state
  const resumeIdentities = [
    {
      word: 'BUILDER',
      desc: 'I enjoy turning ideas into practical projects.'
    },
    {
      word: 'LEARNER',
      desc: "I'm constantly exploring new technologies and concepts."
    },
    {
      word: 'CREATIVE',
      desc: 'Singing and creative writing give me a space outside technology.'
    },
    {
      word: 'EXPLORER',
      desc: 'I enjoy travelling and discovering new places.'
    }
  ];
  const [activeResumeWord, setActiveResumeWord] = useState('BUILDER');

  // ── 6. "Beyond Code" hover states
  const beyondCodeWords = [
    {
      word: 'SINGING',
      caption: 'Finding rhythm, expression, and voice outside technology.'
    },
    {
      word: 'CREATIVE WRITING',
      caption: 'Turning quiet thoughts, reflections, and ideas into words.'
    },
    {
      word: 'TRAVELLING',
      caption: 'Discovering new streets, skies, and stories.'
    },
    {
      word: 'EXPLORING',
      caption: 'Staying fascinated by unfamiliar questions and new horizons.'
    }
  ];
  const [activeBeyondWord, setActiveBeyondWord] = useState(beyondCodeWords[0]);

  const scrollToConnect = () => {
    const el = document.getElementById('connect-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="section" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container about-page-container">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* Soft Ambient Glows */}
        <div className="about-ambient-glow about-glow-1" aria-hidden="true" />
        <div className="about-ambient-glow about-glow-2" aria-hidden="true" />
        <div className="about-ambient-glow about-glow-3" aria-hidden="true" />

        {/* ── 1. HERO — "ME, IN ONE FRAME" ────────────────────────────── */}
        <section className="about-hero-section" aria-label="Introduction">
          <div className="about-hero-left">
            <div className="about-hero-label">
              <span className="about-hero-label-dot" aria-hidden="true" />
              <span>ABOUT ME &middot; 01</span>
            </div>

            <h1 className="about-hero-title">
              Hi, I'm Richa.
            </h1>

            <div className="about-hero-subtitle">
              Computer Science &amp; Engineering student exploring Artificial Intelligence, technology, and creative problem-solving.
            </div>

            <p className="about-hero-bio">
              I like learning by building, experimenting with ideas, and discovering where technology can take me.
            </p>

            <div className="about-hero-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const el = document.getElementById('toolbox-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Open My Toolbox &darr;
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={scrollToConnect}
              >
                Let's Connect &#8599;
              </button>
            </div>
          </div>

          {/* Right: Editorial Framed Photo (No AI Alteration) */}
          <div className="about-photo-centerpiece">
            <div className="about-photo-stage">
              <div className="about-photo-back-offset" aria-hidden="true" />

              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Richa Sharma"
                  className="about-photo-img"
                  loading="eager"
                />
              </div>

              {/* Decorative Subtle Elements */}
              <div className="about-scrap-chip about-scrap-chip-tl">
                Richa Sharma
              </div>
              <div className="about-scrap-chip about-scrap-chip-tr">
                CSE &times; AI
              </div>
              <div className="about-scrap-chip about-scrap-chip-br">
                2025&mdash;2029
              </div>

              <span className="about-scrap-binary" style={{ top: '18px', left: '-22px' }} aria-hidden="true">01</span>
              <span className="about-scrap-binary" style={{ bottom: '22px', right: '-24px' }} aria-hidden="true">10</span>
              <span className="about-scrap-sparkle" style={{ top: '-18px', right: '14px' }} aria-hidden="true">&#10022;</span>
              <span className="about-scrap-sparkle" style={{ bottom: '-16px', left: '16px', color: 'var(--accent-sage)' }} aria-hidden="true">&#10022;</span>
            </div>
          </div>
        </section>

        {/* ── 2. 🧰 MY TOOLBOX — REAL PHYSICAL INTERACTIVE TOOLBOX ──────── */}
        <section id="toolbox-section" className="about-section-group" aria-labelledby="toolbox-heading">
          <div className="about-toolbox-pavilion">
            <div className="about-section-header-clean" style={{ marginBottom: '0.75rem' }}>
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🧰</span> WHAT I USE &bull; CRAFT &amp; CODE
              </span>
              <h2 className="about-section-heading" id="toolbox-heading">
                MY TOOLBOX
              </h2>
              <div className="about-section-subline">
                Things I build with &bull; Hover or tap the toolbox to open
              </div>
            </div>

            {/* Central 3D Interactive Hero Arena */}
            <div
              ref={tbStageRef}
              className={`about-tb-hero-stage ${isToolboxOpen ? 'is-open' : ''}`}
              onMouseMove={handleTbMouseMove}
              onMouseEnter={handleTbMouseEnter}
              onMouseLeave={handleTbMouseLeave}
              aria-label="Interactive Developer Toolbox"
            >
              {/* Floating Logos Halo (emerges upward & outward from the toolbox) */}
              <div className="about-tb-floating-halo" aria-hidden={!isToolboxOpen}>
                {toolboxItems.map((tool) => (
                  <div
                    key={tool.id}
                    className={`about-tb-floating-chip ${tbSettled ? 'is-settled' : ''}`}
                    tabIndex={isToolboxOpen ? 0 : -1}
                    role="button"
                    aria-label={`${tool.name} (${tool.category})`}
                    style={{
                      '--tx': `${tool.tx}px`,
                      '--ty': `${tool.ty}px`,
                      '--rot': `${tool.rot}deg`,
                      '--float-dur': tool.floatDur,
                      '--float-delay': tool.floatDelay,
                      '--amp': tool.amp,
                      '--tool-color': tool.color,
                      '--tool-glow': tool.glow,
                      transitionDelay: isToolboxOpen ? `${tool.delay}s` : '0s'
                    }}
                  >
                    <div className="about-tb-chip-icon">
                      {tool.icon}
                    </div>
                    <span className="about-tb-chip-name">{tool.name}</span>

                    {/* Small Elegant Micro-Tooltip */}
                    <div className="about-tb-chip-tooltip">
                      <span className="about-tb-chip-tooltip-cat">{tool.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Physical Toolbox Assembly */}
              <div
                className="about-tb-assembly-wrapper"
                onClick={handleTbToggle}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleTbToggle();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-expanded={isToolboxOpen}
                aria-label={isToolboxOpen ? "Close developer toolbox" : "Open developer toolbox to reveal technologies"}
              >
                <div
                  className="about-tb-chassis-stage"
                  style={{
                    transform: `rotateX(${tbTilt.x}deg) rotateY(${tbTilt.y}deg)`
                  }}
                >
                  {/* Arched Top Metallic Handle */}
                  <div className="about-tb-handle-unit" aria-hidden="true">
                    <div className="about-tb-handle-bar">
                      <div className="about-tb-handle-bracket bracket-left" />
                      <div className="about-tb-handle-bracket bracket-right" />
                    </div>
                  </div>

                  {/* Upper Hinged Lid */}
                  <div className="about-tb-lid">
                    <div className="about-tb-corner-bumper tl" aria-hidden="true" />
                    <div className="about-tb-corner-bumper tr" aria-hidden="true" />
                    <div className="about-tb-corner-bumper bl" aria-hidden="true" />
                    <div className="about-tb-corner-bumper br" aria-hidden="true" />

                    {/* Center Latch Clasp */}
                    <div className="about-tb-latch-assembly">
                      <div className="about-tb-latch-clasp">
                        <div className="about-tb-latch-slot" />
                      </div>
                    </div>
                  </div>

                  {/* Recessed Interior Tool Cavity */}
                  <div className="about-tb-interior-cavity" aria-hidden="true">
                    <div className="about-tb-interior-glow" />
                    <div className="about-tb-interior-tray-rim" />
                  </div>

                  {/* Lower Main Chassis / Body */}
                  <div className="about-tb-chassis">
                    <div className="about-tb-latch-catch" aria-hidden="true" />

                    {/* Engraved Brass Nameplate */}
                    <div className="about-tb-nameplate">
                      <span className="about-tb-nameplate-text">R.S. / TOOLBOX</span>
                      <span className="about-tb-nameplate-sub">CRAFT &amp; CODE</span>
                    </div>

                    {/* Skid Feet */}
                    <div className="about-tb-chassis-feet" aria-hidden="true">
                      <div className="about-tb-foot" />
                      <div className="about-tb-foot" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Cue Pill */}
              <div className="about-tb-status-cue" aria-live="polite">
                <span className="about-tb-status-indicator" aria-hidden="true" />
                <span>
                  {isToolboxOpen
                    ? 'Toolbox Open • Hover tools or tap to close'
                    : 'Hover or tap toolbox to open'}
                </span>
              </div>

              {/* Close / Pack Away Control when open */}
              {isToolboxOpen && (
                <div className="about-tb-close-action-row">
                  <button
                    type="button"
                    className="about-tb-pack-away-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTbMobileOpen(false);
                      setIsTbHovered(false);
                      setTbTilt({ x: 0, y: 0 });
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Close Toolbox &amp; Pack Away</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 3. 🧠 HOW MY BRAIN WORKS — THOUGHT EXPANSION ────────────── */}
        <section className="about-section-group" aria-labelledby="brain-heading">
          <div className="about-brain-interactive-pavilion">
            <div className="about-section-header-clean">
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🧠</span> HOW I LEARN &bull; COGNITIVE LOOP
              </span>
              <h2 className="about-section-heading" id="brain-heading">
                HOW MY BRAIN WORKS
              </h2>
              <div className="about-section-subline">
                I usually learn by following this loop.
              </div>
            </div>

            {/* Center Brain Object */}
            <div className="about-brain-thought-stage">
              <button
                type="button"
                className="about-brain-center-btn"
                onClick={() => setIsBrainExpanded((prev) => !prev)}
                aria-label="Toggle cognitive thoughts radiation"
                title="Click brain to toggle thought flow"
              >
                <div className={`about-brain-glyph-box ${isBrainExpanded ? 'is-active' : ''}`}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-lavender)' }}>
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z"></path>
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z"></path>
                  </svg>
                  <div className="about-brain-radial-wave" aria-hidden="true" />
                </div>
              </button>
              <div className="about-brain-callout-text">
                {isBrainExpanded ? '● Thoughts radiating outward' : 'Click brain to expand thoughts'}
              </div>

              {/* Radiating Cognitive Loop Track */}
              {isBrainExpanded && (
                <div className="about-brain-loop-track" role="tablist" aria-label="Learning loop steps">
                  {brainSteps.map((step, idx) => (
                    <React.Fragment key={step.name}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeBrainStep === idx}
                        className={`about-brain-node-btn ${activeBrainStep === idx ? 'active' : ''}`}
                        onClick={() => setActiveBrainStep(idx)}
                        onMouseEnter={() => setActiveBrainStep(idx)}
                      >
                        <span>{step.name}</span>
                      </button>
                      {idx < brainSteps.length - 1 && (
                        <span className="about-brain-arrow-symbol" aria-hidden="true">&rarr;</span>
                      )}
                      {idx === brainSteps.length - 1 && (
                        <span className="about-brain-arrow-symbol" aria-hidden="true" title="Loops back to CURIOUS">&#8634;</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Active Stage Quote Dossier */}
            <div className="about-brain-stage-dossier">
              <div className="about-brain-stage-title-wrap">
                <span className="about-brain-step-num">STAGE 0{activeBrainStep + 1} OF 06</span>
                <span className="about-brain-step-name">{brainSteps[activeBrainStep].name}</span>
              </div>

              <p className="about-brain-stage-quote">
                &ldquo;{brainSteps[activeBrainStep].desc}&rdquo;
              </p>

              <button
                type="button"
                className="btn btn-sm btn-outline"
                onClick={() => setActiveBrainStep((prev) => (prev + 1) % brainSteps.length)}
              >
                <span>Next Step &rarr;</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── 4. 🎒 WHAT'S INSIDE MY BACKPACK? — REVEAL MY INTERESTS ───── */}
        <section className="about-section-group" aria-labelledby="backpack-heading">
          <div className="about-backpack-pavilion">
            <div className="about-section-header-clean">
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🎒</span> WHAT I ENJOY &bull; DAILY ESSENTIALS
              </span>
              <h2 className="about-section-heading" id="backpack-heading">
                WHAT'S INSIDE MY BACKPACK?
              </h2>
              <div className="about-section-subline">
                A few things that come with me wherever I go.
              </div>
            </div>

            {/* The Backpack Object */}
            <div className="about-backpack-stage">
              <button
                type="button"
                className="about-backpack-bag-btn"
                onClick={() => setIsBackpackOpen((prev) => !prev)}
                aria-expanded={isBackpackOpen}
                aria-label={isBackpackOpen ? "Pack backpack" : "Unpack backpack to reveal interests"}
              >
                <div className={`about-backpack-bag-art ${isBackpackOpen ? 'is-open' : ''}`}>
                  <div className="about-backpack-strap" aria-hidden="true" />
                  <div className="about-backpack-zipper-line">
                    <div className="about-backpack-pull-tab" />
                  </div>
                  <div className="about-backpack-label-pill">RICHA'S PACK</div>
                  <div className="about-backpack-click-cue">
                    <span>{isBackpackOpen ? '▲ Click to pack bag' : '▼ Click to unpack essentials'}</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Emerged Objects Arc */}
            <div className={`about-backpack-emerged-row ${isBackpackOpen ? 'is-open' : 'is-closed'}`}>
              {backpackArtifacts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`about-backpack-artifact-btn ${activeBackpackArtifact.id === item.id ? 'active' : ''}`}
                  onClick={() => setActiveBackpackArtifact(item)}
                >
                  <span className="about-backpack-artifact-emoji">{item.emoji}</span>
                  <div className="about-backpack-artifact-info">
                    <span className="about-backpack-artifact-name">{item.name}</span>
                    <span className="about-backpack-artifact-sub">{item.sub}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Discovery Plaque */}
            <div className="about-backpack-discovery-plaque">
              <div className="about-backpack-plaque-emoji">{activeBackpackArtifact.emoji}</div>
              <div className="about-backpack-plaque-text">
                <h4>{activeBackpackArtifact.name}</h4>
                <p>&ldquo;{activeBackpackArtifact.sentence}&rdquo;</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. 🧭 MY PERSONAL COMPASS — DYNAMIC NEEDLE ──────────────── */}
        <section className="about-section-group" aria-labelledby="compass-heading">
          <div className="about-compass-pavilion">
            {/* Left: Compass Dial with Rotating Needle */}
            <div className="about-compass-dial-stage">
              <div className="about-compass-inner-ring" />

              {/* Dynamic Rotating Needle */}
              <div
                className="about-compass-needle-pivot"
                style={{
                  transform: `rotate(${compassBearings[activeCompassKey].angle}deg)`
                }}
                aria-hidden="true"
              >
                <div className="about-compass-needle-north" />
                <div className="about-compass-needle-south" />
              </div>

              {/* Center Hub */}
              <div className="about-compass-me-hub">ME</div>

              {/* 4 Cardinal Buttons */}
              <button
                type="button"
                className={`about-compass-dir-btn north ${activeCompassKey === 'N' ? 'active' : ''}`}
                onClick={() => setActiveCompassKey('N')}
                onMouseEnter={() => setActiveCompassKey('N')}
                title="North: Curious"
              >
                CURIOUS &uarr;
              </button>

              <button
                type="button"
                className={`about-compass-dir-btn east ${activeCompassKey === 'E' ? 'active' : ''}`}
                onClick={() => setActiveCompassKey('E')}
                onMouseEnter={() => setActiveCompassKey('E')}
                title="East: Builder"
              >
                BUILDER &rarr;
              </button>

              <button
                type="button"
                className={`about-compass-dir-btn south ${activeCompassKey === 'S' ? 'active' : ''}`}
                onClick={() => setActiveCompassKey('S')}
                onMouseEnter={() => setActiveCompassKey('S')}
                title="South: Explorer"
              >
                EXPLORER &darr;
              </button>

              <button
                type="button"
                className={`about-compass-dir-btn west ${activeCompassKey === 'W' ? 'active' : ''}`}
                onClick={() => setActiveCompassKey('W')}
                onMouseEnter={() => setActiveCompassKey('W')}
                title="West: Creative"
              >
                &larr; CREATIVE
              </button>
            </div>

            {/* Right: Direction Dossier */}
            <div className="about-compass-reading-dossier">
              <span className="about-compass-reading-dir-label">
                {compassBearings[activeCompassKey].direction} BEARING &bull; WHAT GUIDES ME
              </span>
              <h3 className="about-compass-reading-title">
                {compassBearings[activeCompassKey].label}
              </h3>
              <p className="about-compass-reading-desc">
                &ldquo;{compassBearings[activeCompassKey].desc}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. 🪞 "YOU'VE SEEN MY RESUME" ──────────────────────────── */}
        <section className="about-section-group" aria-labelledby="resume-heading">
          <div className="about-resume-identity-panel">
            <div className="about-section-header-clean">
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🪞</span> THE PERSON BEHIND IT
              </span>
              <h2 className="about-section-heading" id="resume-heading">
                You've seen my resume.
              </h2>
              <div className="about-section-subline" style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 500 }}>
                Here's the person behind it.
              </div>
            </div>

            <div className="about-resume-words-showcase">
              {resumeIdentities.map((item) => (
                <div
                  key={item.word}
                  className={`about-resume-word-tile ${activeResumeWord === item.word ? 'active' : ''}`}
                  onClick={() => setActiveResumeWord(item.word)}
                  onMouseEnter={() => setActiveResumeWord(item.word)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveResumeWord(item.word);
                  }}
                >
                  <div className="about-resume-word-heading">
                    {item.word}
                  </div>
                  <p className="about-resume-word-reflection">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. 💭 "THINGS I'M CURIOUS ABOUT" ───────────────────────── */}
        <section className="about-section-group" aria-labelledby="curious-heading">
          <div className="about-section-header-clean">
            <span className="about-section-eyebrow">
              <span aria-hidden="true">💭</span> OPEN QUESTIONS
            </span>
            <h2 className="about-section-heading" id="curious-heading">
              THINGS I'M CURIOUS ABOUT
            </h2>
            <div className="about-section-subline">
              Instead of claiming expertise, here are the questions driving my exploration.
            </div>
          </div>

          <div className="about-curious-questions-list">
            {[
              'How can AI solve practical problems?',
              'How can software make everyday tasks easier?',
              'What can I build with the technologies I\'m learning?',
              'How do complex systems actually work?'
            ].map((question, idx) => (
              <div key={idx} className="about-curious-question-card">
                <span className="about-curious-num">0{idx + 1}</span>
                <p className="about-curious-prompt">{question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. 🌱 "CURRENTLY BECOMING..." ──────────────────────────── */}
        <section className="about-section-group" aria-labelledby="becoming-heading">
          <div className="about-becoming-narrative-card">
            <span className="about-section-eyebrow" style={{ justifyContent: 'center' }}>
              <span aria-hidden="true">🌱</span> CONTINUOUS EVOLUTION
            </span>
            <h2 className="about-section-heading" id="becoming-heading">
              CURRENTLY BECOMING...
            </h2>

            <div className="about-becoming-sequence-flow">
              <span className="about-becoming-token">developer</span>
              <span className="about-becoming-connector-arrow" aria-hidden="true">&darr;</span>
              <span className="about-becoming-token">problem solver</span>
              <span className="about-becoming-connector-arrow" aria-hidden="true">&darr;</span>
              <span className="about-becoming-token">AI explorer</span>
              <span className="about-becoming-connector-arrow" aria-hidden="true">&darr;</span>
              <span className="about-becoming-token">better builder</span>
              <span className="about-becoming-connector-arrow" aria-hidden="true">&darr;</span>
              <span className="about-becoming-token highlight-learn">still learning</span>
            </div>

            <p className="about-becoming-philosophical-line">
              &ldquo;I'm still figuring things out &mdash; and that's part of the journey.&rdquo;
            </p>
          </div>
        </section>

        {/* ── 9. 🎒 "A FEW THINGS ABOUT ME" ──────────────────────────── */}
        <section className="about-section-group" aria-labelledby="things-heading">
          <div className="about-section-header-clean">
            <span className="about-section-eyebrow">
              <span aria-hidden="true">🎒</span> QUICK SNAPSHOTS
            </span>
            <h2 className="about-section-heading" id="things-heading">
              A FEW THINGS ABOUT ME
            </h2>
          </div>

          <div className="about-few-things-ledger">
            {[
              'I enjoy learning by building.',
              "I'm curious about Artificial Intelligence.",
              'I enjoy creative writing.',
              'I love singing.',
              'I enjoy travelling and exploring places.',
              "I'm always curious about what I can build next."
            ].map((fact, idx) => (
              <div key={idx} className="about-few-things-entry">
                <span className="about-few-things-counter">0{idx + 1}</span>
                <p className="about-few-things-statement">{fact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. 🎓 "MY JOURNEY SO FAR" ──────────────────────────────── */}
        <section className="about-section-group" aria-labelledby="journey-heading">
          <div className="about-journey-chronicle-card">
            <div className="about-section-header-clean">
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🎓</span> ACADEMIC PATH
              </span>
              <h2 className="about-section-heading" id="journey-heading">
                MY JOURNEY SO FAR
              </h2>
            </div>

            <div className="about-journey-vertical-path">
              <div className="about-journey-milestone-node">
                <div className="about-journey-pin-dot" aria-hidden="true" />
                <div className="about-journey-milestone-year">2025</div>
                <div className="about-journey-milestone-title">Started my Computer Science journey</div>
                <div className="about-journey-milestone-desc">
                  Kendriya Vidyalaya Mankhurd &rarr; Chandigarh University
                </div>
              </div>

              <div className="about-journey-milestone-node">
                <div className="about-journey-pin-dot" aria-hidden="true" />
                <div className="about-journey-milestone-year">2025&mdash;2029</div>
                <div className="about-journey-milestone-title">B.E. Computer Science &amp; Engineering</div>
                <div className="about-journey-milestone-desc">
                  Specialization: <strong>Artificial Intelligence</strong> &bull; Chandigarh University
                </div>
              </div>

              <div className="about-journey-milestone-node">
                <div className="about-journey-pin-dot" aria-hidden="true" style={{ borderColor: 'var(--accent-sage)' }} />
                <div className="about-journey-milestone-year" style={{ color: 'var(--accent-sage)' }}>NOW</div>
                <div className="about-journey-milestone-title" style={{ fontStyle: 'italic' }}>
                  Learning &rarr; Building &rarr; Experimenting
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 11. ✦ "ONE MOMENT I'M PROUD OF" ─────────────────────────── */}
        <section className="about-section-group" aria-label="Proud Moment">
          <div className="about-proud-moment-card">
            <div className="about-proud-moment-num-stat">03</div>
            <div className="about-proud-moment-info">
              <div className="about-proud-moment-header-tag">
                <span>ONE MOMENT I'M PROUD OF</span>
                <span aria-hidden="true">&#10022;</span>
              </div>
              <h3 className="about-proud-moment-title">
                3rd Position &bull; IKS Ideathon
              </h3>
              <div className="about-proud-moment-venue">
                Chandigarh University
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. 🌿 "BEYOND CODE" ────────────────────────────────────── */}
        <section className="about-section-group" aria-labelledby="beyond-heading">
          <div className="about-beyond-code-pavilion">
            <div className="about-section-header-clean">
              <span className="about-section-eyebrow">
                <span aria-hidden="true">🌿</span> PASSIONS &amp; SPACES
              </span>
              <h2 className="about-section-heading" id="beyond-heading">
                BEYOND CODE
              </h2>
              <div className="about-section-subline">
                The creative and human dimensions that enrich my worldview.
              </div>
            </div>

            <div className="about-beyond-code-grid">
              {beyondCodeWords.map((item) => (
                <div
                  key={item.word}
                  className="about-beyond-code-item"
                  onMouseEnter={() => setActiveBeyondWord(item)}
                  onClick={() => setActiveBeyondWord(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveBeyondWord(item);
                  }}
                >
                  <div className="about-beyond-code-headline">
                    {item.word}
                  </div>
                  <p className="about-beyond-code-subsentence">
                    {item.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. ✦ FINAL SECTION ─────────────────────────────────────── */}
        <section id="connect-section" className="about-final-closing-stage" aria-label="Closing Note">
          <div className="about-final-triplet-text">
            Still learning.<br />
            Still building.<br />
            Still curious.
          </div>

          <p className="about-final-call-to-build">
            Let's build something interesting.
          </p>

          <a
            href="https://www.linkedin.com/in/richa-sharma-b55244382/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Let's Connect &#8599;
          </a>

          <div className="about-final-socials-row">
            <a
              href="https://github.com/Rich12-max"
              target="_blank"
              rel="noopener noreferrer"
              className="about-final-social-pill"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/richa-sharma-b55244382/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-final-social-pill"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * Centralized API & Service Layer (Standalone & Vercel-Ready)
 * Executes all COA simulations, radix conversions, and academic data queries
 * directly in client-side JavaScript with zero dependency on any backend server.
 */

import { convertNumberSystem } from './numberConverter';
import { calculateCacheMapping } from './cacheSimulator';
import {
  achievementsData,
  assignmentsData,
  assignment1Data,
  projectsData
} from '../data/academicData';

// Helper to simulate immediate async execution
const asyncResolve = (data, delay = 40) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

export const apiService = {
  // System Health
  checkHealth: async () => {
    return asyncResolve({
      status: "healthy",
      platform: "COA Learning Platform (Vercel Standalone)",
      version: "2.0.0",
    });
  },

  // Number System Converter
  convertNumber: async (payload) => {
    return asyncResolve(convertNumberSystem(payload));
  },

  // Cache Mapping Endpoints
  calculate0WayCache: async (payload) => {
    return asyncResolve(calculateCacheMapping({ ways: 0, ...payload }));
  },

  calculate1WayCache: async (payload) => {
    return asyncResolve(calculateCacheMapping({ ways: 1, ...payload }));
  },

  calculate2WayCache: async (payload) => {
    return asyncResolve(calculateCacheMapping({ ways: 2, ...payload }));
  },

  calculate3WayCache: async (payload) => {
    return asyncResolve(calculateCacheMapping({ ways: 3, ...payload }));
  },

  // Academic Database Records
  getAchievements: async (category = 'all') => {
    let data = achievementsData;
    if (category && category !== 'all') {
      data = achievementsData.filter(item => item.category === category);
    }
    return asyncResolve(data);
  },

  getAssignments: async () => {
    return asyncResolve(assignmentsData);
  },

  getAssignmentById: async (id) => {
    const item = assignmentsData.find(a => a.id === parseInt(id, 10)) || assignment1Data;
    return asyncResolve(item);
  },

  getProjects: async () => {
    return asyncResolve(projectsData);
  },
};

export default apiService;

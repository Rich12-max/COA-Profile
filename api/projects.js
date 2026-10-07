import { projectsData } from '../src/data/academicData.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json(projectsData);
}

import { achievementsData } from '../src/data/academicData.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { category } = req.query || {};
  let data = achievementsData;
  if (category && category !== 'all') {
    data = achievementsData.filter(item => item.category === category);
  }
  return res.status(200).json(data);
}

import { assignmentsData, assignment1Data } from '../src/data/academicData.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { id } = req.query || {};
  if (id) {
    const item = assignmentsData.find(a => a.id === parseInt(id, 10)) || assignment1Data;
    return res.status(200).json(item);
  }
  return res.status(200).json(assignmentsData);
}

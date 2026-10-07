import { calculateCacheMapping } from '../../src/services/cacheSimulator.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const payload = req.method === 'POST' ? req.body : req.query;
    const result = calculateCacheMapping({ ways: 1, ...(payload || {}) });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Calculation failed' });
  }
}

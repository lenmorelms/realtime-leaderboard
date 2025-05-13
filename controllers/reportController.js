import Score from '../models/Score.js';

const topPlayersReport = async (req, res) => {
  const { range = 'week', limit = 10 } = req.query;
  const now = new Date();
  const from = new Date(now);

  if (range === 'week') {
    from.setDate(now.getDate() - 7);
  } else if (range === 'day') {
    from.setDate(now.getDate() - 1);
  }

  const report = await Score.aggregate([
    { $match: { createdAt: { $gte: from } } },
    { $group: { _id: '$userId', total: { $sum: '$score' } } },
    { $sort: { total: -1 } },
    { $limit: parseInt(limit) }
  ]);

  res.json(report);
};

export default topPlayersReport;

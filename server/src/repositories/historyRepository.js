import Analysis from '../models/Analysis.js';
import Competitor from '../models/Competitor.js';
import Search from '../models/Search.js';

export async function findHistory({ clerkId, limit = 25 } = {}) {
  if (!clerkId || typeof clerkId !== 'string' || clerkId.trim() === '') {
    return [];
  }
  // ⚡ Bolt: Added .lean() to bypass Mongoose hydration, saving memory overhead and execution time for this read-only query.
  return Analysis.find({ clerkId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('search')
    .select('-rawAiResponse')
    .lean()
    .exec();
}

export async function findHistoryById(id, clerkId) {
  if (!clerkId || typeof clerkId !== 'string' || clerkId.trim() === '') {
    // Never do an unscoped lookup — throw immediately so the controller
    // surfaces a 401/500 rather than fetching an arbitrary document.
    throw new Error('[historyRepository] findHistoryById called without a valid clerkId — refusing unscoped lookup.');
  }
  // Ownership is enforced at the database level: the query only succeeds if
  // the document's clerkId matches. Returns null (→ 404) if the id exists but
  // belongs to another user, preventing data-existence timing attacks.
  // ⚡ Bolt: Added .lean() to bypass Mongoose hydration for performance gain on this read-only retrieval.
  return Analysis.findOne({ _id: id, clerkId }).populate('search').populate('competitors').lean().exec();
}


export async function deleteHistoryById(id, clerkId) {
  if (!clerkId || typeof clerkId !== 'string' || clerkId.trim() === '') {
    throw new Error('[historyRepository] deleteHistoryById called without a valid clerkId — refusing unscoped deletion.');
  }

  const analysis = await Analysis.findOne({ _id: id, clerkId }).exec();

  if (!analysis) {
    return null;
  }

  await Competitor.deleteMany({ _id: { $in: analysis.competitors } }).exec();
  await Search.deleteOne({ _id: analysis.search }).exec();
  await Analysis.deleteOne({ _id: analysis._id }).exec();

  return analysis;
}

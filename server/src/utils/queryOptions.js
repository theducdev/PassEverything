export const SORT_OPTIONS = {
  newest: { column: 'posted_at', direction: 'DESC' },
  oldest: { column: 'posted_at', direction: 'ASC' },
  likes_desc: { column: 'likes', direction: 'DESC' },
  likes_asc: { column: 'likes', direction: 'ASC' },
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 9;
export const MAX_LIMIT = 50;

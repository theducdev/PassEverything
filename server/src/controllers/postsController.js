import pool from '../config/database.js';
import { SORT_OPTIONS } from '../utils/queryOptions.js';

function mapPostRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    posted_at: row.posted_at ? new Date(row.posted_at).toISOString() : null,
    duration: row.duration,
    content: row.content,
    likes: row.likes,
    comments: row.comments,
    category: row.category,
    url: row.url,
    created_at: row.created_at ? new Date(row.created_at).toISOString() : null,
    updated_at: row.updated_at ? new Date(row.updated_at).toISOString() : null,
  };
}

export async function getPosts(req, res, next) {
  try {
    const { page, limit, q, category, sort } = req.validatedQuery;

    const { column, direction } = SORT_OPTIONS[sort];

    const values = [];
    const conditions = [];

    if (q) {
      values.push(`%${q}%`);
      conditions.push(`(title ILIKE $${values.length} OR content ILIKE $${values.length})`);
    }

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const countQuery = `SELECT COUNT(*) FROM posts ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count, 10);

    const offset = (page - 1) * limit;
    values.push(limit);
    values.push(offset);
    const dataQuery = `
      SELECT id, title, posted_at, duration, content, likes, comments, category, url, created_at, updated_at
      FROM posts
      ${whereClause}
      ORDER BY ${column} ${direction}
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `;

    const dataResult = await pool.query(dataQuery, values);

    const posts = dataResult.rows.map(mapPostRow);

    res.json({
      data: posts,
      meta: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getPostById(req, res, next) {
  try {
    const { id } = req.validatedParams;
    const query = `
      SELECT id, title, posted_at, duration, content, likes, comments, category, url, created_at, updated_at
      FROM posts
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(mapPostRow(result.rows[0]));
  } catch (error) {
    next(error);
  }
}

export async function getCategories(req, res, next) {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM posts WHERE category IS NOT NULL ORDER BY category ASC');
    const categories = result.rows
      .map((row) => row.category)
      .filter((category) => category && category.trim().length > 0);
    res.json(categories);
  } catch (error) {
    next(error);
  }
}

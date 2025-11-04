CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  posted_at TIMESTAMPTZ NOT NULL,
  duration TEXT,
  content TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  category VARCHAR(100),
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_posted_at ON posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_likes ON posts(likes DESC);

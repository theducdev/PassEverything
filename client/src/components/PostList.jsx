import PostCard from './PostCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';

export default function PostList({ posts, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <p className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
        Không tìm thấy bài viết nào. Thử thay đổi từ khoá hoặc bộ lọc nhé!
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

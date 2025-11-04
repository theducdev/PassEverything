import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostDetail from '../components/PostDetail.jsx';
import SkeletonCard from '../components/SkeletonCard.jsx';

const fetchPost = async (id) => {
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: Boolean(id),
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
      <Link to="/" className="w-fit text-sm text-sky-300 hover:text-sky-100">
        ← Quay lại danh sách
      </Link>

      {isLoading && <SkeletonCard />}

      {isError && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-200">
          Không tìm thấy bài viết hoặc có lỗi xảy ra.
        </div>
      )}

      {!isLoading && !isError && <PostDetail post={data} />}
    </main>
  );
}

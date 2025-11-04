import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import Filters from '../components/Filters.jsx';
import PostList from '../components/PostList.jsx';
import Pagination from '../components/Pagination.jsx';

const LIMIT = 9;

const fetchPosts = async ({ page, q, category, sort }) => {
  const params = new URLSearchParams({ page, limit: LIMIT, sort });
  if (q) params.append('q', q);
  if (category) params.append('category', category);
  const { data } = await axios.get(`/api/posts?${params.toString()}`);
  return data;
};

const fetchCategories = async () => {
  const { data } = await axios.get('/api/categories');
  return data;
};

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, category, sort]);

  const { data: postsResponse, isLoading, isError } = useQuery({
    queryKey: ['posts', { page, searchTerm, category, sort }],
    queryFn: () => fetchPosts({ page, q: searchTerm, category, sort }),
    keepPreviousData: true,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 pb-12 pt-10 sm:px-6 lg:px-8">
      <section className="space-y-6">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-sky-200 sm:text-4xl">Pass đồ nổi bật</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Tìm kiếm nhanh các bài pass đồ uy tín, đầy đủ thông tin. Lọc theo danh mục, sắp xếp theo lượt like hoặc thời gian và
            theo dõi kết quả theo trang.
          </p>
        </header>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchBar defaultValue={searchTerm} onSearch={setSearchTerm} />
          <Filters
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </section>

      {isError ? (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-sm text-red-200">
          Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
        </div>
      ) : (
        <PostList posts={postsResponse?.data} isLoading={isLoading} />
      )}

      {!isError && postsResponse && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400">
            Tổng cộng <span className="font-semibold text-sky-300">{postsResponse.meta.total}</span> kết quả
          </p>
          <Pagination page={page} total={postsResponse.meta.total} limit={LIMIT} onChange={setPage} />
        </div>
      )}
    </main>
  );
}

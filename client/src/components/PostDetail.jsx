import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { ArrowTopRightOnSquareIcon, ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export default function PostDetail({ post }) {
  const postedAt = post?.posted_at ? dayjs(post.posted_at) : null;

  if (!post) {
    return null;
  }

  return (
    <article className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-slate-400">{post.category || 'Khác'}</p>
        <h1 className="text-2xl font-bold text-sky-200">{post.title}</h1>
        {postedAt && (
          <time dateTime={postedAt.toISOString()} className="block text-sm text-slate-400">
            Đăng {postedAt.fromNow()} — {postedAt.toISOString()}
          </time>
        )}
      </header>

      <dl className="flex flex-wrap gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-1">
          <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
          <dt className="sr-only">Lượt thích</dt>
          <dd>{post.likes}</dd>
        </div>
        <div className="flex items-center gap-1">
          <ChatBubbleLeftIcon className="h-5 w-5" aria-hidden="true" />
          <dt className="sr-only">Bình luận</dt>
          <dd>{post.comments}</dd>
        </div>
        {post.duration && <span className="text-slate-400">Khoảng thời gian: {post.duration}</span>}
      </dl>

      <div className="whitespace-pre-line rounded-xl bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-200">
        {post.content || 'Chưa có nội dung chi tiết.'}
      </div>

      {post.url && (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
        >
          Xem bài gốc
          <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

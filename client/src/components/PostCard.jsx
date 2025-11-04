import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { ArrowTopRightOnSquareIcon, ChatBubbleLeftIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export default function PostCard({ post }) {
  const postedAt = post.posted_at ? dayjs(post.posted_at) : null;
  const timeFromNow = postedAt ? postedAt.fromNow() : 'Không rõ thời gian';
  const snippet = post.content ? `${post.content.slice(0, 200)}${post.content.length > 200 ? '…' : ''}` : 'Không có nội dung.';

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg transition hover:border-sky-500 focus-within:border-sky-500">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">{post.category || 'Khác'}</p>
          {postedAt && (
            <time dateTime={postedAt.toISOString()} className="text-xs text-slate-400" title={postedAt.toISOString()}>
              {timeFromNow}
            </time>
          )}
        </div>
        <h3 className="text-lg font-semibold leading-tight text-sky-200">{post.title}</h3>
        <p className="text-sm text-slate-300">{snippet}</p>
      </div>

      <dl className="mt-6 flex items-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <HandThumbUpIcon className="h-4 w-4" aria-hidden="true" />
          <dt className="sr-only">Lượt thích</dt>
          <dd>{post.likes}</dd>
        </div>
        <div className="flex items-center gap-1">
          <ChatBubbleLeftIcon className="h-4 w-4" aria-hidden="true" />
          <dt className="sr-only">Bình luận</dt>
          <dd>{post.comments}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/posts/${post.id}`}
          className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
        >
          Xem chi tiết
        </Link>
        {post.url && (
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-sky-300 hover:text-sky-100"
          >
            Link gốc
            <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

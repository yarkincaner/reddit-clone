'use client'

import { formatTimeToNow } from '@/lib/utils'
import { Post as PostType, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import { FC, useRef } from 'react'
import EditorOutput from './EditorOutput'
import { PostVoteClient } from './post-vote'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  subredditName: string
  post: PostType & {
    author: User
    votes: Vote[]
  }
  commentAmount: number
  votesAmount: number
  currentVote?: PartialVote
}

const Post: FC<PostProps> = ({
  subredditName,
  post,
  commentAmount,
  votesAmount,
  currentVote
}) => {
  const postRef = useRef<HTMLDivElement>(null)

  return (
    <div className='rounded-md bg-white shadow'>
      <div className='flex justify-between px-6 py-4'>
        <div className='hidden md:block'>
          <PostVoteClient
            initialVotesAmount={votesAmount}
            postId={post.id}
            initialVote={currentVote?.type}
          />
        </div>

        <div className='w-0 flex-1'>
          <div className='mt-1 max-h-40 text-xs text-gray-500'>
            {subredditName ? (
              <>
                {/* Reason why it is not a Link component is because want a hard refresh whenever clicked */}
                <a
                  href={`/r/${subredditName}`}
                  className='text-sm text-zinc-900 underline underline-offset-2'
                >
                  r/{subredditName}
                </a>
                <span className='px-1'>•</span>
              </>
            ) : null}
            <span>Posted by u/{post.author.username}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>

          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className='py-2 text-lg font-semibold leading-6 text-gray-900'>
              {post.title}
            </h1>
          </a>

          <div
            className='relative max-h-40 w-full overflow-clip text-sm'
            ref={postRef}
          >
            <EditorOutput content={post.content} />
            {postRef.current?.clientHeight === 160 ? (
              <div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent' />
            ) : null}
          </div>
        </div>
      </div>

      <div className='z-20 flex justify-between bg-gray-50 p-4 text-sm sm:px-6'>
        <div className='block md:hidden'>
          <PostVoteClient
            initialVotesAmount={votesAmount}
            postId={post.id}
            initialVote={currentVote?.type}
          />
        </div>
        <a
          href={`/r/${subredditName}/post/${post.id}`}
          className='flex w-fit items-center gap-2'
        >
          <MessageSquare className='h-4 w-4' />
          {commentAmount} comments
        </a>
      </div>
    </div>
  )
}

export default Post

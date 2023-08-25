import { getAuthSession } from "@/lib/auth"
import { Post, Vote } from "@prisma/client"
import { notFound } from "next/navigation"
import PostVoteClient from "./PostVoteClient"

interface PostVoteServerProps {
	postId: string
	initialVotesAmount?: number
	initialVote?: Vote["type"] | null
	getData?: () => Promise<(Post & { votes: Vote[] }) | null>
}

const PostVoteServer = async ({
	postId,
	initialVotesAmount,
	initialVote,
	getData,
}: PostVoteServerProps) => {
	const session = await getAuthSession()

	let votesAmount: number = 0
	let currentVote: Vote["type"] | null | undefined = undefined

	if (getData) {
		const post = await getData()
		if (!post) return notFound()

		votesAmount = post.votes.reduce((acc, vote) => {
			if (vote.type === "UP") return acc + 1
			if (vote.type === "DOWN") return acc - 1
			return acc
		}, 0)

		currentVote = post.votes.find(
			(vote) => vote.userId === session?.user?.id
		)?.type
	} else {
		votesAmount = initialVotesAmount!
		currentVote = initialVote
	}

	return (
		<PostVoteClient
			postId={postId}
			initialVotesAmount={votesAmount}
			initialVote={currentVote}
		/>
	)
}

export default PostVoteServer

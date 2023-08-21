// Zod is a schema validation library
import { z } from "zod";

export const SubredditValidatior = z.object({
	name: z.string().min(3).max(21)
})

export const SubredditSubscriptionValidatior = z.object({
	subredditId: z.string()
})

export type CreateSubredditPayload = z.infer<typeof SubredditValidatior>
export type SubscribeToSubredditPayload = z.infer<typeof SubredditSubscriptionValidatior>
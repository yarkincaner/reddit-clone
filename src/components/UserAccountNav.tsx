"use client"
import { User } from "next-auth"
import { FC } from "react"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import UserAvatar from "./UserAvatar"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface UserAccountNavProps {
	user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{
						name: user.name || null,
						image: user.image || null,
					}}
					className="h-8 w-8"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-white" align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						{user.name && <p className="font-medium">{user.name}</p>}
						{user.email && (
							<p className="w-[200px] truncate text-sm text-zinc-700">
								{user.email}
							</p>
						)}
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={"/"}>Feed</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={"/r/create"}>Create community</Link>
				</DropdownMenuItem>

				<DropdownMenuItem asChild className="cursor-pointer">
					<Link href={"/settings"}>Settings</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					onSelect={(e) => {
						e.preventDefault()
						signOut({
							callbackUrl: `${window.location.origin}/sign-in`,
						})
					}}
					className="cursor-pointer text-red-600"
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserAccountNav

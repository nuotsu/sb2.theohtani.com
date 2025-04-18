'use client'

import { useLocalStorage } from '@/lib/store'
import type { ComponentProps } from 'react'

export default function SelectablePlayer({
	player,
	...props
}: { player?: MLB.BasicPlayerData } & ComponentProps<'button'>) {
	const { addSelectedPlayer } = useLocalStorage()

	if (!player) return <span {...props} />

	return <button onClick={() => addSelectedPlayer(player)} {...props} />
}

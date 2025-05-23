'use client'

import { useStorage } from '@/lib/store'
import { fetchMLBLive } from '@/lib/mlb'
import Game from './Game'

export default function Schedule() {
	const { date } = useStorage()
	const { data, isLoading } = fetchMLBLive<MLB.Schedule>(
		`/api/v1/schedule?sportId=1&startDate=${date}&endDate=${date}`,
	)

	if (isLoading) return <div>Loading games...</div>

	const games = data?.dates?.[0]?.games

	if (!games) return <div>No games</div>

	return (
		<section className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-1">
			{games?.map((game, key) => <Game game={game} key={key} />)}
		</section>
	)
}

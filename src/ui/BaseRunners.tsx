import { cn } from '@/lib/utils'
import { off } from 'process'

const runnerKeys: Record<string, number> = {
	first: 0,
	second: 1,
	third: 2,
}

export default function BaseRunners({ linescore }: { linescore: MLB.LiveLineScore }) {
	const { inningState, offense } = linescore

	const runners = Object.keys(offense)
		.map((key) => runnerKeys[key])
		.filter(Number.isInteger)

	const interlude = ['Middle', 'End'].includes(inningState)

	return (
		<div className="grid translate-y-0.5 rotate-45 grid-cols-2 gap-[.125em]">
			{[1, 0, 2].map((i) => {
				const base = Object.keys(offense).find((key) => runnerKeys[key] === i)
				const runner = offense[base as keyof typeof offense] as MLB.NameableObject | undefined

				return (
					<span
						className={cn(
							'size-[.5em] transition-opacity',
							interlude
								? 'bg-stroke/50'
								: runners.includes(i)
									? 'bg-current'
									: 'border-stroke border',
						)}
						title={runner ? `${runner.fullName} on ${base}` : undefined}
						key={i}
					/>
				)
			})}
		</div>
	)
}

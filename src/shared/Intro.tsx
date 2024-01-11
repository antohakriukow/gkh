import { introSteps, russianLocale } from './intro/intro'
import { FC } from 'react'
import ReactJoyride, { CallBackProps } from 'react-joyride'

import { useData } from '~/hooks/useData'

import { UserService } from '~/services/user.service'

const Intro: FC = () => {
	const { needToShowIntro, userUid } = useData()

	const handleFinishIntro = (data: CallBackProps) => {
		const { status } = data
		const finishedStatuses: string[] = ['finished', 'skipped']

		if (finishedStatuses.includes(status)) {
			UserService.setNeedToShowIntro(userUid)
		}
	}
	return (
		<ReactJoyride
			steps={introSteps}
			run={needToShowIntro}
			continuous={true}
			showProgress={true}
			locale={russianLocale}
			callback={handleFinishIntro}
			styles={{
				options: {
					zIndex: 10000
				}
			}}
		/>
	)
}
export default Intro

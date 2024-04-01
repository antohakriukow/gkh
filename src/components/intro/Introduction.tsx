import { introSteps, russianLocale } from './intro.data'
import { FC } from 'react'
import ReactJoyride, { CallBackProps } from 'react-joyride'
import { useAuth, useUserData } from '~/hooks'

import { UserService } from '~/services/user.service'

const Introduction: FC = () => {
	const { user } = useAuth()
	const { needToShowIntro } = useUserData()

	const handleFinishIntro = (data: CallBackProps) => {
		if (!user) return

		const finishedStatuses = ['finished', 'skipped']

		if (finishedStatuses.includes(data.status))
			UserService.setDoNotShowIntroAgain(user.uid)
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
export default Introduction

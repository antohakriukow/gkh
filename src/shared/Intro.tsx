import { introSteps, russianLocale } from './intro/intro'
import { FC } from 'react'
import ReactJoyride, { CallBackProps } from 'react-joyride'

import { useUserData } from '~/hooks/firebase-hooks/useUserData'
import { useAuth } from '~/hooks/useAuth'

import { UserService } from '~/services/user.service'

const Intro: FC = () => {
	const { user } = useAuth()
	const { needToShowIntro } = useUserData()

	const handleFinishIntro = (data: CallBackProps) => {
		const { status } = data
		const finishedStatuses: string[] = ['finished', 'skipped']

		if (finishedStatuses.includes(status)) {
			if (!user) return
			UserService.setNeedToShowIntro(user.uid)
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

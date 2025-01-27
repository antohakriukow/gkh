import { useContext } from 'react'

import { CombinedContext } from '~/providers/CombinedProvider'

export const useAuth = () => useContext(CombinedContext)

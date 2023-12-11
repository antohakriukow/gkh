import { useContext } from 'react'

import { CombinedContext } from '~/providers/CombinedProvider'
import { AuthContext } from '~/providers/DEPRECATED_auth/AuthProvider'

export const useAuth = () => useContext(CombinedContext)
// export const useAuth = () => useContext(AuthContext)

import md5 from 'md5'

export const calculateSignature = (...args: (string | number)[]): string => {
	return md5(args.join(':'))
}

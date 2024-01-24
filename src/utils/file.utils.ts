export const readFilesContent = (files: File[]): Promise<string[]> => {
	return Promise.all(
		files.map(file => {
			return new Promise<string>((resolve, reject) => {
				const reader = new FileReader()
				reader.onload = () => resolve(reader.result as string)
				reader.onerror = () => reject(reader.error)
				reader.readAsText(file)
			})
		})
	)
}

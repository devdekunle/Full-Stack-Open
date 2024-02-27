const Notification = ({ message, isSuccess }) => {
	const status = isSuccess ? 'success' : 'failure'

	if (message === null) {
			return null
		}
	return (
	
		<div className={status}>
			{message}
		</div>
	)
}
export default Notification
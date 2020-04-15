import moment from 'moment'

export default date => moment(date, `YYYY-MM-DD`).format(`MMMM Do`)

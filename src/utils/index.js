import dayjs from 'dayjs'
import { dateFromFormat, dateFormat } from '../../data/SiteConfig'

export const formatDate = date => dayjs(date, dateFromFormat).format(dateFormat)

export default { formatDate }

import moment from 'moment'
import { dateFromFormat, dateFormat } from '../../data/SiteConfig'

export default date => moment(date, dateFromFormat).format(dateFormat)

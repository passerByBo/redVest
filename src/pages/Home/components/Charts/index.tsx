import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field'


const yuan = (val:number | string) => `￥${numeral(val).format('0,0')}`
const Charts = {
  ChartCard,
  yuan,
  Field
}

export {
  Charts as default,
  ChartCard,
  yuan,
  Field
}

import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field'
import MiniArea from './MiniArea';

const yuan = (val:number | string) => `￥${numeral(val).format('0,0')}`
const Charts = {
  ChartCard,
  yuan,
  Field,
  MiniArea
}

export {
  Charts as default,
  ChartCard,
  yuan,
  Field,
  MiniArea
}

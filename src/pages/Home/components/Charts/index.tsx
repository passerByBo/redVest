import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field'
import MiniArea from './MiniArea';
import TimelineChart from './TimelineChart'

const yuan = (val:number | string) => `￥${numeral(val).format('0,0')}`
const Charts = {
  ChartCard,
  yuan,
  Field,
  MiniArea,
  TimelineChart
}

export {
  Charts as default,
  ChartCard,
  yuan,
  Field,
  MiniArea,
  TimelineChart
}

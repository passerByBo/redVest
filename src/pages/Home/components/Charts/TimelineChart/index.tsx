import React from 'react';
import {
	Chart,
	Geom,
	Axis,
	Tooltip,
	Legend,
} from 'bizcharts';
import styles from './index.less';

export interface TimelineChartProps {
    data: {
        x: number;
        y1: number;
        y2: number;
    }[];
    title?: string;
    titleMap: { y1: string; y2: string };
    padding?: [number, number, number, number];
    height?: number;
    style?: React.CSSProperties;
    borderWidth?: number;
}



const TimelineChart: React.FC<TimelineChartProps> = (props) => {

    const {
        height,
    } = props;

    const data = [
        {
            month: "Jan",
            city: "订单数量",
            revenue: 7,
        },
        {
            month: "Jan",
            city: "成交订单",
            revenue: 3.9,
        },
        {
            month: "Feb",
            city: "订单数量",
            revenue: 6.9,
        },
        {
            month: "Feb",
            city: "成交订单",
            revenue: 4.2,
        },
        {
            month: "Mar",
            city: "订单数量",
            revenue: 9.5,
        },
        {
            month: "Mar",
            city: "成交订单",
            revenue: 5.7,
        },
        {
            month: "Apr",
            city: "订单数量",
            revenue: 14.5,
        },
        {
            month: "Apr",
            city: "成交订单",
            revenue: 8.5,
        },
        {
            month: "May",
            city: "订单数量",
            revenue: 18.4,
        },
        {
            month: "May",
            city: "成交订单",
            revenue: 11.9,
        },
        {
            month: "Jun",
            city: "订单数量",
            revenue: 21.5,
        },
        {
            month: "Jun",
            city: "成交订单",
            revenue: 15.2,
        },
        {
            month: "Jul",
            city: "订单数量",
            revenue: 25.2,
        },
        {
            month: "Jul",
            city: "成交订单",
            revenue: 17,
        },
        {
            month: "Aug",
            city: "订单数量",
            revenue: 26.5,
        },
        {
            month: "Aug",
            city: "成交订单",
            revenue: 16.6,
        },
        {
            month: "Sep",
            city: "订单数量",
            revenue: 23.3,
        },
        {
            month: "Sep",
            city: "成交订单",
            revenue: 14.2,
        },
        {
            month: "Oct",
            city: "订单数量",
            revenue: 18.3,
        },
        {
            month: "Oct",
            city: "成交订单",
            revenue: 10.3,
        },
        {
            month: "Nov",
            city: "订单数量",
            revenue: 13.9,
        },
        {
            month: "Nov",
            city: "成交订单",
            revenue: 6.6,
        },
        {
            month: "Dec",
            city: "订单数量",
            revenue: 9.6,
        },
        {
            month: "Dec",
            city: "成交订单",
            revenue: 4.8,
        },
    ];
    const cols = {
        month: {
            range: [0.05, 0.95],
        },
        revenue: {
            min: 0,
        },
    };

    return (
        <div className={styles.timelineChart} style={{ height: height + 30 }}>
            <Chart height={height + 30} data={data} scale={cols} autoFit>
					<Legend position='bottom'/>
					< Axis name="month" />
					<Axis
						name="revenue"
						label={{
							formatter: (val) => `${val}`,
						}}
					/>
					< Tooltip shared showCrosshairs
					/>
					< Geom type="line" position="month*revenue" size={2} color={"city"} />
					<Geom
						type="point"
						position="month*revenue"
						size={4}
						shape={"circle"}
						color={"city"}
						style={{
							stroke: "#fff",
							lineWidth: 1,
						}}
					/>
				</Chart>
        </div>
    )
}

export default TimelineChart;

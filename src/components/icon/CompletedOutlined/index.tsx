import Icon from '@ant-design/icons';
import { IconProps } from '@/components/icon/types';

const completedSVG = () => (
  <svg width="1em" height="1em" viewBox="0 0 32 32">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1042.000000, -785.000000)" fillRule="nonzero">
            <g transform="translate(328.000000, 769.000000)">
                <g transform="translate(698.000000, 0.000000)">
                    <g>
                        <g transform="translate(16.000000, 16.000000)">
                            <path d="M20.6,32 L20.6,14.75 L20.8294899,14.7491782 C21.281755,13.6644251 22.3532907,12.9 23.6,12.9 L29,12.9 C30.6542,12.9 32,14.2458 32,15.9 L32,25 C32,28.8598 28.8598,32 25,32 L23.6,32 L20.6,32 Z" fill="#C2CEF9"></path>
                            <path d="M19.6,0 C21.8092,0 23.6,1.7909 23.6,4 L23.6,32 L4,32 C1.7909,32 0,30.2092 0,28 L0,4 C0,1.7909 1.7909,0 4,0 L19.6,0 Z M11.8,13 L6.1,13 C5.2716,13 4.6,13.6716 4.6,14.5 C4.6,15.3284 5.2716,16 6.1,16 L6.1,16 L11.8,16 C12.6284,16 13.3,15.3284 13.3,14.5 C13.3,13.6716 12.6284,13 11.8,13 L11.8,13 Z M17.5,7.4 L6.1,7.4 C5.2716,7.4 4.6,8.0716 4.6,8.9 C4.6,9.7284 5.2716,10.4 6.1,10.4 L6.1,10.4 L17.5,10.4 C18.3284,10.4 19,9.7284 19,8.9 C19,8.0716 18.3284,7.4 17.5,7.4 L17.5,7.4 Z" fill="#FFFFFF"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
)

const CompletedOutlined:React.FC<IconProps> = (props) => <Icon component={completedSVG} {...props}/>

export default CompletedOutlined;

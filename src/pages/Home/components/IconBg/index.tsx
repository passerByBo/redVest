import React from 'react';
interface IconBgProps {
  color: string;
  size: number;
}

const IconBg: React.FC<IconBgProps> = (props) => {

  const { color, size, children } = props;
  const colorArr = color.split(',')
  let bgColor = colorArr[0];
  if (colorArr.length > 1) {
    bgColor = `linear-gradient(0deg,${colorArr[0]},${colorArr[1]})`
  }

  return (
    <div style={{alignItems: 'center',display: 'flex', justifyContent: 'center', boxSizing: 'border-box' , width: size, height: size, borderRadius: size / 2, background: bgColor }}>
      {
        children
      }
    </div>
  )
}

export default IconBg;

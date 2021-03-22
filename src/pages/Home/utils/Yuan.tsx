import React, { useRef, useEffect } from 'react';
import { yuan } from '../components/Charts';

/**
 * 减少使用dangerouslySetInnerHTML
 */


const Yuan: React.FC<{
  children: React.ReactText;
}> = (props) => {

  const actionRef = useRef() as React.MutableRefObject<HTMLSpanElement | null>;


  const renderToHtml = () => {
    const { children } = props;
    if (actionRef && actionRef.current && actionRef.current.innerHTML) {
      actionRef.current.innerHTML = yuan(children);
    }
  }

  useEffect(() => {
    renderToHtml();
  })
  return (
    <span ref={actionRef}>

    </span>
  )
}

export default Yuan;

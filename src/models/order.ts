import { OrderListItem } from '@/pages/Order';
import { useState, useCallback } from 'react';
export default () => {
  const [order, setOrder] = useState<OrderListItem>();

  const setCurrentOrder = useCallback((newOrder) => {
    console.log('newOrder',newOrder)
    setOrder({ ...newOrder });
  }, []);

  const getCurrentOrder = useCallback(() => order, []);

  return {
    setCurrentOrder,
    getCurrentOrder,
    order,
  };
};

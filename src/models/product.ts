import { ProductListItem } from '@/pages/Merchandise/Thematic';
import { useState, useCallback } from 'react';
export default () => {
  const [product, setProduct] = useState<ProductListItem>();

  const setCurrentProduct = useCallback((newProduct) => {
    console.log('newProduct',newProduct)
    setProduct({ ...newProduct });
  }, []);

  const getCurrentProduct = useCallback(() => product, []);

  return {
    setCurrentProduct,
    getCurrentProduct,
    product,
  };
};

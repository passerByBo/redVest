import React from 'react';

import { history } from 'umi';

const ProductList: React.FC = (props) => {



  function getPageByPath(path) {

  }


  const {location: {pathname, query}} = history;
  const {children} = props;
  return <>{children}</>
}

export default ProductList;

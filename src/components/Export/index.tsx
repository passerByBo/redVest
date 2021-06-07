import { ExportOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
interface IDownload {
  [key: string]: any
}


const Export: React.FC<IDownload> = (props) => {
  const {
    request,
    ...others
  } = props;

  const download = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    document.body.append(link);
    link.download = name;
    link.click();
    document.body.removeChild(link);
  }


  const { loading, run } = useRequest(request, {
    manual: true,
    onSuccess: (result) => {
      if (result) {
        let name = result;
        let baseUrl = `/prod-api/common/download?fileName=${name}&delete=false`
        download(baseUrl, name);
      } else {
        message.error('导出失败!')
      }
    }
  })





  return (
    <Button onClick={() => run()} loading={loading} {...others} icon={<ExportOutlined />}>{props.children ? props.children : '导出'}</Button>
  )
}

export default Export;

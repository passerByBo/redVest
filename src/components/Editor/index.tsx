import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Button } from 'antd'
import ImagePicker from '../ImagePicker'

export default class Editer extends React.Component {

  constructor(props:any) {
    super(props)
  }

  state = {
    editorState: BraftEditor.createEditorState(null)
  }

  handleChange = (editorState: any) => {
    this.setState({ editorState },() => {
      this.triggerChange(this.state.editorState.toHTML())
    })
  }

  triggerChange = (changedValue:string) => {
    this.props?.onChange?.(changedValue);
  };

  //富文本编辑器选择图片的返回功能
  selectedPictureBack = (pictures: string[]) => {
    let urls = pictures.map((url) => ({
      type: 'IMAGE',
      url: url
    }
    ))

    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, urls)
    },() => {
      this.triggerChange(this.state.editorState.toHTML())
    })
  }


  render() {



    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <ImagePicker type="button" selectedBack={(imgs) => this.selectedPictureBack(imgs)}>
            <Button type="text" className="control-item" style={{ width: 100 }} size="small">打开图片库</Button>
          </ImagePicker>
        )
      }
    ]

    return (
      <BraftEditor
        className='my-editor'
        placeholder={this.props.placeholder || ''}
        extendControls={extendControls}
        value={this.state.editorState}
        onChange={this.handleChange}
      />
    )

  }

}

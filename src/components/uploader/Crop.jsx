// import React, { Component } from "react";
// import Cropper from "react-cropper";
// import PropTypes from "prop-types";
// import "../../style/cropper.scss";
// import "cropperjs/dist/cropper.css";
// import { uploadPic } from "../../constants/api/upload";
// import { fetchApi } from "../../callApi";

// export default class CropperModal extends Component {
//   static propTypes = {
//     uploadedImageFile: PropTypes.object.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onSubmit: PropTypes.func.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       src: null,
//       link: null,
//     };
//   }

//   componentDidMount() {
//     const fileReader = new FileReader();
//     fileReader.onload = (e) => {
//       const dataURL = e.target.result;
//       this.setState({ src: dataURL });
//     };

//     fileReader.readAsDataURL(this.props.uploadedImageFile);
//   }

//   handleSubmit = () => {
//     if (!this.state.submitting) {
//       console.log("正在上传图片");
//       // TODO: 这里可以尝试修改上传图片的尺寸

//       console.log(this.cropper.getCroppedCanvas())

//       this.cropper.getCroppedCanvas().toBlob(async (blob) => {

//         // 创造提交表单数据对象
//         const formData = new FormData();

//         // 添加要上传的文件
//         let filename = this.props.uploadedImageFile.name;

//         var tofile = new File([this.blob], filename);
//         console.log(this.blob)

//         formData.append("file", tofile, filename);


//         console.log("#" + formData)



//         let url = `http://120.48.17.78:8080/api/uploadFile`;


//         const settings = {
//           method: "POST",
//           mode: 'cors',
//           body: formData,
//           headers: new Headers({
//             //'Content-Type': 'multipart/form-data',
//           }),
//         };


//         // 提示开始上传
//         this.setState({ submitting: true });

//         // 上传图片
//         fetch(url, settings)
//           .then((res) => res.json())
//           .then((data) => {
//             // console.log("aaa")
//             // console.log(data.data.path)

//             //sessionStorage.setItem("", data.data.path);
//             sessionStorage.setItem("imgUrl", data.data.path);
//             this.props.getLink(data.data.path);

//           });
//         // 把选中裁切好的的图片传出去

//         // 关闭弹窗
//         this.props.onClose();
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="class-cropper-modal">
//         <div className="modal-panel">
//           <div className="cropper-container-container">
//             <div className="cropper-container">
//               <Cropper
//                 src={this.state.src}
//                 className="cropper"
//                 ref={(cropper) => (this.cropper = cropper)}
//                 // Cropper.js options
//                 viewMode={1}
//                 zoomable={1}
//                 width={this.props.wid}
//                 height={this.props.hei}
//                 aspectRatio={this.props.wid / this.props.hei} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
//                 guides={1}
//                 preview=".cropper-preview"
//               />
//             </div>
//             <div className="preview-container">
//               <div className="cropper-preview" />
//             </div>
//           </div>
//           <div className="button-row">
//             <div className="submit-button" onClick={this.handleSubmit}>
//               提交
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }































import React, { Component } from "react";
import Cropper from "react-cropper";
import PropTypes from "prop-types";
import "../../style/cropper.scss";
import "cropperjs/dist/cropper.css";
import { uploadPic } from "../../constants/api/upload";
import { fetchApi } from "../../callApi";

export default class CropperModal extends Component {
  static propTypes = {
    uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      link: null,
      msg: null,
      modalFile: null,
    };
  }

  componentDidMount() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataURL = e.target.result;
      this.setState({ src: dataURL });
    };

    fileReader.readAsDataURL(this.props.uploadedImageFile);
  }

  rec = (modalFile) => {
    this.setState({
      modalFile
    })
    alert(this.state.modalFile)
  }

  handleSubmit = () => {
    if (!this.state.submitting) {
      console.log("正在上传图片");
      // TODO: 这里可以尝试修改上传图片的尺寸
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {



        //..................

        this.andleGetData()
        console.log(this.cropper.getCroppedCanvas());
        //...................

        console.log(this.state.src)

        // 创造提交表单数据对象
        const formData = new FormData();

        // 添加要上传的文件
        let filename = this.props.uploadedImageFile.name;

        formData.append("file", blob, filename);


        let url = `http://120.48.17.78:8080/api/uploadFile`;
        const settings = {
          method: "POST",
          body: formData,
        };
        // 提示开始上传
        this.setState({ submitting: true });
        // console.log(url, settings)
        // 上传图片
        fetch(url, settings)
          .then((res) => res.json())
          .then((data) => {
            // console.log("aaa")
            // console.log(data.data.path)
            sessionStorage.setItem("imgUrl", data.data.path);
            this.props.getLink(data.data.path);
            // if(this.props.)
            // this.setState({
            //     link: data.data.path
            // })
          });
        // 把选中裁切好的的图片传出去

        // 关闭弹窗
        this.props.onClose();
      });
    }
  };

  render() {
    return (
      <div className="class-cropper-modal">
        <div className="modal-panel">
          <div className="cropper-container-container">
            <div className="cropper-container">

              <Cropper
                src={this.state.src}
                className="cropper"
                ref={(cropper) => (this.cropper = cropper)}
                // Cropper.js options
                viewMode={1}
                zoomable={1}
                width={this.props.wid}
                height={this.props.hei}
                aspectRatio={this.props.wid / this.props.hei} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                guides={1}
                preview=".cropper-preview"
              />

            </div>
            <div className="preview-container">
              <div className="cropper-preview" />
            </div>
          </div>
          <div className="button-row">
            <div className="submit-button" onClick={this.handleSubmit}>
              提交
            </div>

          </div>
        </div>

      </div>


    );
  }
}


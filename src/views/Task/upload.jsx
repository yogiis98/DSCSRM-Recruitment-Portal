import React, { Component } from 'react'

export default class UploadButton extends Component {
    showWidget = (widget)=>{
        widget.open()
    }
    // eslint-disable-next-line no-undef
    widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dscsrm",
        uploadPreset: "dscsrm2",
        sources: ["local"],
        showCompletedButton: true,
        multiple: false,
        maxFiles: 1,
        maxFileSize: 5500000 * 100,
        maxRawFileSize: 5500000 * 100,
        showPoweredBy: true,
        showUploadMoreButton: false,
        singleUploadAutoClose: true,
        clientAllowedFormats:["zip","tar","pdf","docs","txt","doc","rar"]
      },
      (error, result) => {
        if (!error && result) {
          const eventData = result.data;
          console.log(eventData);
          if (result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      }
    );
  render() {
    return (
      <>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.showWidget(this.widget);
          }}
        >
          Upload File
        </button>
      </>
    );
  }
}

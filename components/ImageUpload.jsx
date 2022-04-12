import { useState } from "react";
import Dropzone from "react-dropzone";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function ImageUpload(props) {
  const LS_KEY = "login-with-metamask:auth";
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const [Images, setImages] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const getToken = Cookies.get(LS_KEY);
  const parsedToken = getToken && JSON.parse(getToken).accessToken;

  const onDrop = (files) => {
    setAccessToken(parsedToken);

    let formData = new FormData();

    [].forEach.call(files, (f) => {
      formData.append("image", f);
    });

    fetch(`/api/users/uploadImage`, {
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "content-type": "multipart/form-data", //=>있으면 안보내짐
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setImages(result);
        props.refreshImg.updateImages(result);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to save the Image in Server");
      });
  };

  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshImg.updateImages(newImages);
  };

  return (
    <>
      <div className="dropzone_box">
        <div className="dropzone_box_title">
          profile
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button className="add_photo_btn">
                  <i className="bx bx-image-add"></i>
                </button>
              </div>
            )}
          </Dropzone>
        </div>
        <div className="dropzone-image_box">
          {Images &&
            Images.map((image, index) => (
              <div onClick={() => onDelete(image)}>
                <img
                  key={index}
                  className="dropzone-image_box-img"
                  src={Images[0]}
                  alt={"uploading profile"}
                />
              </div>
            ))}
        </div>
        <div></div>
      </div>
      <style jsx>{`
        .dropzone_box {
          display: flex;
          flex-direction: column;
          align-items: center;
  
        }
        .dropzone_box_title {
          display: flex;
          justify-content: center;
     
        }
        .dropzone-image_box {
          display: flex;
          flex-direction: column;
          width: 10rem;
          height: 10rem;
          border-radius:50%;
          border: solid 0.1rem;
          color: #d1d2d0;
          box-shadow: 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0, 0 0 0.5rem #d1d2d0,
            inset 0 0 0.5rem #d1d2d0, 0 0 0.1rem #d1d2d0, inset 0 0 0.1rem #d1d2d0;
          overflow: auto;
          margin: 1rem 0 3rem 0;
          justify-content: center;

        }
        .dropzone-image_box-img{
          width: "100%",
          height: auto,
          
        }
        .add_photo_btn{
          font-size:1.8rem; 
          margin: 0 1rem;

        }
      `}</style>
      <link
        href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    </>
  );
}

export default ImageUpload;

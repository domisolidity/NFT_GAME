import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";

function ImageUpload(props) {
  const LS_KEY = "login-with-metamask:auth";
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  const [Images, setImages] = useState([]);
  const [accessToken, setAccessToken] = useState("");

  const onDrop = (files) => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);

    let formData = new FormData();

    formData.append("file", files[0]);

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
        if (result.success) {
          setImages([result.image]);
          props.refreshImg.updateImages([result.image]);
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log(err);
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
        <div className="dropzone-image_box">
          {Images.map((image, index) => (
            <div onClick={() => onDelete(image)}>
              <img
                key={index}
                className="dropzone-image_box-img"
                src={`/api/${image}`}
                alt={"uploading profile"}
              />
            </div>
          ))}
        </div>
        <div>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="add_photo_btn">사진 변경</div>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      <style jsx>{`
        .dropzone_box {
          display: "block", 
          justify-content: "space-between";
        }
        .dropzone-image_box {
          display: flex;
          flex-direction: column;
          width: 300px;
          min-height: 300px;
          max-height: calc(100vh - 400px);
          /* border-radius:50%; */
          border: solid 1px white;
          overflow: auto;
        }
        .dropzone-image_box-img{
          width: "100%",
          height: "300px" 
        }
        .add_photo_btn{
          border: white solid 1px;
          text-align: center;
          height: 2rem;
        }
      `}</style>
    </>
  );
}

export default ImageUpload;

import "../../Assets/style/Sell/Sell_LargeDevice.css";
import { province_eng } from "../../Data/Sell/Sell";
import { category_eng } from "../../Data/Sell/Sell";
import { useState, useRef } from "react";
import useOffer from "../../Hook/Offer/useOffer";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import setCanvasPreview from "../../Utils/Crop/CropImage";

const MIN_DIMENSION = 100;
const ASPECT_RATIO = 3 / 4;

export default function SellLargeDevice() {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [history, setHistory] = useState("");
  const [file, setFile] = useState();
  const [uploadProp, setUploadProp] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [crop, setCrop] = useState();
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const { offer, isLoading, titleError, priceError } = useOffer();
  const { user } = useAuthContext();
  const id = user.id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    await offer(title, id, price, category, province, history, file);
  };
  // react cropper
  const onSelectFile = (e) => {
    setUploadProp(true);
    const file = e.target.files?.[0];
    console.log(error);
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (e) => {
        if (error) setError(null);
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError(`the image must be bigger than ${MIN_DIMENSION}`);
          setImageSource("");
          return;
        }
      });
      setImageSource(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "px",
        width: MIN_DIMENSION,
      },
      ASPECT_RATIO,
      width,
      height
    );
    setCrop(crop);
  };

  return (
    <div className="Sell_Large_Device_Container">
      <h2>Product Details</h2>
      <form className="py-2" onSubmit={handleSubmit}>
        <div className="d-flex">
          <div className="col-7">
            <label className="mb-1">Title</label>
            <input
              type="text"
              className="sell-large-device-input mb-1"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              required
            />
            <p className="mb-3 error">{titleError}</p>
          </div>
          <div className="col-1"></div>
          <div className="col-4">
            <label className="mb-1">Price</label>
            <input
              type="number"
              className="sell-large-device-input mb-1"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              required
            />
            <p className=" mb-3">{priceError}</p>
          </div>
        </div>
        <div className="d-flex">
          <div className="col-5 d-flex flex-column">
            <label className="mb-1">Category</label>
            <select
              className="sell-large-device-input mb-3"
              aria-label="Default select example"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
            >
              <option value>-</option>
              {category_eng.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="col-1"></div>
          <div className="col-6 d-flex flex-column">
            <label className="mb-1">Province</label>
            <select
              className=" sell-large-device-input mb-3"
              aria-label="Default select example"
              onChange={(e) => {
                setProvince(e.target.value);
              }}
              value={province}
            >
              <option value>-</option>
              {province_eng.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex flex-column">
          <label className="mb-1">History</label>
          <textarea
            type="text"
            className="sell-large-device-text-area mb-3"
            onChange={(e) => {
              setHistory(e.target.value);
            }}
            value={history}
            required
            maxLength={2000}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Picture</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => {
              onSelectFile(e);
            }}
            accept=".png, .jpg, .jpeg"
          />
        </div>
        {uploadProp && (
          <div className="upload-prop">
            {
              <div className="d-flex flex-column upload-prop-container">
                <div className="d-flex justify-content-end">
                  <FontAwesomeIcon
                    className="mb-4"
                    icon={faRemove}
                    onClick={() => {
                      setUploadProp(false);
                      setError(false);
                    }}
                  ></FontAwesomeIcon>
                </div>
                {error && <p className="error">{error}</p>}
                {imageSource && (
                  <div className="d-flex flex-column">
                    <ReactCrop
                      crop={crop}
                      onChange={(pixelCrop, percentCrop) => {
                        setCrop(percentCrop);
                      }}
                      className="mb-3"
                      keepSelection
                      aspect={ASPECT_RATIO}
                      minWidth={MIN_DIMENSION}
                    >
                      <img
                        ref={imgRef}
                        src={imageSource}
                        alt="Upload"
                        style={{ maxHeight: "70vh" }}
                        onLoad={onImageLoad}
                      ></img>
                    </ReactCrop>
                    <button
                      type="button"
                      onClick={() => {
                        setCanvasPreview(
                          imgRef.current, // HTMLImageElement
                          previewCanvasRef.current,
                          convertToPixelCrop(
                            crop,
                            imgRef.current.width,
                            imgRef.current.height
                          )
                        );
                        if (!previewCanvasRef.current) {
                          return;
                        }
                        previewCanvasRef.current.toBlob((blob) => {
                          if (!blob) {
                            // Handle error
                            console.error("Canvas is empty");
                            return;
                          }
                          setFile(
                            new File([blob], "croppedImage.png", {
                              type: "image/png",
                            })
                          );
                        }, "image/png");
                      }}
                      className="crop-image-button"
                    >
                      Crop Image
                    </button>
                  </div>
                )}
                {crop && (
                  <canvas
                    ref={previewCanvasRef}
                    className=""
                    style={{ display: "none", width: 150, height: 150 }}
                  />
                )}
              </div>
            }
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="sell_submit_button"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { useEditProduct } from "../../Hook/EditProduct/useEditProduct";
import { province_eng } from "../../Data/Sell/Sell";
import { category_eng } from "../../Data/Sell/Sell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import setCanvasPreview from "../../Utils/Crop/CropImage";
import ReactCrop, {
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "../../Assets/style/EditProduct/EditProduct.css";
// getItem by id and then check with the userId

const MIN_DIMENSION = 100;
const ASPECT_RATIO = 3 / 4;

export default function EditProduct() {
  const { productId } = useParams();
  const [newPrice, setNewPrice] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newProvince, setNewProvince] = useState("");
  const [newHistory, setNewHistory] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const [uploadProp, setUploadProp] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [crop, setCrop] = useState();
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const { user } = useAuthContext();
  const {
    checkUserCredential,
    credential,
    isLoading,
    title,
    history,
    price,
    pictureUrl,
    category,
    province,
  } = useEditProduct();
  const [error, setError] = useState(null);
  useEffect(() => {
    if (user) {
      checkUserCredential(user.id, productId);
    }
  }, [user, productId]);
  useEffect(() => {
    if (title) {
      setNewTitle(title);
    }
    if (price) {
      setNewPrice(price);
    }
    if (category) {
      setNewCategory(category);
    }
    if (province) {
      setNewProvince(province);
    }
    if (history) {
      setNewHistory(history);
    }
    if (pictureUrl) {
      setNewPicture(pictureUrl);
    }
  }, [title, price, category, province, history, pictureUrl]);
  //   console.log(user.id);
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

  const handleInfoUpdate = () => {
    // set function from useEditProduct
  };
  return (
    <div className="edit-your-product-page">
      {!isLoading &&
        (credential ? (
          <form onSubmit={handleInfoUpdate}>
            <div className="d-flex">
              <div className="col-4">
                <img
                  className="edit-your-product-picture"
                  src={newPicture}
                ></img>
              </div>
              <div className="col-8">
                <div className="d-flex justify-content-between mb-4">
                  <div className="col-8">
                    <label className="edit-your-product-input-label">
                      Title
                    </label>
                    <input
                      className="edit-your-product-text-input"
                      value={newTitle}
                      type="text"
                      onChange={(e) => setNewTitle(e.target.value)}
                    ></input>
                  </div>
                  <div className="col-3">
                    <label className="edit-your-product-input-label">
                      Price
                    </label>
                    <input
                      className="edit-your-product-text-input"
                      value={newPrice}
                      type="number"
                      onChange={(e) => setNewPrice(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="col-5 d-flex flex-column">
                    <label className="mb-1 edit-your-product-input-label">
                      Category
                    </label>
                    <select
                      className="edit-your-product-text-input mb-3"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setNewCategory(e.target.value);
                      }}
                      value={newCategory}
                    >
                      <option value>-</option>
                      {category_eng.map((province, index) => (
                        <option key={index} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-5 d-flex flex-column">
                    <label className="edit-your-product-input-label mb-1">
                      Province
                    </label>
                    <select
                      className=" edit-your-product-text-input mb-3"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setNewProvince(e.target.value);
                      }}
                      value={newProvince}
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
                  <label className="edit-your-product-input-label mb-1">
                    History
                  </label>
                  <textarea
                    type="text"
                    className="edit-your-product-text-area mb-3"
                    onChange={(e) => {
                      setNewHistory(e.target.value);
                    }}
                    value={newHistory}
                    required
                    maxLength={2000}
                  />
                </div>
                <div>
                  <div className="mb-4">
                    <label className="edit-your-product-input-label">
                      Picture
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        onSelectFile(e);
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="save-button">Save</button>
                </div>
              </div>
              {uploadProp && (
                <div className="upload-prop">
                  {
                    <div className="d-flex flex-column upload-prop-container">
                      <div className="d-flex justify-content-end">
                        <FontAwesomeIcon
                          className="mb-4 close-crop-pop"
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
                                  console.error("Canvas is empty");
                                  return;
                                }
                                const newImageUrl = URL.createObjectURL(blob);
                                setNewPicture(newImageUrl);
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
            </div>
          </form>
        ) : (
          <div>You don't have a credit</div>
        ))}
    </div>
  );
}

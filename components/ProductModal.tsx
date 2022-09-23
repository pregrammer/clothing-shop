import { FormEvent, useState } from "react";
import styles from "../styles/management.module.scss";
import ProductFeatureInput from "./ProductFeatureInput";
import ProductInventoryInput from "./ProductInventoryInput";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Props {
  handleProductModal: (e: React.MouseEvent<HTMLElement>) => void;
}

const ProductModal = ({ handleProductModal }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [productFeatureInputs, setProductFeatureInputs] = useState([
    <ProductFeatureInput />,
  ]);
  const [productInventoryInputs, setProductInventoryInputs] = useState([
    <ProductInventoryInput />,
  ]);
  const handleAddFeature = () => {
    setProductFeatureInputs((prev) => [...prev, <ProductFeatureInput />]);
  };
  const handleAddInventory = () => {
    setProductInventoryInputs((prev) => [...prev, <ProductInventoryInput />]);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(files);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={handleProductModal}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.modal_content_form}>
          <div>
            <h2>نام محصول:</h2>
            <input type="text" placeholder="نام محصول را وارد کنید..." />
          </div>
          <div>
            <h2>ویژگی ها:</h2>
            <div>
              {productFeatureInputs}
              <button type="button" onClick={handleAddFeature}>
                افزودن ویژگی
              </button>
            </div>
          </div>
          <div>
            <h2>انبار:</h2>
            <div>
              {productInventoryInputs}
              <button type="button" onClick={handleAddInventory}>
                افزودن موجودی
              </button>
            </div>
          </div>
          <div>
            <h2>جزئیات قیمت:</h2>
            <div>
              <div>
                <span>قیمت:</span>
                <input type="number" placeholder="قیمت محصول را وارد کنید" />
              </div>
              <div>
                <span>تخفیف:</span>
                <input
                  type="number"
                  placeholder="درصد تخفیف محصول را وارد کنید"
                />
              </div>
            </div>
          </div>
          <div>
            <h2>گالری تصاویر:</h2>
            <div className={styles.image_uploader_container}>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                allowReorder={true}
                instantUpload={false}
                maxFiles={5}
                name="files"
                labelIdle="<span style='font-family: vazir;'>...عکس های محصول را انتخاب یا در این قسمت رها کنید</span>"
                server="/api"
              />
            </div>
          </div>
          <div>
            <button type="submit">افزودن</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;

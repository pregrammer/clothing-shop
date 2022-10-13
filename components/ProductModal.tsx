import { FormEvent, useEffect, useState } from "react";
import styles from "../styles/management.module.scss";
import ProductFeatureInput from "./ProductFeatureInput";
import ProductInventoryInput from "./ProductInventoryInput";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import useAxiosAuthFunctionWithFile from "../helpers/useAxiosAuthFunctionWithFile";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  kind: string;
  features: { title: string; feature: string }[];
  inventories: { size: string; inventory: number }[];
}

interface Props {
  handleProductModal: (editData?: Product) => void;
  editData?: Product;
  handleRefreshPage: () => void;
}

const ProductModal = ({
  handleProductModal,
  handleRefreshPage,
  editData,
}: Props) => {
  const [data, axiosFetch]: any = useAxiosAuthFunctionWithFile();
  const [files, setFiles] = useState<any>([]);
  const [productInputs, setProductInputs] = useState({
    name: editData ? editData.name : "",
    price: editData ? editData.price : "",
    discount: editData ? editData.discount : "",
    kind: editData ? editData.kind : "",
  });

  const handleDeleteFeature = (id: string) => {
    setProductFeatureInputs((prev: any) => {
      if (prev.length > 1) {
        return prev.filter((inp: any) => inp.id !== id);
      } else {
        toast.error("حداقل یک مورد نیاز است", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return prev;
      }
    });
  };
  const handleAddFeature = () => {
    const pfi_id = uuidv4();
    setProductFeatureInputs((prev) => [
      ...prev,
      {
        id: pfi_id,
        element: (
          <ProductFeatureInput
            id={pfi_id}
            handleDeleteFeature={handleDeleteFeature}
          />
        ),
      },
    ]);
  };

  const handleDeleteInventory = (id: string) => {
    setProductInventoryInputs((prev: any) => {
      if (prev.length > 1) {
        return prev.filter((inp: any) => inp.id !== id);
      } else {
        toast.error("حداقل یک مورد نیاز است", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return prev;
      }
    });
  };
  const handleAddInventory = () => {
    const pii_id = uuidv4();
    setProductInventoryInputs((prev) => [
      ...prev,
      {
        id: pii_id,
        element: (
          <ProductInventoryInput
            id={pii_id}
            handleDeleteInventory={handleDeleteInventory}
          />
        ),
      },
    ]);
  };

  const initialFeatureInputs = () => {
    if (editData) {
      return editData.features.map((feature) => {
        const pfi_id = uuidv4();
        return {
          id: pfi_id,
          element: (
            <ProductFeatureInput
              id={pfi_id}
              handleDeleteFeature={handleDeleteFeature}
              inputValue={feature}
            />
          ),
        };
      });
    } else {
      const pfi_id = uuidv4();
      return [
        {
          id: pfi_id,
          element: (
            <ProductFeatureInput
              id={pfi_id}
              handleDeleteFeature={handleDeleteFeature}
            />
          ),
        },
      ];
    }
  };
  const initialInventoryInputs = () => {
    if (editData) {
      return editData.inventories.map((inventory) => {
        const pii_id = uuidv4();
        return {
          id: pii_id,
          element: (
            <ProductInventoryInput
              id={pii_id}
              handleDeleteInventory={handleDeleteInventory}
              inputValue={inventory}
            />
          ),
        };
      });
    } else {
      const pii_id = uuidv4();
      return [
        {
          id: pii_id,
          element: (
            <ProductInventoryInput
              id={pii_id}
              handleDeleteInventory={handleDeleteInventory}
            />
          ),
        },
      ];
    }
  };

  const [productFeatureInputs, setProductFeatureInputs] = useState(
    initialFeatureInputs()
  );

  const [productInventoryInputs, setProductInventoryInputs] = useState(
    initialInventoryInputs()
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const feature_titles: string[] = [];
    const feature_titles_elements = document.getElementsByClassName(
      "product_feature_title_input"
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < feature_titles_elements.length; i++) {
      feature_titles.push(feature_titles_elements[i].value);
    }

    const feature_texts: string[] = [];
    const feature_texts_elements = document.getElementsByClassName(
      "product_feature_text_input"
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < feature_texts_elements.length; i++) {
      feature_texts.push(feature_texts_elements[i].value);
    }

    const product_sizes: string[] = [];
    const product_sizes_elements = document.getElementsByClassName(
      "product_size_input"
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < product_sizes_elements.length; i++) {
      product_sizes.push(product_sizes_elements[i].value);
    }

    const product_inventories: string[] = [];
    const product_inventories_elements = document.getElementsByClassName(
      "product_inventory_input"
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < product_inventories_elements.length; i++) {
      product_inventories.push(product_inventories_elements[i].value);
    }

    const features: { title: string; feature: string }[] = [];
    feature_titles.forEach((t, i) => {
      features.push({
        title: t,
        feature: feature_texts[i],
      });
    });

    const inventories: { size: string; inventory: string }[] = [];
    product_sizes.forEach((s, i) => {
      inventories.push({
        size: s,
        inventory: product_inventories[i],
      });
    });

    if (editData) {
      await axiosFetch({
        method: "PUT",
        url: "/products",
        requestConfig: {
          data: {
            images: files.map((f: any) => f.source),
            id: editData.id,
            ...productInputs,
            features,
            inventories,
          },
        },
      });
    } else {
      await axiosFetch({
        method: "POST",
        url: "/products",
        requestConfig: {
          data: {
            images: files.map((f: any) => f.source),
            ...productInputs,
            features,
            inventories,
          },
        },
      });
    }
    handleRefreshPage();
  };

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleProductModal();
    }
  }, [data]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <span className={styles.close} onClick={() => handleProductModal()}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className={styles.modal_content_form}>
          <div>
            <h2>نام محصول:</h2>
            <input
              type="text"
              required
              placeholder="نام محصول را وارد کنید..."
              value={productInputs.name}
              onChange={(e) =>
                setProductInputs((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <h2>دسته بندی:</h2>
            <select
              value={productInputs.kind}
              onChange={(e) =>
                setProductInputs((prev) => ({ ...prev, kind: e.target.value }))
              }
              required
            >
              <option value=""></option>
              <option value="clothes">clothes</option>
              <option value="pants">pants</option>
              <option value="shoes">shoes</option>
              <option value="men_accessory">men_accessory</option>
              <option value="women_accessory">women_accessory</option>
            </select>
          </div>
          <div>
            <h2>ویژگی ها:</h2>
            <div>
              {productFeatureInputs.map((pfi) => (
                <div key={pfi.id}>{pfi.element}</div>
              ))}
              <button type="button" onClick={handleAddFeature}>
                افزودن ویژگی
              </button>
            </div>
          </div>
          <div>
            <h2>انبار:</h2>
            <div>
              {productInventoryInputs.map((pii) => (
                <div key={pii.id}>{pii.element}</div>
              ))}
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
                <input
                  type="number"
                  required
                  placeholder="قیمت محصول را وارد کنید"
                  value={productInputs.price}
                  onChange={(e) =>
                    setProductInputs((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <span>تخفیف:</span>
                <input
                  type="text"
                  placeholder="درصد یا قیمت تخفیف محصول را وارد کنید"
                  value={productInputs.discount}
                  onChange={(e) =>
                    setProductInputs((prev) => ({
                      ...prev,
                      discount: e.target.value,
                    }))
                  }
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
                required={editData ? false : true}
                labelIdle="<span style='font-family: vazir;'>...عکس های محصول را انتخاب یا در این قسمت رها کنید</span>"
                server="/api"
              />
            </div>
          </div>
          <div>
            <button type="submit">{editData ? "ویرایش" : "افزودن"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;

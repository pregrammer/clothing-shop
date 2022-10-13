import MProductTRow from "./MProductTRow";

interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  kind: string;
  features: { title: string; feature: string }[];
  inventories: { size: string; inventory: number }[];
}

interface Prop {
  handleProductModal: (editData?: Product) => void;
  products: Product[];
  handleRefreshPage: () => void;
}

const ManagementProductTable = ({
  handleProductModal,
  products,
  handleRefreshPage,
}: Prop) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>نام محصول</th>
          <th>انبار</th>
          <th>قیمت</th>
          <th>تغییرات</th>
        </tr>
      </thead>
      <tbody>
      {products?.length ? (
          products.map((product: Product, idx: number) => (
            <MProductTRow
              key={product.id}
              product={product}
              rowNumber={idx + 1}
              handleProductModal={handleProductModal}
              handleRefreshPage={handleRefreshPage}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="has-no-row">
              محصولی برای نمایش وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ManagementProductTable;

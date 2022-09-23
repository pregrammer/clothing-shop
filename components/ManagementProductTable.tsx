import MProductTRow from "./MProductTRow";

const ManagementProductTable = () => {
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
        <MProductTRow />
        <MProductTRow />
        <MProductTRow />
        <MProductTRow />
        <MProductTRow />
        <MProductTRow />
      </tbody>
    </table>
  );
};

export default ManagementProductTable;

import MDiscountTRow from "./MDiscountTRow";

const ManagementDiscountTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان</th>
          <th>درصد / قیمت</th>
          <th>تغییرات</th>
        </tr>
      </thead>
      <tbody>
        <MDiscountTRow />
        <MDiscountTRow />
        <MDiscountTRow />
      </tbody>
    </table>
  );
};

export default ManagementDiscountTable;

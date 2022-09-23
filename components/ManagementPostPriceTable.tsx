import MPostPTRow from "./MPostPTRow";

const ManagementPostPriceTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>عنوان</th>
          <th>قیمت</th>
          <th>تغییرات</th>
        </tr>
      </thead>
      <tbody>
        <MPostPTRow />
        <MPostPTRow />
        <MPostPTRow />
        <MPostPTRow />
        <MPostPTRow />
      </tbody>
    </table>
  );
};

export default ManagementPostPriceTable;

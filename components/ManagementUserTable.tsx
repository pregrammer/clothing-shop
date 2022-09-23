import MUserTRow from "./MUserTRow";

const ManagementUserTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>نام و نام خانوادگی</th>
          <th>ایمیل</th>
          <th>شماره همراه</th>
          <th>تاریخ عضویت</th>
          <th>تغییرات</th>
        </tr>
      </thead>
      <tbody>
        <MUserTRow />
        <MUserTRow />
        <MUserTRow />
        <MUserTRow />
        <MUserTRow />
        <MUserTRow />
        <MUserTRow />
      </tbody>
    </table>
  );
};

export default ManagementUserTable;

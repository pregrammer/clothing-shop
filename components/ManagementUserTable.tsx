import MUserTRow from "./MUserTRow";

interface User {
  id: number;
  fullName: string;
  state: number;
  email: string;
  phoneNumber: string;
  created_at: string;
}

interface Prop {
  users: User[];
  handleRefreshPage: () => void;
}

const ManagementUserTable = ({ users, handleRefreshPage }: Prop) => {
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
        {users?.length ? (
          users.map((user: User, idx: number) => (
            <MUserTRow
              key={user.id}
              user={user}
              rowNumber={idx + 1}
              handleRefreshPage={handleRefreshPage}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="has-no-row">
              کاربری برای نمایش وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ManagementUserTable;

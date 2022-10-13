import { useEffect, useState } from "react";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import MDiscountTRow from "./MDiscountTRow";

interface DiscountCode {
  id: number;
  title: string;
  percent: string;
}

interface Prop {
  refreshDiscountTable: boolean;
  handleRefreshDiscountTable: () => void;
}

const ManagementDiscountTable = ({
  refreshDiscountTable,
  handleRefreshDiscountTable,
}: Prop) => {
  const [discountCodes, axiosFetch]: any = useAxiosAuthFunction();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/discount-codes`,
    });
  }, [refreshDiscountTable]);

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
        {discountCodes?.length ? (
          discountCodes.map((discountCode: DiscountCode, idx: number) => (
            <MDiscountTRow
              key={discountCode.id}
              discountCode={discountCode}
              rowNumber={idx + 1}
              handleRefreshDiscountTable={handleRefreshDiscountTable}
            />
          ))
        ) : (
          <tr>
            <td colSpan={4} className="has-no-row">
              کد تخفیفی برای نمایش وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ManagementDiscountTable;

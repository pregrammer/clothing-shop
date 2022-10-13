import { useEffect, useState } from "react";
import useAxiosAuthFunction from "../helpers/useAxiosAuthFunction";
import MPostPTRow from "./MPostPTRow";

interface PostPrice {
  id: number;
  title: string;
  price: string;
}

interface Prop {
  refreshPostTable: boolean;
  handleRefreshPostTable: () => void;
}

const ManagementPostPriceTable = ({
  refreshPostTable,
  handleRefreshPostTable,
}: Prop) => {
  const [postPrices, axiosFetch]: any = useAxiosAuthFunction();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/post-prices`,
    });
  }, [refreshPostTable]);

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
        {postPrices?.length ? (
          postPrices.map((postPrice: PostPrice, idx: number) => (
            <MPostPTRow
              key={postPrice.id}
              postPrice={postPrice}
              rowNumber={idx + 1}
              handleRefreshPostTable={handleRefreshPostTable}
            />
          ))
        ) : (
          <tr>
            <td colSpan={4} className="has-no-row">
              قیمت پستی برای نمایش وجود ندارد
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ManagementPostPriceTable;

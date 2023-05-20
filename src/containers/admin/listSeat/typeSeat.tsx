import Genre from "@/apis/genre";
import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import Seat from "@/apis/seat";
import styles from "./style.module.scss";

export default function TypeSeat({}: any, props: any) {
  const [listTypeSeat, setListTypeSeat] = useState<AdminCore.TypeSeat[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Seat.getAllTypeseat("ALL");
      const typeseats =
        response.typeseats?.map((account: any) => ({
          key: account.id,
          id: account.id,
          name: account.name,
          updatedAt: account.updatedAt,
        })) || [];
      setListTypeSeat(typeseats);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };
//   const handleDelete = async (id: number) => {
//     await Genre.deleteGenre(id);
//     setListGenres(
//       listTypeSeat.filter((item: { id: number }) => item.id !== id)
//     );
//   };

  const columns: ColumnsType<AdminCore.Genre> = [
    {
      title: "Mã Loại Ghế",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Loại Ghế",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
  ];
  if (isLoading) {
    return <Skeleton active> </Skeleton>;
  }
  return (
    <>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listTypeSeat}
      />
    </>
  );
}

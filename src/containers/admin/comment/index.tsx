import Genre from "@/apis/genre";
import { Button, Popconfirm, Skeleton, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Seat from "@/apis/seat";
import Room from "@/apis/room";
import { DeleteOutlined } from "@ant-design/icons";
import ShowTimeApi from "@/apis/showtime";
import Comment from "@/apis/comment";
import User from "@/apis/auth";
import Movie from "@/apis/movie";

export default function ListComment({}: any, props: any) {
  const [listComments, setListComments] = useState<AdminCore.Comment[] | any>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Comment.getAllComments("ALL");
      const comments =
        response.comments?.map((comment: any) => ({
          user_id: comment.user_id,
          movie_id: comment.movie_id,
          comment_text: comment.comment_text,
          key: comment.id,
          id: comment.id,
          updatedAt: comment.updatedAt,
        })) || [];
      setListComments(comments);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("listComment", listComments);

  const [userList, setUserList] = useState<AdminCore.User[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await User.getAllAuth("ALL");
        setUserList(result.users);
      } catch (e) {}
    })();
  }, []);
  console.log("userList", userList);


  const [listMovies, setListMovies] = useState<AdminCore.Movie[] | any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setListMovies(response.movies);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    await Comment.deleteComment(id);
    setListComments(
      listComments.filter((item: { id: number }) => item.id !== id)
    );
  };

  const columns: ColumnsType<AdminCore.Seat> = [
    {
      title: "Email",
      dataIndex: "user_id",
      key: "user_id",
      align: "center",
      width: "15%",
      render: (usersId) => {
        const emailUser = userList.find((user: any) => user.id === usersId);
        return emailUser ? emailUser.email : null;
      },
    },
    {
      title: "Phim",
      dataIndex: "movie_id",
      key: "movie_id",
      align: "center",
      width: "15%",
      render: (movieId) => {
        const nameMovie = listMovies.find((movie: any) => movie.id === movieId);
        return nameMovie ? nameMovie.title : null;
      },
    },
    {
      title: "Bình Luận",
      dataIndex: "comment_text",
      key: "comment_text",
      // align: "center",
      width: "60%",
    },

    {
      title: "Thao Tác",
      key: "",
      align: "center",
      width: "10%",
      render: (_, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              className={styles.btn_delete}
              style={{ float: "right", margin: "0px" }}
              type="primary"
            >
              <DeleteOutlined className={styles.icon} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  if (isLoading) {
    return <Skeleton active> </Skeleton>;
  }
  return (
    <>
      <h1 className={styles.title}> Bình Luận Phim</h1>
      {/* <TypeSeat></TypeSeat> */}

      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listComments}
      />
    </>
  );
}

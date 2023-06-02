import User from "@/apis/auth";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Movie from "@/apis/movie";
import Genre from "@/apis/genre";
import moment from "moment";
const { Search } = Input;

export default function Phim({}: any, props: any) {
  const [listUsers, setListUsers] = useState<AdminCore.Movie[] | any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setListUsers(
          response.movies?.map(
            (account: {
              key: string;
              id: string;
              title: string;
              image_url: string;
              countries: string;
              poster_url: boolean;
              trailer_url: string;
              release_date: string;
              run_time: number;
              director: string;
              genres_id: number;
              description: string;
              day_start: Date;
              status: string;
            }) => ({
              key: account.id,
              id: account.id,
              title: account.title,
              image_url: account.image_url,
              countries: account.countries,
              poster_url: account.poster_url,
              trailer_url: account.trailer_url,
              release_date: account.release_date,
              run_time: account.run_time,
              director: account.director,
              genres_id: account.genres_id,
              description: account.description,
              day_start: account.day_start,
              status: account.status,
            })
          )
        );
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const [genreList, setGenreList] = useState<AdminCore.Genre[]>([]);
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await Genre.getAll("ALL");
      setGenreList(response.genres);
    } catch (error) {
      console.log("Error fetching genres:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    await Movie.deleteMoive(id);
    setListUsers(listUsers.filter((item: { id: number }) => item.id !== id));
  };
  const formattedDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  const [selectedMovie, setSelectedMovie] = useState<AdminCore.Movie | null>(
    null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (movie: AdminCore.Movie) => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const renderStatus = (status: string | undefined) => {
    let label = "";
    if (status === "hot") {
      label = "Hot";
    } else if (status === "coming_soon") {
      label = "Sắp Chiếu";
    } else if (status === "now_showing") {
      label = "Đang Chiếu";
    }
    return <span>{label}</span>;
  };
  const columns: ColumnsType<AdminCore.Movie> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "5%",
    },
    {
      title: "Tên Phim",
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text, record) => (
        <Button type="link" onClick={() => handleOpenModal(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: "Ảnh",
      align: "center",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => (
        <img src={text} alt="Image" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Nội Dung",
      dataIndex: "description",
      key: "description",
      width: "30%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quốc Gia ",
      dataIndex: "countries",
      key: "countries",
    },
    {
      title: "Thể Loại",
      dataIndex: "genres_id",
      key: "genres_id",
      render: (genresId) => {
        const genre = genreList.find((genre) => genre.id === genresId);
        return genre ? genre.name : null;
      },
    },
    {
      title: "Thời Lượng",
      dataIndex: "run_time",
      key: "run_time",
      render: (text) => <p>{text} phút</p>,
    },
    {
      title: "Diễn Viên",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Thao Tác",
      key: "",
      align: "center",

      render: (_, record: any) => (
        <Space size="middle">
          <a>
            <Link href={`/listPhim/${record.id}`}>
              <Button style={{ float: "right", margin: "0px" }} type="primary">
                <EditOutlined />
              </Button>
            </Link>
          </a>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button style={{ float: "right", margin: "0px" }} type="primary">
              <DeleteOutlined />
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
      <Row>
        <Col className={styles.col_left} span={7}>
          <Search
            size="large"
            placeholder="Nhập tìm kiếm"
            // onSearch={onSearch}
            enterButton
          />
        </Col>
        <Col offset={3}>
          <h1 className={styles.title}> Danh Sách Phim</h1>
        </Col>
      </Row>

      <Link href={"/listPhim/create"}>
        <Button className={styles.btn_add} type="primary">
          + Thêm Phim
        </Button>
      </Link>
      <Modal
        className={styles.modal}
        title={
          <span className={styles.title_movie}>
            {selectedMovie?.title ?? "Thông tin chi tiết"}
          </span>
        }
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <p>
          Nội Dung: <span>{selectedMovie?.description} </span>
        </p>
        <p>
          Ngày Khởi Chiếu:{" "}
          <span>
            {selectedMovie
              ? moment(selectedMovie.day_start).format("DD/MM/YYYY")
              : ""}
          </span>
        </p>
        <p>
          Trạng Thái:{" "}
          <span>{selectedMovie ? renderStatus(selectedMovie.status) : ""}</span>
        </p>

        <p>
          Đạo Diễn: <span> {selectedMovie?.release_date}</span>
        </p>
        <p>
          Quốc Gia: <span> {selectedMovie?.countries}</span>
        </p>
        <p>
          Thể Loại:{" "}
          <span>
            {selectedMovie
              ? genreList.find((genre) => genre.id === selectedMovie.genres_id)
                  ?.name
              : ""}
          </span>
        </p>
        <p>
          Thời Lượng: <span>{selectedMovie?.run_time} phút </span>
        </p>
        <p>
          Diễn Viên: <span> {selectedMovie?.director}</span>{" "}
        </p>
      </Modal>
      <Table
        bordered
        className={styles.table_list}
        columns={columns}
        dataSource={listUsers}
      />
    </>
  );
}

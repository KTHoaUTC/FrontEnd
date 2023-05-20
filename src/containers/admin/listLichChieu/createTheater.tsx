import Theater from "@/apis/rap";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Select,
  Space,
  TimePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Room from "@/apis/room";
import Movie from "@/apis/movie";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ShowTimeApi from "@/apis/showtime";

dayjs.extend(customParseFormat);

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: any;
  onCancel: () => void;
  onSuccess: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [movieList, setMovieList] = useState<AdminCore.Movie[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Movie.getAll("ALL");
        setMovieList(response.movies);
      } catch (e) {}
    })();
  }, []);
  //listheater
  const [theaterList, setTheaterList] = useState<AdminCore.Rap[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Theater.getAll("ALL");
        setTheaterList(response.theaters);
      } catch (e) {}
    })();
  }, []);
  //listroom
  const [originalRoomList, setOriginalRoomList] = useState<AdminCore.Room[]>(
    []
  );

  const [roomList, setRoomList] = useState<AdminCore.Room[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await Room.getAllRooms("ALL");
        setRoomList(response.phongchieus);
        setOriginalRoomList(response.phongchieus);
      } catch (e) {}
    })();
  }, []);
  // console.log("movielist", roomrList);

  const handleTheaterChange = (value: any) => {
    const selectedTheater = theaterList.find((theater) => theater.id === value);
    if (selectedTheater) {
      const filteredRooms = originalRoomList.filter(
        (room) => room.theater_id === value
      );
      setRoomList(filteredRooms);
    }
  };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onChangeTime = (time: Dayjs | any, timeString: string) => {
    console.log(time, timeString);
  };
  const handleCreate = async (values: any) => {
    try {
      const newData = {
        ...values,
      };
      await onCreate(newData);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };
  return (
    <Modal
      title={
        <p
          style={{
            textAlign: "center",
            margin: "1.5rem 0rem",
            fontSize: "1.7rem",
          }}
        >
          Thêm Lịch Chiếu Phim
        </p>
      }
      width={"50%"}
      visible={visible}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        className={styles.form}
        size="large"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="movie_id"
          label="Phim"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn phim"
            optionFilterProp="children"
            style={{ width: "100%" }}
            options={movieList.map((movie) => ({
              value: movie.id,
              label: movie.title,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="theater_id"
          label="Rạp Chiếu"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Rạp Chiếu"
            optionFilterProp="children"
            style={{ width: "100%" }}
            options={theaterList.map((theater) => ({
              value: theater.id,
              label: theater.name,
            }))}
            onChange={handleTheaterChange}
          />
        </Form.Item>

        <Form.Item
          name="phongchieu_id"
          label="Phòng Chiếu"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn Phòng Chiếu"
            optionFilterProp="children"
            style={{ width: "100%" }}
            options={roomList.map((room) => ({
              value: room.id,
              label: room.name,
            }))}
          />
        </Form.Item>

        <Form.Item name="ngay_chieu" label="Ngày Chiếu" required>
          <DatePicker
            placeholder="Chọn Ngày Chiếu "
            style={{ width: "100%" }}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item name="gio_chieu" label="Giờ Chiếu" required>
          <TimePicker
            placeholder="Chọn Giờ Chiếu"
            style={{ width: "100%" }}
            onChange={onChangeTime}
            // value={value}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>

        <Form.Item
          name="money"
          label="Giá Vé"
          required
          rules={[
            {
              required: true,
              message: <p className={styles.vadidate}>Không để trống ô này</p>,
            },
          ]}
        >
          <Input placeholder="Nhập Giá Vé" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ModalAddShowTime = ({ onSuccess }: { onSuccess: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [listRooms, setListRooms] = useState<AdminCore.Rap[] | any>([]);

  const handleCreate = async (newData: AdminCore.Rap) => {
    const result = await ShowTimeApi.creatShowTime(newData);
    setListRooms([...listRooms, newData]);
    console.log("testData", newData);
    onSuccess();
    setVisible(false);
  };
  return (
    <>
      <Button
        className={styles.btn_add}
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
      >
        + Thêm Lịch Chiếu
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={handleCreate}
        onCancel={() => {
          setVisible(false);
        }}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default ModalAddShowTime;

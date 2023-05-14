/* eslint-disable import/no-extraneous-dependencies */
import { Badge, Layout } from 'antd'
import 'leaflet/dist/leaflet.css'
import React from 'react'
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet'
import styles from './style.module.scss'

const { Content, Sider } = Layout

const MapContent: React.FC = () => {
  const redOptions = { color: 'red' }
  return (
    <Layout className={styles.site_layout_map}>
      <MapContainer
        className={styles.map}
        center={[21.0325, 105.78853]}
        zoom={15}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CircleMarker
          center={[21.0325, 105.78853]}
          pathOptions={redOptions}
          radius={15}
        >
          <Popup>
            <Badge
              className={styles.list_status}
              status="default"
              text=" Rạp BHH Cầu Giấy"
            />
          </Popup>
        </CircleMarker>
        <CircleMarker
          center={[21.0521, 105.8488]}
          pathOptions={redOptions}
          radius={15}
        >
          <Popup>
            <Badge
              className={styles.list_status}
              status="error"
              text=" Rạp BHH Chùa Láng"
            />
          </Popup>
        </CircleMarker>
        <CircleMarker
          center={[21.0767, 105.7913]}
          pathOptions={redOptions}
          radius={15}
        >
          <Popup>
            <Badge
              className={styles.list_status}
              status="success"
              text=" Rạp BHH Hồ Tây"
            />
          </Popup>
        </CircleMarker>
      </MapContainer>
    </Layout>
  );
}
export default MapContent

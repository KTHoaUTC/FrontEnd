import ContentHome from "./Home/Content";
import ContentHot from "./Home/ContentHot";
import ContentDeXuat from "./Home/DeXuat";
import SlideHome from "./Home/Slide";
import Theater from "./Home/Theater";
import Map from "./Map";
const HomeAuth = () => {
  return (
    <>
      <SlideHome></SlideHome>
      <ContentDeXuat></ContentDeXuat>
      <ContentHot></ContentHot>
      <ContentHome></ContentHome>
    
      <Theater></Theater>
        <Map></Map>
    </>
  );
};

export default HomeAuth;

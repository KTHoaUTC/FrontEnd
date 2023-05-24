import ContentHome from "./Home/Content";
import ContentHot from "./Home/ContentHot";
import SlideHome from "./Home/Slide";
import Theater from "./Home/Theater";
import Map from "./Map";
const HomeAuth = () => {
  return (
    <>
      <SlideHome></SlideHome>
      <ContentHot></ContentHot>
      <ContentHome></ContentHome>
    
      <Theater></Theater>
        <Map></Map>
    </>
  );
};

export default HomeAuth;

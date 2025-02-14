import { useEffect, useRef, useState } from "react";

import loginService from "@/shared/services/loginServices";
import { useUserStore } from "@/shared/store/useUserStore";
import mapServices from "@/shared/services/mapServices";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import PathChart from "@/features/PathChart";
import "./styles";

const App = () => {
  const getToken = useUserStore((state: any) => state.setTokens);
  const token = useUserStore((state: any) => state.token);
  const [information, setInformation] = useState<any>(null);

  const map = useRef(null);

  useEffect(() => {
    if (!token) {
      loginService.login({ login: "testdemo", password: "demo" }).then((data) => {
        getToken(data);
      });
    }

    mapServices
      .getRoutesPoint({
        id: 740,
        date_start: "2025-02-05 06:13:02",
        date_end: "2025-02-07 17:53:24",
      })
      .then((data) => setInformation(data));
  }, [token]);

  const limeOptions = { color: "red" };

  const multiPolygon = information ? (Object.entries(information) as any)[0][1][0].route.map((element: any) => [element.lat, element.lng]) : [];

  return (
    <>
      <MapContainer center={[53.505, 49.09]} zoom={13} scrollWheelZoom={true} style={{ height: "600px" }} ref={map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline pathOptions={limeOptions} positions={multiPolygon} />
        <MapContainer />
      </MapContainer>
      {information && <PathChart data={(Object.entries(information) as any)[0][1][0].route} map={map} />}
    </>
  );
};

export default App;

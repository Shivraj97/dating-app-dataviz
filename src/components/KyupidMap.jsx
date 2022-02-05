import React, { useState } from "react";
import { Map, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Kyupid.css";

const initialState = {
  center: [12.9018822, 77.6055933],
  zoom: 10,
};
const Kyupid = ({ areas }) => {
  const [viewPort, setViewPort] = useState(initialState);
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };

  const onEachCountry = (country, layer) => {
    layer.options.fillColor = country.properties.color;
    const name = country.properties.name;
    const pinCode = country.properties.pin_code;
    const users = country.properties.users;
    const proUsers = country.properties.proUsers;
    const maleUsers = country.properties.maleUsers;
    const femaleUsers = country.properties.femaleUsers;
    layer.on("mouseover", function (e) {
      layer
        .bindPopup(
          `<div class="tooltip-details"><h5 class="area-name">${name}</h5> <div class="label">Pincode: <span>${pinCode} </span> </div> <div class="label"> Total users:<span> ${users}</span> </div> <div class="label">Male users: <span>${maleUsers} </span>👦 </div> <div class="label">Female uesrs: <span>${femaleUsers}</span> 👧</div><div class="label">Paid users: <span>${proUsers}</span> 💲</div></div>`
        )
        .openPopup();
    });
  };

  return (
    <>
      <Map
        style={{ height: "90vh" }}
        zoom={viewPort.zoom}
        center={viewPort.center}
      >
        <GeoJSON style={mapStyle} data={areas} onEachFeature={onEachCountry} />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
      </Map>
      <div className="brand">Kyupid Dating App</div>
    </>
  );
};

export default Kyupid;

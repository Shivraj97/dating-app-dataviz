import React from "react";
import { Map, GeoJSON, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Kyupid.css";
const Kyupid = ({ areas }) => {
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
          `${name} ${pinCode} has total ${users} users. Out of which ${maleUsers} are male and ${femaleUsers} are females. It has ${proUsers} paid users`
        )
        .openPopup();
    });
  };

  return (
    <Map style={{ height: "90vh" }} zoom={10} center={[12.9018822, 77.6055933]}>
      <GeoJSON style={mapStyle} data={areas} onEachFeature={onEachCountry} />
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
      />
    </Map>
  );
};

export default Kyupid;

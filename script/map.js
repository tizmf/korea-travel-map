const map = L.map("map", {
  center: [36.5, 127.8],
  zoom: 7,
  zoomControl: true,
  attributionControl: false
});

// 타일레이어 제거 – 타일 없음으로 지도 배경 없애기

fetch("korea_sigungoo.geojson")
  .then((res) => res.json())
  .then((geojson) => {
    const travelData = JSON.parse(localStorage.getItem("travelData") || "{}");

    L.geoJSON(geojson, {
      style: function (feature) {
        const name = feature.properties.name;
        const isVisited = travelData.hasOwnProperty(name);
        return {
          color: "#666",             // 윤곽선 회색
          weight: 1,
          fillColor: isVisited ? "#FF9933" : "#FFFFFF",
          fillOpacity: isVisited ? 0.6 : 0,
        };
      },
      onEachFeature: function (feature, layer) {
        const name = feature.properties.name;
        layer.bindTooltip(name);
        if (travelData[name]) {
          layer.on("click", () => window.open(travelData[name], "_blank"));
        }
      }
    }).addTo(map);
  });

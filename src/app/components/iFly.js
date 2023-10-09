export default class iFly {
  // accepts a list of objects
  // const locations = [
  //   {name: "Hebgen Lake South", lng: -111.27, lat: 44.80, zoom: 12, bearing: 150},
  //   {name: "Hebgen Lake North", lng: -111.26, lat: 45.10, zoom: 11, bearing: 176},
  //   {name: "Bozeman South", lng: -111.27, lat: 45.34, zoom: 11, bearing: 176},
  //   {name: "Gallatin Canyon", lng: -111.20, lat: 45.49, zoom: 11, bearing: 176},
  //   {name: "Hyalite Bozeman", lng: -111.01, lat: 45.52, zoom: 11, bearing: 150},
  //   {name: "Bridgers", lng: -110.89, lat: 45.77, zoom: 11, bearing: -10},
  //   {name: "Crazies", lng: -110.53, lat: 46.13, zoom: 11, bearing: 0},
  //   {name: "Big Timber", lng: -110.14, lat: 45.49, zoom: 11, bearing: 0},
  //   {name: "Main Boulder", lng: -110.16, lat: 45.37, zoom: 11, bearing: 0}]

  constructor(data) {
    this._data = data;
    this._html = this._generateHTML(this._data);

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl mapboxgl-ctrl-group";
    this._container.style.display = "flex";
    this._container.style.flexDirection = "row";

    this._toggleButton = document.createElement("button");
    this._toggleButton.className = "mapboxgl-ctrl-icon";
    this._toggleButton.innerHTML = `
    <svg width="29px" height="29px" viewBox="0 0 24 24" stroke-width="0.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M22 12L3 20l3.563-8L3 4l19 8zM6.5 12H22" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>    `;
    this._toggleButton.onclick = () => this._toggleContent();

    this._content = document.createElement("div");
    this._content.style =
      "font-size: .75rem; font-weight: 300; color: #1a202c; margin: .5rem;";
    this._content.style.display = "none";
    this._content.innerHTML = this._html;

    // add elements
    this._container.appendChild(this._toggleButton);
    this._container.appendChild(this._content);
  }

  _toggleContent() {
    this._content.style.display =
      this._content.style.display === "none" ? "inline-block" : "none";
  }

  _onItemClick(e) {
    if (e.target && e.target.matches("[data-lat][data-lng]")) {
      const lat = e.target.dataset.lat;
      const lng = e.target.dataset.lng;
      const zoom = e.target.dataset.zoom;
      const bearing = e.target.dataset.bearing;

      this._map.flyTo({ center: [lng, lat], zoom: zoom, bearing: bearing });
    }
  }

  _generateHTML(locations) {
    return locations
      .map(
        ({ name, lat, lng, zoom, bearing }) => `
        <div data-lat="${lat}" data-lng="${lng}" data-zoom="${zoom}" data-bearing="${bearing}" style="cursor: pointer; border-radius: 3px; margin-bottom: 2px;">
            ${name}
        </div>
    `
      )
      .join("");
  }

  onAdd(map) {
    this._map = map;

    // Bind the map move handler and attach it as a listener to the map's "move" event
    this._moveHandler = this._onMapMove.bind(this);
    this._map.on("move", this._moveHandler);

    this._clickHandler = this._onItemClick.bind(this);
    this._content.addEventListener("click", this._clickHandler);

    return this._container;
  }

  _onMapMove() {
    this._content.style.display = "none";
  }

  onRemove() {
    this._map.off("move", this._moveHandler);
    this._content.removeEventListener("click", this._clickHandler);
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

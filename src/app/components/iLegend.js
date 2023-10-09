export default class iLegend {
  // accepts a list of objects, e.g.
  //   const legendItems = [
  //     {
  //       title: "No Collection",
  //       tailwind: "w-4 h-4 mr-2 bg-red-500",
  //       css: ""
  //     },
  //     {
  //       title: "Private",
  //       tailwind: "w-4 h-4 mr-2 bg-black border-2 border-solid border-black",
  //       css: "backgroundImage: repeating-linear-gradient(-45deg, transparent, transparent 2px, #ffffff 2px, #ffffff 5px)"

  //     },
  //   ];

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
    <svg width="29px" height="29px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
    <path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
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

  _generateHTML(legendItems) {
    return legendItems
      .map(
        ({ title, tailwind, css }) => `
          <div class="flex items-center mb-2">
            <div class="${tailwind}" style="${css}"></div>
            <span>${title}</span>
          </div>
      `
      )
      .join("");
  }

  _onMapMove() {
    this._content.style.display = "none";
  }

  onAdd(map) {
    this._map = map;

    // Bind the map move handler and attach it as a listener to the map's "move" event
    this._moveHandler = this._onMapMove.bind(this);
    this._map.on("move", this._moveHandler);

    return this._container;
  }

  onRemove() {
    this._map.off("move", this._moveHandler);
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './style.css';
const GreyWorldMap = () => {
  useEffect(() => {
    // Create a map instance
    // const map = L.map('greyMap').setView([0, 0], 1);
    const map = L.map('greyMap', {
      center: [0, 0],
      zoom: 1,
      maxZoom: 1, // Set maxZoom to disable zooming
      minZoom: 1, // Set minZoom to disable zooming
      zoomControl: false, // Disable zoom control
      dragging: false,
    });

    // // Add a grey-scale tile layer to the map
    // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    // ).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 1, // Set maxZoom for the tile layer
    }).addTo(map);

    // Add a red marker to the map
    const marker = L.marker([0, 0], {
      icon: L.divIcon({ className: 'red-marker' }),
    }).addTo(map);

    // Add circles around the marker with different colors and larger radii
    const circle50 = L.circle([0, 0], { radius: 100000, color: 'grey' }).addTo(
      map
    ); // Increased radius to 50000
    const circle100 = L.circle([0, 0], {
      radius: 1000000,
      color: 'blue',
    }).addTo(map); // Increased radius to 100000

    // Add tooltip to the marker
    marker.bindTooltip("countryName", {
      permanent: true,
      direction: 'top',
      opacity: 0.8,
      offset: [6, 0],
    });

    // Create a separate div element for the popup content
    const popupContent = document.createElement('div');
    popupContent.innerHTML = renderToString(
      <>
        <h2>Austrian Power Grid</h2>
        <br />
        <img
          loading="lazy"
          decoding="async"
          class="wp-image-36154 size-medium aligncenter"
          src="https://www.smartwires.com/wp-content/uploads/2022/01/APG-300x203.png"
          alt=""
          width="300"
          height="203"
          srcset="https://www.smartwires.com/wp-content/uploads/2022/01/APG-300x203.png 300w, https://www.smartwires.com/wp-content/uploads/2022/01/APG-1030x696.png 1030w, https://www.smartwires.com/wp-content/uploads/2022/01/APG-768x519.png 768w, https://www.smartwires.com/wp-content/uploads/2022/01/APG-705x476.png 705w, https://www.smartwires.com/wp-content/uploads/2022/01/APG-450x304.png 450w, https://www.smartwires.com/wp-content/uploads/2022/01/APG.png 1116w"
          sizes="(max-width: 300px) 100vw, 300px"
        />
        <h3>
          Evaluating SmartValves in a mobile deployment for improving grid
          availability and operation reliability in Austria
        </h3>
        {/* <div className="media ekit-flex-column ekit-location_inner" style={{}}>
          <div className="media-body" style={{}}>
            <h3 className="ekit-hotspot-title" style={{}}>
              National Grid Electricity Transmission
            </h3>
            <div className="ekit-location-des">
              <p>
                <img
                  decoding="async"
                  className="wp-image-36274 size-medium aligncenter"
                  src="https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-300x200.jpg"
                  alt=""
                  width="300"
                  height="200"
                  srcSet="https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-300x200.jpg 300w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-1030x687.jpg 1030w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-768x512.jpg 768w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-391x260.jpg 391w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-705x470.jpg 705w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039-450x300.jpg 450w, https://www.smartwires.com/wp-content/uploads/2022/02/IMG_0039.jpg 1500w"
                  sizes="(max-width: 300px) 100vw, 300px"
                  style={{
                    outline: 'rgb(255, 0, 0) dashed 1px',
                    '--darkreader-inline-outline': '#b30000',
                  }}
                  data-darkreader-inline-outline=""
                />
                Maximizing use of the existing network to enable more renewables
                to connect in the UK
              </p>
              <p style={{}}>
                <span
                  style={{
                    color: 'rgb(255, 255, 255)',
                    '--darkreader-inline-color': '#e8e6e3',
                  }}
                  data-darkreader-inline-color=""
                >
                  <a
                    style={{
                      color: 'rgb(255, 255, 255)',
                      '--darkreader-inline-color': '#e8e6e3',
                    }}
                    href="https://www.nationalgrid.com/stories/journey-to-net-zero-stories/working-smarter-get-net-zero"
                    target="_blank"
                    rel="noopener"
                    data-darkreader-inline-color=""
                  >
                    Learn more
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div> */}
      </>
    );

    // Set the content of the popup using bindPopup
    marker.bindPopup(popupContent);

    // Add a click event listener to open the popup when the marker is clicked
    marker.on('click', () => {
      marker.openPopup();
    });

    // Cleanup: Remove the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div id="greyMap" style={{ height: '600px' }}></div>;
};

export default GreyWorldMap;

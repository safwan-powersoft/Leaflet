import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './style.css';

import { RefreshCw } from 'react-feather';
const countryData = [
  {
    Client_Name: 'GEB',
    SiteName: 'Ternera 1',
    Latitude: 53.7414331,
    Longitudes: -2.7292367,
    description:
      'Improving dispatch reliability for a generation plant in the north of Colombia',
    img: '',
    Deployment_Type: '1.04',
    Firmware: '4.1.3',
    flag: 'http://172.19.35.55/Assets/columbia.png',
  },
];

const DeploymentMap = () => {
  const initialCenter = [15, 40];

  useEffect(() => {
    const handleButtonClick = () => {
      console.log('Button clicked');
    };

    const map = L.map('map', {
      center: initialCenter,
      zoom: 2.5,
      maxZoom: 7,
      minZoom: 2.5,
      zoomControl: false,
      dragging: true,
      maxBounds: [
        [-90, -180],
        [90, 200],
      ],
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png',
      {}
    ).addTo(map);

    countryData.forEach(
      ({
        Latitude,
        Longitudes,
        Client_Name,
        description,
        img,
        Deployment_Type,
        Firmware,
        SiteName,
        flag,
      }) => {
        if (Longitudes !== '' && Latitude !== '') {
          const marker = L.marker([Latitude, Longitudes], {
            icon: L.divIcon({
              className: 'emoji-marker',
              html: `<img class="animated-img" src="${flag}" alt="SW" width="40" height="40" />`,
            }),
          }).addTo(map);

          const popupContent = document.createElement('div');
          popupContent.innerHTML = renderToString(
            <>
              <div className="media ekit-flex-column ekit-location_inner">
                <div className="media-body">
                  <h4 className="ekit-hotspot-title">{Client_Name}</h4>
                  <h6 className="ekit-hotspot-title">{SiteName}</h6>
                  <div className="ekit-location-des">
                    <p>
                      <img
                        decoding="async"
                        className="wp-image-36274 size-medium aligncenter"
                        src={img}
                        alt=""
                        width="260"
                        height="150"
                        sizes="(max-width: 250px) 100vw, 260px"
                        data-darkreader-inline-outline=""
                      />
                      <h5>{description}</h5>
                    </p>
                    <p>
                      <strong>Deployment Type: </strong>
                      <span>{Deployment_Type}</span>
                    </p>
                    <p>
                      <strong>Firmware: </strong>
                      <span>{Firmware}</span>
                    </p>
                    <button
                      type="button"
                      className="custom-button"
                      onClick={handleButtonClick}
                    >
                      Click me
                    </button>
                  </div>
                </div>
              </div>
            </>
          );

          marker
            .bindPopup(popupContent, {
              autoPan: true,
              maxWidth: 260,
              offset: [9, 10],
            })
            .openTooltip();

          marker.on('click', () => {
            marker.openPopup();
          });
        }
      }
    );

    const resetButton = L.Control.extend({
      options: {
        position: 'topright',
      },
      onAdd: function (map) {
        const container = L.DomUtil.create('div', 'reset-button');
        const refreshIconString = renderToString(
          <RefreshCw width="16" height="16" />
        );
        container.innerHTML = `<button type="button" class="map-reset btn btn-success mr-4"  onclick="resetMap()">${refreshIconString}</button>`;

        return container;
      },
    });
    map.addControl(new resetButton());

    window.resetMap = function () {
      map.setView(initialCenter, 2.5);
    };

    return () => {
      map.remove();
    };
  }, [countryData]);

  return (
    <div
      className="zIndex1"
      id="map"
      style={{ height: '93vh', marginTop: '7vh' }}
    ></div>
  );
};

export default DeploymentMap;

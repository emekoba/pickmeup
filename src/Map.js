import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import Marker from "./components/marker/Marker";
import "./Map.css";

function App() {
	const { REACT_APP_MAP_API_KEY1 } = process.env;

	const [map_comp, setmap_comp] = useState({
		Dcenter: {
			lat: 6.5244,
			lng: 3.3792,
		},

		center: {
			// lat: -25.363,
			// lng: 131.044,
			lat: 9.0628,
			lng: 7.519,
		},

		zoom: 17,
	});

	useEffect(() => {
		console.log("razz");
		setmap_comp({ ...map_comp, zoom: 17 });
	}, [map_comp.center]);

	function getUsersCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setmap_comp({
						...map_comp,
						center: {
							...map_comp.center,
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						},
					});
				},
				(err) => {
					alert(err);
				},
				{ maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
			);
		} else {
			alert("geolocation not supported on this device");
		}
	}

	function getMarker(map, maps) {
		// map.center.lat,
		// map.center.lng,

		const marker = new maps.Marker({
			position: {
				lat: map_comp.center.lat,
				lng: map_comp.center.lng,
				// lat: map.center.lat,
				// lng: map.center.lng,
			},
			map,
			title: "Hello World!",
		});

		return (
			<div className="marker-cntr">
				{marker}

				{/* <InfoWindow
					info={map_comp.infoWindow.info}
					toggleVisibility={toggleInfoWindow}
				/> */}
			</div>
		);
	}

	return (
		<div className="map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: REACT_APP_MAP_API_KEY1 }}
				defaultCenter={map_comp.Dcenter}
				center={map_comp.center}
				zoom={map_comp.zoom}
				// defaultZoom={map_comp.zoom}
				options={{
					disableDefaultUI: true,
					zoomControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					keyboardShortcuts: false,
					mapData: false,
					termsOfUse: false,
					google: false,
					fullscreenControl: false,
				}}
				yesIWantToUseGoogleMapApiInternals
				// onGoogleApiLoaded={({ map, maps }) => getMarker(map, maps)}
			>
				<Marker
					lat={map_comp.center.lat}
					lng={map_comp.center.lng}
					latlng={{
						lat: map_comp.center.lat,
						lng: map_comp.center.lng,
					}}
				/>
			</GoogleMapReact>

			<button className="find-me" onClick={getUsersCurrentLocation}>
				Find me
			</button>
		</div>
	);
}

export default App;

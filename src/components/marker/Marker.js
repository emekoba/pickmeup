import React, { useEffect, useState } from "react";
import marker_pin from "../../resources/images/marker.png";
import close from "../../resources/images/close.png";
import "./Marker.css";

export default function Marker({ latlng }) {
	const [infoWindow, setInfoWindow] = useState({
		isOpen: false,
		info: {},
	});

	useEffect(() => {
		setInfoWindow({
			...infoWindow,
			info: {
				...infoWindow.info,
				latitude: latlng.lat,
				longitude: latlng.lng,
			},
		});
	}, [latlng]);

	function toggleInfoWindow(e) {
		e.stopPropagation();

		setInfoWindow({
			...infoWindow,
			isOpen: !infoWindow.isOpen,
		});
	}

	return (
		<div className="marker-cntr">
			<button onClick={toggleInfoWindow}>
				<img src={marker_pin} className="marker-pin" />
			</button>

			{infoWindow.isOpen && (
				<InfoWindow
					info={infoWindow.info}
					toggleVisibility={toggleInfoWindow}
				/>
			)}
		</div>
	);
}

function InfoWindow({ info, toggleVisibility }) {
	return (
		<div className="info-window">
			<div className="info-word-fields">
				<p>latitude: {info.latitude}</p>

				<p>longitude: {info.longitude}</p>
			</div>

			<button onClick={toggleVisibility} className="close-icon">
				<img src={close} className="close-icon" />
			</button>
		</div>
	);
}

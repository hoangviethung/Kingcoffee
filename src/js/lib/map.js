const GGMapInit = () => {
	const mapSelector = document.querySelector("#map");
	const dealerLocatorList = document.querySelector(
		".dealer-locator-list .list"
	);
	let bounds = new google.maps.LatLngBounds();

	if (mapSelector) {
		let map,
			markers = [],
			itemClicked;
		let locations = locationsInput;
		const mapOption = {
			zoom: 12,
			styles: [{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [{
							"saturation": 36
						},
						{
							"color": "#333333"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [{
							"visibility": "on"
						},
						{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [{
						"visibility": "off"
					}]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [{
							"color": "#fefefe"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [{
							"color": "#fefefe"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f5f5f5"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f5f5f5"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "geometry",
					"stylers": [{
							"color": "#dedede"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [{
							"color": "#ffffff"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [{
							"color": "#f2f2f2"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [{
							"color": "#e9e9e9"
						},
						{
							"lightness": 17
						}
					]
				}
			]
		};
		const infoWindow = new google.maps.InfoWindow();
		const addMarkers = () => {
			locations.forEach((location, index) => {
				let locationLatLng = new google.maps.LatLng(location.lat, location.lng);
				let marker = new google.maps.Marker({
					map: map,
					title: location.name,
					position: locationLatLng,
					icon: "./assets/images/icons/marker-icon.svg"
				});
				bounds.extend(marker.position);
				markers.push(marker);
				showInfoMarkerOnMap(marker, index);
			});
			map.fitBounds(bounds);
		};

		const showInfoMarkerOnMap = (marker, index) => {
			google.maps.event.addListener(marker, "click", function() {
				infoWindow.setContent(`
				<h3>${locations[index].name}</h3>
				<p>${locations[index].address}</p>
				<p>${locations[index].phone}</p>
			`);
				itemClicked = index;
				infoWindow.open(map, marker);
				map.panTo(marker.getPosition());
				map.setZoom(12);
			});
		};

		const getLocationList = () => {
			if (dealerLocatorList) {
				dealerLocatorList.innerHTML = "";
				markers.forEach((marker, index) => {
					if (map.getBounds().contains(marker.getPosition())) {
						const newMarker = document.createElement("div");
						newMarker.classList.add("dealer-locator-item");
						newMarker.innerHTML = `
						<h3>${locations[index].name}</h3>
						<p>${locations[index].address}</p>
						<p>${locations[index].phone}</p>
					`;
						newMarker.setAttribute("marker-id", `${index}`);
						newMarker.addEventListener("click", () => {
							itemClicked = index;
							const markerIndex = newMarker.getAttribute("marker-id");
							google.maps.event.trigger(markers[markerIndex], "click");
						});
						dealerLocatorList.appendChild(newMarker);
					}
				});
			}
		};

		const initialize = () => {
			map = new google.maps.Map(mapSelector, mapOption);
			addMarkers();
			let listener = google.maps.event.addListener(map, "idle", () => {
				if (map.getZoom() > 12) {
					map.setZoom(12);
				}
				google.maps.event.removeListener(listener);
			});
			google.maps.event.addListener(map, "bounds_changed", getLocationList);
		};
		google.maps.event.addDomListener(window, "load", initialize);
	}
};

export default GGMapInit;
// At the top of script.js
let map = L.map('map').setView([6.63, 3.37], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);



let fullData, parcelLayer, highlightLayer, currentFeatures = [];


// Create a function that checks if the database has data. 
// If it's empty, it will fetch your otedola_estate.json file 
// and populate the database just once. 
// Add this new function to script.js
async function populateDatabase() {
  const parcelCount = await db.parcels.count();
  if (parcelCount === 0) {
    console.log("Database is empty. Populating from GeoJSON...");
    const response = await fetch("otedola_estate.json");
    const data = await response.json();
    await db.parcels.bulkAdd(data.features);
    console.log("Database populated successfully!");
  } else {
    console.log("Database already contains data.");
  }
}

// Modify your initial fetch call to use the new populateDatabase function 
// and then draw the parcels from the local database.
// Replace your old fetch() call with this
populateDatabase().then(async () => {
  const allParcels = await db.parcels.toArray();
  fullData = { type: "FeatureCollection", features: allParcels };
  drawParcels(allParcels);
});

// fetch("otedola_estate.json")
//   .then(response => response.json())
//   .then(data => {
//     fullData = data;
//     drawParcels(fullData.features);
// });

function toggleTable() {
  document.getElementById("tablePanel").classList.toggle("collapsed");
}

function drawParcels(features) {
  if (parcelLayer) map.removeLayer(parcelLayer);
  currentFeatures = features;
  parcelLayer = L.geoJSON(features, {
    style: { color: "#3388ff", weight: 1, fillOpacity: 0.2 },
    onEachFeature: (feature, layer) => {
      layer.bindPopup(`
        <b>Parcel:</b> ${feature.properties.ParcelID}<br/>
        <b>Owner:</b> ${feature.properties.OccupierID}<br/>
        <b>Area:</b> ${feature.properties.Area} m²<br/>
        <b>Land Use:</b> ${feature.properties.Land_Use}<br/>
        <b>Tax ID:</b> ${feature.properties.TaxID}<br/>
        <b>Survey Plan:</b> ${feature.properties.SurveyPlan}<br/>
        <b>Surname:</b> ${feature.properties.Surname}<br/>
        <b>Firstname:</b> ${feature.properties.Firstname}<br/>
        <b>DOB:</b> ${feature.properties.dob}<br/>
        <b>Gender:</b> ${feature.properties.Gender}
      `);
      layer.on("click", () => highlightRow(feature.properties.ParcelID));
    }
  }).addTo(map);
  if (features.length > 0) map.fitBounds(parcelLayer.getBounds());
  populateTable(features);
}



// function updateProperty(index, field, value) {
//   currentFeatures[index].properties[field] = isNaN(value) ? value : Number(value);
// }

function highlightRow(ParcelID) {
  document.querySelectorAll("#parcelTable tbody tr").forEach(row => {
    row.classList.toggle("highlight-row", row.cells[0].innerText === ParcelID);
  });
}


// Finally, modify your updateProperty function to save the user's edits back to 
// the IndexedDB. You'll need to know the primary key (id) of the feature being 
// edited. To do this, let's pass the feature's id from the populateTable function.
// 1. Update populateTable:
function populateTable(features) {
  const tbody = document.querySelector("#parcelTable tbody");
  tbody.innerHTML = "";
  features.forEach((f) => { // No need for index anymore
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.properties.ParcelID}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'OccupierID', this.innerText)">${f.properties.OccupierID}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'Area', this.innerText)">${f.properties.Area}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'Land_Use', this.innerText)">${f.properties.Land_Use}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'TaxID', this.innerText)">${f.properties.TaxID}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'SurveyPlan', this.innerText)">${f.properties.SurveyPlan}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'Surname', this.innerText)">${f.properties.Surname}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'Firstname', this.innerText)">${f.properties.Firstname}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'DOB', this.innerText)">${f.properties.dob}</td>
      <td contenteditable="true" onblur="updateProperty(${f.id}, 'Gender', this.innerText)">${f.properties.Gender}`;
    tr.onclick = () => zoomToFeature(f);
    tbody.appendChild(tr); 
  });
}

// 2. Update updateProperty:
// Updated updateProperty function
async function updateProperty(id, field, value) {
  // Construct the property path for Dexie's update method
  const propertyPath = `properties.${field}`;
  const parsedValue = isNaN(value) ? value : Number(value);
  
  await db.parcels.update(id, { [propertyPath]: parsedValue });
  console.log(`Updated parcel ${id}: ${field} set to ${parsedValue}`);
  
  // Optional: Refresh the 'fullData' variable if needed elsewhere
  const allParcels = await db.parcels.toArray();
  fullData = { type: "FeatureCollection", features: allParcels };
}


function zoomToFeature(feature) {
  if (highlightLayer) map.removeLayer(highlightLayer);
  highlightLayer = L.geoJSON(feature, { 
    style: { color: "red", weight: 3, fillOpacity: 0.1 } 
  }).addTo(map);
  map.fitBounds(highlightLayer.getBounds());
  highlightRow(feature.properties.ParcelID);
}


// Now, modify your filterParcels and searchParcel functions to query 
// the database instead of a variable or file.
// Updated filterParcels function
async function filterParcels() {
  const selected = document.getElementById('filterSelect').value;
  let filteredFeatures;
  if (selected === "All") {
    filteredFeatures = await db.parcels.toArray();
  } else {
    // Use the index for efficient filtering
    filteredFeatures = await db.parcels
      .where('properties.Land_Use')
      .equals(selected)
      .toArray();
  }
  drawParcels(filteredFeatures);
}

// Updated searchParcel function
async function searchParcel() {
  const input = document.getElementById('parcelInput').value.trim();
  if (!input) return alert("Enter a parcel ID");

  if (highlightLayer) map.removeLayer(highlightLayer);
  
  // Query the database using the ParcelID index
  const match = await db.parcels
    .where('properties.ParcelID')
    .equals(input)
    .first(); // .first() is more efficient than .toArray() for single results

  if (!match) {
    return alert("No parcel found with ID: " + input);
  }
  
  zoomToFeature(match); // The zoomToFeature function already handles highlighting
}


// function searchParcel() {
//   const input = document.getElementById('parcelInput').value.trim();
//   if (!input) return alert("Enter a parcel ID");

//   if (highlightLayer) map.removeLayer(highlightLayer);

//   fetch("otedola_estate.json")
//     .then(response => response.json())
//     .then(data => {
//       const matches = data.features.filter(f => f.properties.ParcelID === input);
//       if (matches.length === 0) {
//         alert("No parcel found with ID: " + input);
//         return;
//       }
//       highlightLayer = L.geoJSON(matches, {
//         style: { color: "red", weight: 3, fillOpacity: 0.1 }
//       }).addTo(map);
//       map.fitBounds(highlightLayer.getBounds());
//     });
// }

// function filterParcels() {
//   const selected = document.getElementById('filterSelect').value;
//   if (selected === "All") {
//     drawParcels(fullData.features);
//   } else {
//     const filtered = fullData.features.filter(f => f.properties.Land_Use === selected);
//     drawParcels(filtered);
//   }
// }

async function exportMap() {
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(document.querySelector("#map"));
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("cadastral_map.pdf");
}

function exportCSV() {
  if (currentFeatures.length === 0) {
    alert("No parcels to export.");
    return;
  }
  let csv = "parcel_id,owner_name,area_m2,land_use\n";
  currentFeatures.forEach(f => {
    csv += `${f.properties.parcel_id},${f.properties.OccupierID},${f.properties.Area},${f.properties.Land_Use}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "updated_parcels.csv";
  link.click();
}

function downloadGeoJSON() {
  const updatedGeoJSON = JSON.stringify({ type: "FeatureCollection", features: currentFeatures }, null, 2);
  const blob = new Blob([updatedGeoJSON], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "updated_parcels.geojson";
  link.click();
}
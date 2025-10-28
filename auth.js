// Create a new Dexie database or open an existing one
const db = new Dexie("cadastralDB");

// Define the database schema. This now includes a 'users' table.
// We are upgrading the version to 2 to introduce the new table.
db.version(40).stores({
  parcels: '++id, properties.ParcelID, properties.Land_Use', // From our previous setup
  users: '++id, &parcelId' // '++id' is the auto-incrementing primary key, '&parcelId' is a unique index
});

/**
 * Registers a new user.
 */
async function registerUser() {
    const name = document.getElementById('name').value;
    const parcelId = document.getElementById('parcelId').value;
    const password = document.getElementById('password').value;

    if (!name || !parcelId || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // 1. Check if the ParcelID exists in the main parcels database
    const parcelExists = await db.parcels.where('properties.ParcelID').equals(parcelId).first();
    if (!parcelExists) {
        alert('Error: This Parcel ID does not exist in the cadastral record. Please enter a valid Parcel ID.');
        return;
    }

    try {
        // 2. Try to add the new user. Dexie will throw an error if the parcelId is not unique.
        await db.users.add({
            name: name,
            parcelId: parcelId,
            password: password // IMPORTANT: See security note below
        });

        alert('Registration successful! You will now be redirected to the login page.');
        window.location.href = 'login.html';
    } catch (error) {
        // This error will likely be a "ConstraintError" if the parcelId already exists
        if (error.name === 'ConstraintError') {
            alert('Error: A user with this Parcel ID is already registered.');
        } else {
            console.error('Registration failed:', error);
            alert('An unexpected error occurred during registration.');
        }
    }
}

/**
 * Logs in a user.
 */
async function loginUser() {
    const parcelId = document.getElementById('parcelId').value;
    const password = document.getElementById('password').value;

    if (!parcelId || !password) {
        alert('Please enter both Parcel ID and password.');
        return;
    }

    // Find the user by their parcelId
    const user = await db.users.where('parcelId').equals(parcelId).first();

    if (user) {
        // User found, now check the password
        if (user.password === password) {
            alert('Login successful!');
            // Store user info in sessionStorage (cleared when browser tab is closed)
            sessionStorage.setItem('loggedInUserParcelId', user.parcelId);
            window.location.href = 'dashboard.html';
        } else {
            alert('Incorrect password.');
        }
    } else {
        alert('No user found with that Parcel ID.');
    }
}

/**
 * Loads user and parcel data onto the dashboard.
 */
async function loadDashboardData() {
    const parcelId = sessionStorage.getItem('loggedInUserParcelId');
    if (!parcelId) {
        // If no one is logged in, redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Get user and parcel data from the database
    const user = await db.users.where('parcelId').equals(parcelId).first();
    const parcel = await db.parcels.where('properties.ParcelID').equals(parcelId).first();

    if (user && parcel) {
        document.getElementById('userName').innerText = user.name;
        document.getElementById('parcelId').innerText = parcel.properties.ParcelID;
        document.getElementById('landUse').innerText = parcel.properties.Land_Use;
        document.getElementById('area').innerText = `${parcel.properties.Area.toFixed(2)} m²`;
        document.getElementById('surveyPlan').innerText = parcel.properties.SurveyPlan;
        document.getElementById('Surname').innerText = parcel.properties.Surname;
        document.getElementById('Firstname').innerText = parcel.properties.Firstname;
        document.getElementById('DOB').innerText = parcel.properties.dob;
        document.getElementById('Gender').innerText = parcel.properties.Gender;
    }
}


/**
 * Checks if a user is logged in. Protects pages.
 */
function checkLogin() {
    if (!sessionStorage.getItem('loggedInUserParcelId')) {
        window.location.href = 'login.html';
    }
}

/**
 * Logs the user out.
 */
function logout() {
    sessionStorage.removeItem('loggedInUserParcelId');
    alert('You have been logged out.');
    window.location.href = 'login.html';
}



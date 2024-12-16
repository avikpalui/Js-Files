
const gbId = document.getElementById.bind(document);

// Function to update UI elements based on user data
const updateUI = (data) => {
    const loginLink = gbId("log-in");
    const mainCTA = gbId("main-CTA-buttons");
    const userData = gbId("user-data");
    const userName = gbId("user-first-name");
    const profileImage = gbId("profile-image");
    const cartIcon = gbId("cart-icon");
    const cartCount = gbId("cart-count");

    // If no user data (logged out)
    if (!data || !data.firstName) {
        mainCTA.style.display = "flex"; // Show login button
        userData.style.display = "none"; // Hide user info
        cartIcon.style.display = "flex"; // Always show cart icon
        cartCount.innerText = "(0)"; // Display 0 when no items
        return;
    }

    // If user data exists (logged in)
    mainCTA.style.display = "none"; // Hide login button
    userName.innerText = data.firstName || "Hi User";
    if (data.profileImage) profileImage.src = data.profileImage;
    cartCount.innerText = data.itemCount ? `(${data.itemCount})` : "(0)";
    cartIcon.style.display = "flex"; // Always show cart icon
    userData.style.display = "flex"; // Show user info
};

// Fetch user data dynamically
const fetchUserData = async () => {
    try {
        const response = await fetch("https://your-backend-api.com/user-data");
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data)); // Cache in localStorage
        updateUI(data);
    } catch (error) {
        console.error("Error fetching user data:", error);
        updateUI(null); // Fallback to logged-out state
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem("userData");
    if (cachedData) {
        updateUI(JSON.parse(cachedData)); // Use cached data if available
    }

    // Fetch fresh user data dynamically
    fetchUserData();
});

// Logout functionality
const logoutButton = gbId("logout-button");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("userData"); // Clear cached data
        updateUI(null); // Reset UI to logged-out state
    });
};

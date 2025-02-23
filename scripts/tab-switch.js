// Tab switching functionality
const tabs = document.querySelectorAll('.search-tab');
const searchContent = document.querySelector('.search-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Update search content based on selected tab
        if (tab.textContent === 'Route Number') {
            searchContent.innerHTML = `
                <select class="js-bus-route-no">
                </select>
                <input type="text" placeholder="Enter route number">
                <button class="search-button">Search</button>
            `;
        } else if (tab.textContent === 'Source - Destination') {
            searchContent.innerHTML = `
                <input type="text" placeholder="Enter source">
                <input type="text" placeholder="Enter destination">
                <button class="search-button" onclick="searchByLocation()">Search</button>
            `;
        } else if (tab.textContent === 'Bus Stop') {
            searchContent.innerHTML = `
                <select>
                    <option>Select City</option>
                    <option>Bangalore</option>
                    <option>Mysore</option>
                    <option>Mangalore</option>
                </select>
                <input type="text" placeholder="Enter bus stop name">
                <button class="search-button" onclick="searchByStop()">Search</button>
            `;
        }
    });
});
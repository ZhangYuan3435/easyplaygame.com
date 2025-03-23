// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    // Get all game cards from the page
    const gameCards = document.querySelectorAll('.game-card');
    
    // Create a search results container if it doesn't exist
    let searchResultsContainer = document.querySelector('.search-results');
    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement('div');
        searchResultsContainer.className = 'search-results';
        searchResultsContainer.style.display = 'none';
        
        // Insert after the search container
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer && searchContainer.parentNode) {
            searchContainer.parentNode.insertBefore(searchResultsContainer, searchContainer.nextSibling);
        }
    }

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            // Clear previous search results
            searchResultsContainer.innerHTML = '';
            
            // Create search results header
            const resultsHeader = document.createElement('h3');
            resultsHeader.textContent = `Search Results for: "${searchTerm}"`;
            searchResultsContainer.appendChild(resultsHeader);
            
            // Create a container for results
            const resultsGrid = document.createElement('div');
            resultsGrid.className = 'game-grid';
            searchResultsContainer.appendChild(resultsGrid);
            
            // Search logic - find games that match the search term
            let matchFound = false;
            
            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    // Clone the matching card
                    const clonedCard = card.cloneNode(true);
                    resultsGrid.appendChild(clonedCard);
                    matchFound = true;
                }
            });
            
            // Show "no results" message if nothing found
            if (!matchFound) {
                const noResults = document.createElement('p');
                noResults.textContent = 'No games found matching your search.';
                noResults.style.textAlign = 'center';
                noResults.style.padding = '20px';
                searchResultsContainer.appendChild(noResults);
            }
            
            // Show search results
            searchResultsContainer.style.display = 'block';
            
            // Scroll to search results
            searchResultsContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Clear search when input is cleared
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            searchResultsContainer.style.display = 'none';
        }
    });
});

// Simulate loading more games
function loadMoreGames() {
    // In a real project, this would load more games via API
    console.log('Loading more games...');
}

// Game card animation effects
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach(card => {
    card.addEventListener('click', () => {
        // Extract game title
        const gameTitle = card.querySelector('h3').textContent;
        
        // Create game details page - in a real site this would navigate to a separate page
        // For this example, we'll demonstrate a modal-like experience
        const gameDetailsModal = document.createElement('div');
        gameDetailsModal.className = 'game-details-modal';
        gameDetailsModal.style.position = 'fixed';
        gameDetailsModal.style.top = '0';
        gameDetailsModal.style.left = '0';
        gameDetailsModal.style.width = '100%';
        gameDetailsModal.style.height = '100%';
        gameDetailsModal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        gameDetailsModal.style.display = 'flex';
        gameDetailsModal.style.justifyContent = 'center';
        gameDetailsModal.style.alignItems = 'center';
        gameDetailsModal.style.zIndex = '1000';
        
        // Create content container
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.maxWidth = '800px';
        modalContent.style.width = '80%';
        
        // Game image
        const gameImg = card.querySelector('img').cloneNode(true);
        gameImg.style.width = '100%';
        gameImg.style.height = 'auto';
        gameImg.style.maxHeight = '300px';
        gameImg.style.objectFit = 'cover';
        modalContent.appendChild(gameImg);
        
        // Game title
        const titleEl = document.createElement('h2');
        titleEl.textContent = gameTitle;
        modalContent.appendChild(titleEl);
        
        // Game description
        const descEl = document.createElement('p');
        descEl.textContent = card.querySelector('p').textContent;
        modalContent.appendChild(descEl);
        
        // Additional details
        const detailsEl = document.createElement('div');
        detailsEl.innerHTML = `
            <h3>Game Details</h3>
            <p><strong>Genre:</strong> ${gameTitle.includes('Action') ? 'Action' : 
                         gameTitle.includes('Shooting') ? 'Shooting' :
                         gameTitle.includes('Puzzle') ? 'Puzzle' :
                         gameTitle.includes('Strategy') ? 'Strategy' : 'Sports'}</p>
            <p><strong>Release Date:</strong> 2025</p>
            <p><strong>Developer:</strong> EasyPlay Studios</p>
            <p><strong>Rating:</strong> 4.5/5</p>
        `;
        modalContent.appendChild(detailsEl);
        
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.backgroundColor = '#e74c3c';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '4px';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = () => {
            document.body.removeChild(gameDetailsModal);
        };
        modalContent.appendChild(closeBtn);
        
        // Add content to modal
        gameDetailsModal.appendChild(modalContent);
        
        // Add modal to body
        document.body.appendChild(gameDetailsModal);
        
        // Close modal when clicking outside
        gameDetailsModal.addEventListener('click', (e) => {
            if (e.target === gameDetailsModal) {
                document.body.removeChild(gameDetailsModal);
            }
        });
    });
}); 
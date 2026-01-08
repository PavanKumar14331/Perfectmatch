// Profile data
const profiles = [
    {
        id: 1,
        name: 'Priya Sharma',
        age: 25,
        gender: 'Female',
        height: '5\'4"',
        education: 'MBA',
        profession: 'IT Professional',
        location: 'Hyderabad',
        bio: 'Simple, family-oriented person looking for a caring and understanding life partner.',
        icon: '👩'
    },
    {
        id: 2,
        name: 'Rahul Kumar',
        age: 28,
        gender: 'Male',
        height: '5\'10"',
        education: 'B.Tech',
        profession: 'Engineer',
        location: 'Bangalore',
        bio: 'Software engineer with traditional values seeking a life partner who values family.',
        icon: '👨'
    },
    {
        id: 3,
        name: 'Ananya Reddy',
        age: 24,
        gender: 'Female',
        height: '5\'5"',
        education: 'MBBS',
        profession: 'Doctor',
        location: 'Hyderabad',
        bio: 'Medical professional looking for an educated and understanding partner.',
        icon: '👩‍⚕️'
    },
    {
        id: 4,
        name: 'Vikram Singh',
        age: 30,
        gender: 'Male',
        height: '6\'0"',
        education: 'CA',
        profession: 'Business',
        location: 'Mumbai',
        bio: 'Chartered Accountant with own practice, seeking a well-educated bride.',
        icon: '👨‍💼'
    },
    {
        id: 5,
        name: 'Sneha Patel',
        age: 26,
        gender: 'Female',
        height: '5\'3"',
        education: 'M.Sc',
        profession: 'Teacher',
        location: 'Delhi',
        bio: 'Teacher by profession, looking for someone who respects family values.',
        icon: '👩‍🏫'
    },
    {
        id: 6,
        name: 'Arjun Verma',
        age: 29,
        gender: 'Male',
        height: '5\'11"',
        education: 'MBA',
        profession: 'IT Professional',
        location: 'Chennai',
        bio: 'IT professional working in MNC, seeking educated and modern thinking partner.',
        icon: '👨‍💻'
    },
    {
        id: 7,
        name: 'Divya Krishna',
        age: 27,
        gender: 'Female',
        height: '5\'6"',
        education: 'B.Tech',
        profession: 'Engineer',
        location: 'Bangalore',
        bio: 'Software engineer looking for a compatible and supportive life partner.',
        icon: '👩‍💻'
    },
    {
        id: 8,
        name: 'Karthik Reddy',
        age: 31,
        gender: 'Male',
        height: '5\'9"',
        education: 'MD',
        profession: 'Doctor',
        location: 'Hyderabad',
        bio: 'Medical doctor seeking an educated and family-oriented bride.',
        icon: '👨‍⚕️'
    }
];

// Interests state
let interests = [];
let currentProfile = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProfiles();
    setupEventListeners();
});

// Load profiles
function loadProfiles() {
    const profilesGrid = document.getElementById('profilesGrid');
    profilesGrid.innerHTML = '';
    
    profiles.forEach(profile => {
        const profileCard = createProfileCard(profile);
        profilesGrid.appendChild(profileCard);
    });
}

// Create profile card
function createProfileCard(profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
        <div class="profile-image">${profile.icon}</div>
        <div class="profile-info">
            <h3 class="profile-name">${profile.name}</h3>
            <p class="profile-age">${profile.age} years, ${profile.height}</p>
            <div class="profile-details">
                <div class="detail-item">
                    <span class="detail-icon">🎓</span>
                    <span>${profile.education}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">💼</span>
                    <span>${profile.profession}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">📍</span>
                    <span>${profile.location}</span>
                </div>
            </div>
            <p class="profile-bio">${profile.bio}</p>
            <div class="profile-actions">
                <button class="interest-button" data-id="${profile.id}">
                    ${isInInterests(profile.id) ? '✓ Added' : 'Add Interest'}
                </button>
                <button class="contact-button" data-id="${profile.id}">Contact</button>
            </div>
        </div>
    `;
    
    const interestBtn = card.querySelector('.interest-button');
    const contactBtn = card.querySelector('.contact-button');
    
    if (isInInterests(profile.id)) {
        interestBtn.classList.add('added');
    }
    
    interestBtn.addEventListener('click', () => toggleInterest(profile.id, interestBtn));
    contactBtn.addEventListener('click', () => openContactModal(profile));
    
    return card;
}

// Check if profile is in interests
function isInInterests(profileId) {
    return interests.some(p => p.id === profileId);
}

// Toggle interest
function toggleInterest(profileId, button) {
    const profile = profiles.find(p => p.id === profileId);
    
    if (isInInterests(profileId)) {
        interests = interests.filter(p => p.id !== profileId);
        button.textContent = 'Add Interest';
        button.classList.remove('added');
    } else {
        interests.push(profile);
        button.textContent = '✓ Added';
        button.classList.add('added');
        showInterestsSidebar();
    }
    
    updateInterestsUI();
}

// Update interests UI
function updateInterestsUI() {
    const interestsCount = document.getElementById('interestsCount');
    const interestsList = document.getElementById('interestsList');
    const contactAllButton = document.getElementById('contactAllButton');
    
    interestsCount.textContent = interests.length;
    
    if (interests.length === 0) {
        interestsList.innerHTML = '<div class="empty-interests">No interests added yet</div>';
        contactAllButton.disabled = true;
    } else {
        interestsList.innerHTML = '';
        interests.forEach((profile) => {
            const interestItem = createInterestItem(profile);
            interestsList.appendChild(interestItem);
        });
        contactAllButton.disabled = false;
    }
}

// Create interest item
function createInterestItem(profile) {
    const div = document.createElement('div');
    div.className = 'interest-item';
    div.innerHTML = `
        <div class="interest-icon">${profile.icon}</div>
        <div class="interest-info">
            <div class="interest-name">${profile.name}</div>
            <div class="interest-details">${profile.age} years • ${profile.profession}</div>
        </div>
        <button class="remove-interest" data-id="${profile.id}">Remove</button>
    `;
    
    div.querySelector('.remove-interest').addEventListener('click', () => {
        toggleInterest(profile.id, null);
        loadProfiles(); // Reload to update button states
    });
    
    return div;
}

// Show interests sidebar
function showInterestsSidebar() {
    document.getElementById('interestsSidebar').classList.add('active');
}

// Hide interests sidebar
function hideInterestsSidebar() {
    document.getElementById('interestsSidebar').classList.remove('active');
}

// Open contact modal
function openContactModal(profile) {
    currentProfile = profile;
    const modal = document.getElementById('contactModal');
    const profilePreview = document.getElementById('profilePreview');
    
    profilePreview.innerHTML = `
        <div class="preview-icon">${profile.icon}</div>
        <h3 class="preview-name">${profile.name}</h3>
        <p class="preview-details">${profile.age} years • ${profile.profession} • ${profile.location}</p>
    `;
    
    modal.classList.add('active');
    hideInterestsSidebar();
}

// Close contact modal
function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
    currentProfile = null;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('interestsIcon').addEventListener('click', showInterestsSidebar);
    document.getElementById('closeSidebar').addEventListener('click', hideInterestsSidebar);
    document.getElementById('closeModal').addEventListener('click', closeContactModal);
    document.getElementById('contactForm').addEventListener('submit', handleContactSubmit);
    document.getElementById('continueButton').addEventListener('click', resetContactForm);
    document.getElementById('searchButton').addEventListener('click', applySearch);
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('contactAllButton').addEventListener('click', () => {
        if (interests.length > 0) {
            openContactModal(interests[0]);
        }
    });
    
    // Inquiry form
    document.getElementById('inquiryForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you soon.');
        e.target.reset();
    });
}

// Handle contact form submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.classList.add('active');
}

// Reset contact form
function resetContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const modal = document.getElementById('contactModal');
    
    form.reset();
    form.style.display = 'block';
    successMessage.classList.remove('active');
    modal.classList.remove('active');
    currentProfile = null;
}

// Apply search filters
function applySearch() {
    const gender = document.getElementById('genderFilter').value;
    const ageRange = document.getElementById('ageFilter').value;
    
    filterProfiles(gender, ageRange, 'all', 'all');
}

// Apply detailed filters
function applyFilters() {
    const profession = document.getElementById('professionFilter').value;
    const location = document.getElementById('locationFilter').value;
    
    filterProfiles('all', 'all', profession, location);
}

// Filter profiles
function filterProfiles(gender, ageRange, profession, location) {
    const profilesGrid = document.getElementById('profilesGrid');
    profilesGrid.innerHTML = '';
    
    let filtered = profiles.filter(profile => {
        let matches = true;
        
        if (gender !== 'all' && profile.gender !== gender) {
            matches = false;
        }
        
        if (ageRange !== 'all') {
            const [min, max] = ageRange.split('-').map(Number);
            if (profile.age < min || profile.age > max) {
                matches = false;
            }
        }
        
        if (profession !== 'all' && profile.profession !== profession) {
            matches = false;
        }
        
        if (location !== 'all' && profile.location !== location) {
            matches = false;
        }
        
        return matches;
    });
    
    if (filtered.length === 0) {
        profilesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">No profiles found matching your criteria.</div>';
    } else {
        filtered.forEach(profile => {
            const profileCard = createProfileCard(profile);
            profilesGrid.appendChild(profileCard);
        });
    }
}
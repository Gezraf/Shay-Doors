// Shay Shitrit - Zero Line Doors Website

document.addEventListener('DOMContentLoaded', function() {
  // Auto-hide navigation on scroll
  let lastScrollTop = 0;
  let isScrolling = false;
  
  function handleNavScroll() {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only hide after scrolling down at least 100px
    if (currentScroll > 100) {
      if (currentScroll > lastScrollTop && !isScrolling) {
        // Scrolling down - hide nav
        nav.classList.remove('translate-y-0');
        nav.classList.add('-translate-y-full');
      } else if (currentScroll < lastScrollTop && !isScrolling) {
        // Scrolling up - show nav
        nav.classList.remove('-translate-y-full');
        nav.classList.add('translate-y-0');
      }
    } else {
      // At top of page - always show nav
      nav.classList.remove('-translate-y-full');
      nav.classList.add('translate-y-0');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
  
  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function() {
        handleNavScroll();
        scrollTimeout = null;
      }, 10);
    }
  });

  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('#mobile-menu-btn') || document.querySelector('button.md\\:hidden');
  const navLinks = document.querySelector('.hidden.md\\:flex');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      // Toggle mobile menu visibility
      navLinks.classList.toggle('hidden');
      navLinks.classList.toggle('md:flex');
      
      // Add mobile menu styles
      if (!navLinks.classList.contains('hidden')) {
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.backdropFilter = 'blur(12px)';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '1rem';
        navLinks.style.borderTop = '1px solid #e2e8f0';
        navLinks.style.zIndex = '50';
      } else {
        navLinks.style = '';
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add hover effects for buttons
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animations
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });



  // WhatsApp floating button functionality
  const whatsappBtn = document.querySelector('a[href*="wa.me"]');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
      // Allow default behavior for WhatsApp links
      console.log('Opening WhatsApp...');
    });
  }

  // Phone number functionality
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow default behavior for phone links
      console.log('Opening phone dialer...');
    });
  });

  // Email functionality
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow default behavior for email links
      console.log('Opening email client...');
    });
  });

  // Social media links
  document.querySelectorAll('a[href*="instagram.com"], a[href*="facebook.com"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Allow default behavior for social media links
      console.log('Opening social media...');
    });
  });

  // Add loading animation
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });

  // Initialize page
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-in';
});



// Cloudinary configuration for image transformation
const CLOUDINARY_CONFIG = {
  cloudName: 'dkgx2zv2g',
  baseUrl: 'https://res.cloudinary.com/dkgx2zv2g/image/upload',
  thumbnailTransform: 'w_400,h_300,c_fill,f_auto,q_auto',
  fullImageTransform: 'w_1200,h_800,c_fill,f_auto,q_auto'
};

// Category mapping for CSV column headers to display names
const CATEGORY_MAPPING = {
  'line-zero-aluminum': 'דלתות קו-אפס - אלומיניום',
  'line-zero-porcelain': 'דלתות קו-אפס - פורצלן',
  'line-zero-glass': 'דלתות קו-אפס - זכוכית',
  'entrance-modern': 'דלתות כניסה מודרניות',
  'entrance-provence': 'דלתות כניסה פרובנס',
  'synagogue': 'דלתות לבתי כנסת',
  'front-views': 'מבטי חזית',
  'special': 'עבודות מיוחדות'
};

// Store all loaded images globally
let allGalleryImages = [];
let displayedImages = [];
let isLoading = false;
const IMAGES_PER_LOAD = 8; // 2 rows of 4 images

// Load images from CSV file
async function loadImagesFromCSV() {
  if (isLoading) return;
  isLoading = true;
  
  const loadingElement = document.getElementById('gallery-loading');
  const errorElement = document.getElementById('gallery-error');
  const galleryGrid = document.getElementById('gallery-grid');
  
  // Show loading state
  loadingElement.classList.remove('hidden');
  errorElement.classList.add('hidden');
  galleryGrid.innerHTML = '';
  
  try {
    console.log('📂 Loading images from images_paths.csv...');
    
    const response = await fetch('./images_paths.csv');
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.status}`);
    }
    
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim()); // Categories
    const dataRows = lines.slice(1); // URL rows
    
    allGalleryImages = [];
    
    // Process each column (category)
    headers.forEach((category, columnIndex) => {
      let imageCount = 0;
      
      // Go through each row to find URLs for this category
      dataRows.forEach((row, rowIndex) => {
        const cells = row.split(',');
        const url = cells[columnIndex]?.trim();
        
        if (url && url.startsWith('https://res.cloudinary.com/')) {
          allGalleryImages.push({
            id: `${category}-${imageCount}`,
            category,
            displayName: getCategoryDisplayName(category),
            thumbnailUrl: url,
            fullImageUrl: url,
            alt: `${getCategoryDisplayName(category)} - תמונה ${imageCount + 1}`,
            originalName: url.split('/').pop().split('.')[0],
            discoveryMethod: 'csv-file'
          });
          imageCount++;
        }
      });
      
      console.log(`📁 ${category}: ${imageCount} images loaded from CSV`);
    });
    
    console.log(`✅ Total loaded: ${allGalleryImages.length} images from CSV`);
    
    // Hide loading and render images
    loadingElement.classList.add('hidden');
    renderGalleryImages(allGalleryImages);
    
  } catch (error) {
    console.error('❌ Error loading images_paths.csv:', error);
    loadingElement.classList.add('hidden');
    errorElement.classList.remove('hidden');
  }
  
  isLoading = false;
}



// Helper function to get display name for category
function getCategoryDisplayName(category) {
  return CATEGORY_MAPPING[category] || category;
}



// Render gallery images in the DOM with pagination
function renderGalleryImages(images, showAll = false) {
  const galleryGrid = document.getElementById('gallery-grid');
  const loadMoreContainer = document.getElementById('load-more-container');
  
  if (images.length === 0) {
    galleryGrid.innerHTML = `
      <div class="col-span-full text-center py-16">
        <div class="text-slate-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-xl font-bold text-slate-600 mb-2">אין תמונות להצגה</h3>
          <p class="text-black">לא נמצאו תמונות בקטגוריה הנבחרת</p>
        </div>
      </div>
    `;
    loadMoreContainer.classList.add('hidden');
    return;
  }
  
  // Determine how many images to show
  const imagesToShow = showAll ? images : images.slice(0, IMAGES_PER_LOAD);
  displayedImages = imagesToShow;
  
  const imagesHTML = imagesToShow.map(image => `
    <div class="gallery-item ${image.category} group relative cursor-pointer" onclick="openModal('${image.fullImageUrl}')">
      <div class="relative rounded-3xl shadow-sm hover:shadow-xl border-shadow overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <img src="${image.thumbnailUrl}" alt="${image.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>
  `).join('');
  
  galleryGrid.innerHTML = imagesHTML;
  
  // Show/hide load more button
  if (!showAll && images.length > IMAGES_PER_LOAD) {
    loadMoreContainer.classList.remove('hidden');
  } else {
    loadMoreContainer.classList.add('hidden');
  }
}

// Initialize gallery on page load (only on Gallery page)
document.addEventListener('DOMContentLoaded', function() {
  // Only load gallery images if we're on the gallery page
  if (document.getElementById('gallery-grid')) {
    loadImagesFromCSV(); // Load images from the CSV file
  }
});

// Gallery filtering functionality with sub-filters for line-zero
window.filterGallery = function(category) {
  const allItems = document.querySelectorAll('.gallery-item');
  const filterButtons = document.querySelectorAll('.gallery-filter');
  const subFilterButtons = document.querySelectorAll('.sub-filter');
  const lineZeroSubFilterContainer = document.getElementById('line-zero-sub-filters');
  const entranceSubFilterContainer = document.getElementById('entrance-sub-filters');
  
  // Use dynamic image data for filtering
  let filteredImages = [];
  
  if (category === 'all') {
    filteredImages = allGalleryImages;
    
    // Hide all sub-filter containers
    lineZeroSubFilterContainer.classList.add('hidden');
    entranceSubFilterContainer.classList.add('hidden');
    
    // Update main filter button state
    filterButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
      btn.classList.add('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
    });
    
    const activeButton = event.target.closest('button');
    activeButton.classList.remove('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
    activeButton.classList.add('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
    
    // Clear sub-filter selection
    subFilterButtons.forEach(btn => {
      btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
      btn.classList.add('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
    });
  } else if (category === 'line-zero') {
    // Show all line-zero variants (including pure)
    filteredImages = allGalleryImages.filter(img => 
      img.category.startsWith('line-zero')
    );
  } else if (category === 'entrance') {
    // Show all entrance variants
    filteredImages = allGalleryImages.filter(img => 
      img.category.startsWith('entrance')
    );
  } else if (category === 'line-zero-aluminum') {
    // Show aluminum line-zero
    filteredImages = allGalleryImages.filter(img => 
      img.category === 'line-zero-aluminum'
    );
  } else if (category === 'line-zero-porcelain') {
    // Show porcelain line-zero
    filteredImages = allGalleryImages.filter(img => 
      img.category === 'line-zero-porcelain'
    );
  } else if (category === 'line-zero-glass') {
    // Show glass line-zero
    filteredImages = allGalleryImages.filter(img => 
      img.category === 'line-zero-glass'
    );
  } else if (category === 'entrance-modern') {
    // Show modern entrance doors
    filteredImages = allGalleryImages.filter(img => 
      img.category === 'entrance-modern'
    );
  } else if (category === 'entrance-provence') {
    // Show provence entrance doors
    filteredImages = allGalleryImages.filter(img => 
      img.category === 'entrance-provence'
    );
  } else {
    // Show specific main category
    filteredImages = allGalleryImages.filter(img => 
      img.category === category
    );
  }
  
  // Handle sub-filter visibility
  if (category === 'line-zero') {
    // Show sub-filters for line-zero, hide entrance sub-filters
    lineZeroSubFilterContainer.classList.remove('hidden');
    entranceSubFilterContainer.classList.add('hidden');
    
    // Update main filter button state
  filterButtons.forEach(btn => {
    btn.classList.remove('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
    btn.classList.add('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
  });
  
  const activeButton = event.target.closest('button');
  activeButton.classList.remove('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
  activeButton.classList.add('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
  
    // Clear sub-filter selection
    subFilterButtons.forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-background', 'text-slate-600');
    });
  } else if (category === 'entrance') {
    // Show sub-filters for entrance, hide line-zero sub-filters
    entranceSubFilterContainer.classList.remove('hidden');
    lineZeroSubFilterContainer.classList.add('hidden');
    
    // Update main filter button state
  filterButtons.forEach(btn => {
    btn.classList.remove('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
    btn.classList.add('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
  });
  
  const activeButton = event.target.closest('button');
  activeButton.classList.remove('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
  activeButton.classList.add('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
  
    // Clear sub-filter selection
    subFilterButtons.forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-background', 'text-slate-600');
    });
  } else if (category.startsWith('line-zero-')) {
    // Handle line-zero sub-filter selection
    lineZeroSubFilterContainer.classList.remove('hidden');
    entranceSubFilterContainer.classList.add('hidden');
    
    const activeSubButton = event.target.closest('button');
    
    // Check if this button is already active (toggle functionality)
    const isCurrentlyActive = activeSubButton.classList.contains('from-blue-500');
    
    if (isCurrentlyActive) {
      // If clicking on active button, deselect it and show all line-zero items
      subFilterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
        btn.classList.add('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      });
      
      // Show all line-zero variants (like clicking main line-zero button)
      filteredImages = allGalleryImages.filter(img => img.category.startsWith('line-zero'));
    } else {
      // Update sub-filter button state - reset all
      subFilterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
        btn.classList.add('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      });
      
      // Apply active state to selected button
      activeSubButton.classList.remove('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      activeSubButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
    }
  } else if (category.startsWith('entrance-')) {
    // Handle entrance sub-filter selection
    entranceSubFilterContainer.classList.remove('hidden');
    lineZeroSubFilterContainer.classList.add('hidden');
    
    const activeSubButton = event.target.closest('button');
    
    // Check if this button is already active (toggle functionality)
    const isCurrentlyActive = activeSubButton.classList.contains('from-blue-500');
    
    if (isCurrentlyActive) {
      // If clicking on active button, deselect it and show all entrance items
      subFilterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
        btn.classList.add('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      });
      
      // Show all entrance variants (like clicking main entrance button)
      filteredImages = allGalleryImages.filter(img => img.category.startsWith('entrance'));
    } else {
      // Update sub-filter button state - reset all
      subFilterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
        btn.classList.add('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      });
      
      // Apply active state to selected button
      activeSubButton.classList.remove('bg-gradient-to-r', 'from-slate-50', 'to-slate-100', 'border-slate-200', 'text-slate-700');
      activeSubButton.classList.add('bg-gradient-to-r', 'from-blue-500', 'to-blue-600', 'border-blue-500', 'text-white', 'shadow-xl', 'scale-105');
    }
  } else {
    // Hide sub-filters for other categories
    lineZeroSubFilterContainer.classList.add('hidden');
    entranceSubFilterContainer.classList.add('hidden');
    
    // Update main filter button state
    filterButtons.forEach(btn => {
      btn.classList.remove('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
      btn.classList.add('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
    });
    
    const activeButton = event.target.closest('button');
    activeButton.classList.remove('bg-background', 'hover:bg-accent', 'border-2', 'border-slate-200', 'text-slate-700', 'hover:border-blue-300', 'hover:text-blue-600');
    activeButton.classList.add('active', 'bg-blue-600', 'hover:bg-blue-700', 'text-white', 'shadow-lg');
  }
  
  // Re-render the gallery with filtered images
  renderGalleryImages(filteredImages);
  
  // Add entrance animation to new items
  setTimeout(() => {
    const newItems = document.querySelectorAll('.gallery-item');
    newItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.transition = 'all 0.5s ease';
      }, index * 50); // Stagger animation
  });
  }, 10);
};

// Load more images function
window.loadMoreImages = function() {
  const currentFilter = getCurrentActiveFilter();
  console.log('🔍 loadMoreImages called, currentFilter:', currentFilter);
  let filteredImages = [];
  
  if (currentFilter === 'all') {
    filteredImages = allGalleryImages;
  } else if (currentFilter === 'line-zero') {
    filteredImages = allGalleryImages.filter(img => img.category.startsWith('line-zero'));
  } else if (currentFilter === 'entrance') {
    filteredImages = allGalleryImages.filter(img => img.category.startsWith('entrance'));
  } else if (currentFilter === 'synagogue') {
    filteredImages = allGalleryImages.filter(img => img.category.startsWith('synagogue'));
  } else if (currentFilter === 'front-views') {
    filteredImages = allGalleryImages.filter(img => img.category.startsWith('front-views'));
  } else if (currentFilter === 'special') {
    filteredImages = allGalleryImages.filter(img => img.category.startsWith('special'));
  } else {
    filteredImages = allGalleryImages.filter(img => img.category === currentFilter);
  }
  
  console.log(`📊 Filtered ${filteredImages.length} images for category: ${currentFilter}`);
  renderGalleryImages(filteredImages, true); // Show all images
};

// Helper function to get current active filter
function getCurrentActiveFilter() {
  // First get the active main filter
  const activeButton = document.querySelector('.gallery-filter.active');
  if (!activeButton) return 'all';
  
  const buttonText = activeButton.textContent.trim();
  console.log('🔍 Active main filter button text:', `"${buttonText}"`);
  
  let mainFilter = null;
  if (buttonText === 'כל העבודות') mainFilter = 'all';
  else if (buttonText === 'דלתות קו־אפס') mainFilter = 'line-zero';
  else if (buttonText === 'דלתות כניסה') mainFilter = 'entrance';
  else if (buttonText === 'דלתות לבתי כנסת') mainFilter = 'synagogue';
  else if (buttonText === 'מבטי חזית') mainFilter = 'front-views';
  else if (buttonText === 'עבודות מיוחדות') mainFilter = 'special';
  else {
    console.log('⚠️ No matching category found for button text:', `"${buttonText}"`);
    return 'all';
  }
  
  // ONLY check sub-filters if the corresponding main filter is active
  if (mainFilter === 'line-zero') {
    const activeSubButton = document.querySelector('#line-zero-sub-filters .sub-filter.from-blue-500');
    if (activeSubButton) {
      const subText = activeSubButton.textContent.trim();
      if (subText === 'אלומיניום') return 'line-zero-aluminum';
      if (subText === 'פורצלן') return 'line-zero-porcelain';
      if (subText === 'זכוכית') return 'line-zero-glass';
    }
  }
  
  if (mainFilter === 'entrance') {
    const activeSubButton = document.querySelector('#entrance-sub-filters .sub-filter.from-blue-500');
    if (activeSubButton) {
      const subText = activeSubButton.textContent.trim();
      if (subText === 'מודרניות') return 'entrance-modern';
      if (subText === 'פרובנס') return 'entrance-provence';
    }
  }
  
  // Return the main filter if no sub-filter is active
  return mainFilter;
}

// Modal functionality with dynamic aspect ratio sizing
window.openModal = function(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  
  // Create a temporary image to check dimensions and calculate aspect ratio
  const tempImg = new Image();
  tempImg.onload = function() {
    const naturalWidth = this.naturalWidth;
    const naturalHeight = this.naturalHeight;
    const aspectRatio = naturalWidth / naturalHeight;
    
    console.log(`🖼️ Image dimensions: ${naturalWidth}x${naturalHeight}, aspect ratio: ${aspectRatio.toFixed(2)}`);
    
    // Define maximum sizes for the modal
    const maxWidth = 1400;
    const maxHeight = 1000;
    
    let displayWidth, displayHeight;
    
    // Check if image is small in either dimension - if so, don't modify
    if (naturalWidth < maxWidth || naturalHeight < maxHeight) {
      // Small image: Use natural dimensions (no scaling)
      displayWidth = naturalWidth;
      displayHeight = naturalHeight;
      console.log('📏 Small image: Using natural dimensions (small in at least one dimension)');
    } else {
      // Large image: Scale down while maintaining aspect ratio
      const scaleByWidth = naturalWidth / maxWidth;
      const scaleByHeight = naturalHeight / maxHeight;
      const scale = Math.max(scaleByWidth, scaleByHeight);
      
      displayWidth = naturalWidth / scale;
      displayHeight = naturalHeight / scale;
      console.log(`📏 Large image: Scaled down by factor ${scale.toFixed(2)}`);
    }
    
    console.log(`📐 Modal display size: ${Math.round(displayWidth)}x${Math.round(displayHeight)}`);
    
    // Apply the calculated dimensions
    modalImage.style.width = `${Math.round(displayWidth)}px`;
    modalImage.style.height = `${Math.round(displayHeight)}px`;
    
    // Ensure it fits on smaller screens (responsive)
    modalImage.style.maxWidth = '90vw';
    modalImage.style.maxHeight = '90vh';
    
    // Preserve aspect ratio when constrained by screen size
    modalImage.style.objectFit = 'contain';
  };
  tempImg.src = imageSrc;
  
  modalImage.src = imageSrc;
  modalImage.alt = 'תמונה מהגלריה';
  
  modal.classList.remove('hidden');
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
  // Restore body scroll
  document.body.style.overflow = 'auto';
};

// Close modal on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}); 

// Accessibility functionality
function initAccessibility() {
  const accessibilityBtn = document.getElementById('accessibility-btn');
  const accessibilityMenu = document.getElementById('accessibility-menu');
  const closeMenuBtn = document.getElementById('close-accessibility-menu');
  const ttsBtn = document.getElementById('tts-btn');
  const colorblindBtn = document.getElementById('colorblind-btn');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const ttsLabel = document.getElementById('tts-label');
  
  let isColorblindMode = false;
  let speechSynthesis = window.speechSynthesis;
  
  // Toggle accessibility menu
  if (accessibilityBtn && accessibilityMenu) {
    accessibilityBtn.addEventListener('click', function() {
      accessibilityMenu.classList.toggle('hidden');
    });
  }
  
  // Close menu
  if (closeMenuBtn && accessibilityMenu) {
    closeMenuBtn.addEventListener('click', function() {
      accessibilityMenu.classList.add('hidden');
    });
  }
  
  // Menu only closes via button or X button (removed click outside to close)
  
  // Text to Speech functionality
  if (ttsBtn) {
    let isSpeaking = false;
    let currentUtterance = null;
    
    ttsBtn.addEventListener('click', function() {
      if (isSpeaking) {
        // Stop current speech
        speechSynthesis.cancel();
        isSpeaking = false;
        currentUtterance = null;
        
        // Reset button
        ttsBtn.textContent = '🎤 הפעל קריאה';
        ttsBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
        ttsBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        return;
      }
      
      const selectedText = window.getSelection().toString().trim();
      
      if (selectedText) {
        // Stop any ongoing speech
        speechSynthesis.cancel();
        
        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance(selectedText);
        utterance.lang = 'he-IL'; // Hebrew
        utterance.rate = 0.9; // Slightly slower for better comprehension
        
        // Store current utterance and start speaking
        currentUtterance = utterance;
        isSpeaking = true;
        speechSynthesis.speak(utterance);
        
        // Update button text
        ttsBtn.textContent = '🔇 עצור קריאה';
        ttsBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
        ttsBtn.classList.add('bg-red-500', 'hover:bg-red-600');
        
        // Reset button when speech ends
        utterance.onend = function() {
          isSpeaking = false;
          currentUtterance = null;
          ttsBtn.textContent = '🎤 הפעל קריאה';
          ttsBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
          ttsBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        };
        
        utterance.onerror = function() {
          isSpeaking = false;
          currentUtterance = null;
          ttsBtn.textContent = '🎤 הפעל קריאה';
          ttsBtn.classList.remove('bg-red-500', 'hover:bg-red-600');
          ttsBtn.classList.add('bg-green-500', 'hover:bg-green-600');
        };
      } else {
        ttsLabel.classList.remove('text-white');
        ttsLabel.classList.add('text-red-500');
        ttsLabel.classList.add('border-red-500');
      }
    });
  }
  
  // Colorblind mode
  if (colorblindBtn) {
    colorblindBtn.addEventListener('click', function() {
      isColorblindMode = !isColorblindMode;
      
      if (isColorblindMode) {
        // Apply colorblind-friendly colors (deuteranopia-friendly)
        document.documentElement.style.setProperty('--accent-color', '#FF6B35');
        document.documentElement.style.setProperty('--primary-color', '#2E86AB');
        document.documentElement.style.setProperty('--success-color', '#A23B72');
        
        // Update button
        colorblindBtn.textContent = '👁️ כבה מצב עיוורי צבעים';
        colorblindBtn.classList.remove('bg-purple-500', 'hover:bg-purple-600');
        colorblindBtn.classList.add('bg-orange-500', 'hover:bg-orange-600');
        
        // Find or create the main content wrapper
        let mainContent = document.querySelector('main');
        if (!mainContent) {
          // If no main tag exists, wrap all content except fixed elements
          mainContent = document.createElement('main');
          mainContent.id = 'main-content-wrapper';
          
          // Move all content except fixed elements into the wrapper
          while (document.body.firstChild) {
            const child = document.body.firstChild;
            if (!child.classList?.contains('fixed') && !child.querySelector?.('.fixed')) {
              mainContent.appendChild(child);
            } else {
              document.body.appendChild(child); // Move fixed elements to the end
            }
          }
          document.body.insertBefore(mainContent, document.body.firstChild);
        }
        
        // Apply filter to main content only
        mainContent.style.filter = 'contrast(1.3) saturate(0.7) hue-rotate(0deg)';
        
        // Apply specific color overrides for better distinction
        const style = document.createElement('style');
        style.id = 'colorblind-overrides';
        style.textContent = `
          /* Colorblind-friendly overrides */
          #colorblind-wrapper .bg-blue-500, 
          #colorblind-wrapper .bg-blue-600 { background-color: #1e40af !important; }
          #colorblind-wrapper .bg-green-500, 
          #colorblind-wrapper .bg-green-600 { background-color: #059669 !important; }
          #colorblind-wrapper .bg-red-500, 
          #colorblind-wrapper .bg-red-600 { background-color: #dc2626 !important; }
          #colorblind-wrapper .text-blue-400 { color: #1e40af !important; }
          #colorblind-wrapper .text-blue-300 { color: #1e40af !important; }
        `;
        document.head.appendChild(style);
      } else {
        // Reset to normal colors
        document.documentElement.style.removeProperty('--accent-color');
        document.documentElement.style.removeProperty('--primary-color');
        document.documentElement.style.removeProperty('--success-color');
        
        // Update button
        colorblindBtn.textContent = '👁️ הפעל מצב עיוורי צבעים';
        colorblindBtn.classList.remove('bg-orange-500', 'hover:bg-orange-600');
        colorblindBtn.classList.add('bg-purple-500', 'hover:bg-purple-600');
        
        // Remove filter from main content
        const mainContent = document.querySelector('main') || document.getElementById('main-content-wrapper');
        if (mainContent) {
          mainContent.style.filter = '';
        }
        
        // Remove style overrides
        const colorblindStyle = document.getElementById('colorblind-overrides');
        if (colorblindStyle) {
          colorblindStyle.remove();
        }
      }
    });
  }
  
  // Font size scaling
  if (fontSizeSlider) {
    // Store original font sizes to prevent cumulative scaling
    const originalFontSizes = new Map();
    
    // Initialize original font sizes
    function initializeOriginalFontSizes() {
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, label');
      textElements.forEach(element => {
        // Skip accessibility menu elements
        if (element.closest('#accessibility-menu')) {
          return;
        }
        if (!originalFontSizes.has(element)) {
          originalFontSizes.set(element, parseFloat(window.getComputedStyle(element).fontSize));
        }
      });
    }
    
    // Apply scaling based on original sizes
    function applyFontScaling(scale) {
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, a, label');
      
      textElements.forEach(element => {
        // Skip accessibility menu elements
        if (element.closest('#accessibility-menu')) {
          return;
        }
        const originalSize = originalFontSizes.get(element);
        if (originalSize) {
          const newSize = originalSize * scale;
          element.style.fontSize = `${newSize}px`;
        }
      });
    }
    
    // Initialize on page load
    initializeOriginalFontSizes();
    
    fontSizeSlider.addEventListener('input', function() {
      const scale = parseFloat(this.value);
      applyFontScaling(scale);
      
      // Update percentage display
      const percentageDisplay = document.getElementById('font-size-percentage');
      if (percentageDisplay) {
        percentageDisplay.textContent = `${Math.round(scale * 100)}%`;
      }
    });
    
    // Store user preference
    fontSizeSlider.addEventListener('change', function() {
      localStorage.setItem('fontSizeScale', this.value);
    });
    
    // Load user preference on page load
    const savedScale = localStorage.getItem('fontSizeScale');
    if (savedScale) {
      fontSizeSlider.value = savedScale;
      fontSizeSlider.dispatchEvent(new Event('input'));
    } else {
      // Set to normal size (100%) by default
      fontSizeSlider.value = 1;
      fontSizeSlider.dispatchEvent(new Event('input'));
    }
  }
}

// Initialize accessibility when DOM is loaded
if (document.getElementById('accessibility-btn')) {
  initAccessibility();
} 

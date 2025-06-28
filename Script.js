document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');
    const closeMenu = document.getElementById('close-menu');
    const slidesContainer = document.getElementById('slides-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('slider-dots');
    const categories = document.querySelectorAll('.categories a');
    const productGrid = document.getElementById('product-grid');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('search-input');

    const helpModal = document.getElementById('help-modal');
    const bookingModal = document.getElementById('booking-modal');
    const promoModal = document.getElementById('promo-modal');
    const creditModal = document.getElementById('credit-modal');
    const communityModal = document.getElementById('community-modal');

    const helpBtn = document.getElementById('help-btn');
    const bookingBtn = document.getElementById('booking-btn');
    const promoBtn = document.getElementById('promo-btn');
    const creditBtn = document.getElementById('credit-btn');
    const communityBtn = document.getElementById('community-btn');

    const helpCloseBtn = document.getElementById('help-close-btn');
    const bookingCloseBtn = document.getElementById('booking-close-btn');
    const promoCloseBtn = document.getElementById('promo-close-btn');
    const creditCloseBtn = document.getElementById('credit-close-btn');
    const communityCloseBtn = document.getElementById('community-close-btn');

    const helpOkBtn = document.getElementById('help-ok-button');
    const promoOkBtn = document.getElementById('promo-ok-button');
    const sideMenuLinks = document.querySelectorAll('.side-menu ul li a');

    searchIcon.addEventListener('click', () => {
        searchBar.style.display = (searchBar.style.display === 'none' || searchBar.style.display === '') ? 'block' : 'none';
        if (searchBar.style.display === 'block') {
            document.body.style.paddingTop = '110px';
        } else {
            document.body.style.paddingTop = '60px';
        }
    });

    menuIcon.addEventListener('click', () => sideMenu.classList.add('show'));
    closeMenu.addEventListener('click', () => sideMenu.classList.remove('show'));

    let currentSlide = 0;
    const totalSlides = slides.length;

    function createDots() {
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', i);
            sliderDots.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function showSlide(index) {
        if (totalSlides === 0) return;
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;
        slidesContainer.style.transform = `translateX(${-index * 100}%)`;
        currentSlide = index;
        updateDots();
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    if (totalSlides > 0) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        sliderDots.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                showSlide(parseInt(e.target.getAttribute('data-slide')));
            }
        });
        createDots();
        setInterval(nextSlide, 5000);
    } else if (prevBtn && nextBtn) { // Pastikan elemen ada sebelum disembunyikan
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    categories.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            categories.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            const filter = cat.getAttribute('data-category');
            filterProducts(filter);
        });
    });

    function filterProducts(category) {
        const query = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const name = card.getAttribute('data-name').toLowerCase();
            const matchesCategory = (category === 'all' || cardCategory === category);
            const matchesSearch = name.includes(query);

            if (matchesCategory && matchesSearch) {
                 card.classList.remove('hidden');
                 card.style.display = 'flex';
            } else {
                 card.classList.add('hidden');
                 card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', () => {
        const activeCategory = document.querySelector('.categories a.active').getAttribute('data-category');
        filterProducts(activeCategory);
    });

    function showModal(modal) { if (modal) modal.classList.add('show'); }
    function hideModal(modal) { if (modal) modal.classList.remove('show'); }

    if(helpBtn) helpBtn.addEventListener('click', () => showModal(helpModal));
    if(bookingBtn) bookingBtn.addEventListener('click', () => showModal(bookingModal));
    if(promoBtn) promoBtn.addEventListener('click', () => showModal(promoModal));
    if(creditBtn) creditBtn.addEventListener('click', () => showModal(creditModal));
    if(communityBtn) communityBtn.addEventListener('click', () => showModal(communityModal));

    [helpCloseBtn, bookingCloseBtn, promoCloseBtn, creditCloseBtn, communityCloseBtn].forEach(btn => {
        if (btn) btn.addEventListener('click', () => hideModal(btn.closest('.modal, .modal-overlay')));
    });
    if(helpOkBtn) helpOkBtn.addEventListener('click', () => hideModal(helpModal));
    if(promoOkBtn) promoOkBtn.addEventListener('click', () => hideModal(promoModal));

    [helpModal, bookingModal, promoModal, creditModal, communityModal].forEach(modal => {
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    });

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Booking service Anda telah kami terima. Kami akan segera menghubungi Anda untuk konfirmasi.');
        hideModal(bookingModal);
        e.target.reset();
    });

    const communityForm = document.getElementById('community-form');
    if (communityForm) communityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Minat Anda untuk bergabung telah kami catat. Tim kami akan menghubungi Anda segera.');
        hideModal(communityModal);
        e.target.reset();
    });

    const calculateCreditBtn = document.getElementById('calculate-credit-btn');
    const creditResultDiv = document.getElementById('credit-result');

    if (calculateCreditBtn) calculateCreditBtn.addEventListener('click', () => {
        const priceEl = document.getElementById('credit-motor');
        const dpEl = document.getElementById('credit-dp');
        const tenorEl = document.getElementById('credit-tenor');
        const interestEl = document.getElementById('credit-interest');
        const creditForm = document.getElementById('credit-form');

        const price = parseFloat(priceEl.value);
        const dp = parseFloat(dpEl.value);
        const tenor = parseInt(tenorEl.value);
        const interestRate = parseFloat(interestEl.value) / 100;

        if (!creditForm.checkValidity() || isNaN(price) || isNaN(dp) || isNaN(tenor) || isNaN(interestRate)) {
            alert('Mohon isi semua field dengan benar.');
            creditResultDiv.classList.add('hidden');
            return;
        }

        if (dp >= price) {
            alert('Uang Muka harus lebih kecil dari Harga Motor.');
            creditResultDiv.classList.add('hidden');
            return;
        }
        if (dp < 0 || price <= 0 || interestRate <=0 ) {
            alert('Harga, DP, dan Bunga harus positif.');
            creditResultDiv.classList.add('hidden');
            return;
        }

        const loanAmount = price - dp;
        const totalInterest = loanAmount * interestRate * tenor;
        const totalLoan = loanAmount + totalInterest;
        const monthlyInstallment = totalLoan / tenor;

        creditResultDiv.textContent = `Perkiraan Angsuran Bulanan: Rp ${monthlyInstallment.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        creditResultDiv.classList.remove('hidden');
    });

    document.querySelectorAll('.whatsapp-button').forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const card = button.closest('.product-card');
            const productName = card.getAttribute('data-name');
            const waNumber = '6285297955704'; // <<< GANTI NOMOR INI DENGAN NOMOR WA ANDA!
            const message = `Halo, saya tertarik dengan ${productName}. Mohon informasinya.`;
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
            window.open(waUrl, '_blank');
        });
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('whatsapp-button')) {
                 const productName = card.getAttribute('data-name');
                 console.log(`Info ${productName} ditampilkan.`);
                 // Anda bisa menambahkan aksi lain di sini, misal alert atau modal detail
            }
        });
    });

    sideMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const action = link.getAttribute('data-action');

            switch (action) {
                case 'beranda':
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'produk':
                    if (productGrid) {
                        productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    break;
                case 'promo':
                    showModal(promoModal);
                    break;
                case 'berita':
                    alert('Halaman Berita akan segera hadir!');
                    break;
                case 'kontak':
                     alert('Hubungi kami melalui tombol Help Center atau WA.');
                    break;
            }
            sideMenu.classList.remove('show');
        });
    });

    filterProducts('all');
});
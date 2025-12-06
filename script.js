// script.js - application logic (single source of truth)

// --- DATA DEFINITION ---
const APP_DATA = {
    appName: "ApniNotes",
    appSlogan: "Unlock your courses with expert notes.",
    apkDownloadUrl: "assets/ApniNotes.apk",
    posters: [
        { id: 1, title: "Semester 1: B.Com & B.Com (Honours)", imageUrl: "assets/sem-1-banner.jpg" },
        { id: 2, title: "Semester 3: B.Com & B.Com (Honours)", imageUrl: "assets/sem-3-banner.jpg" }
    ],
    sampleNotes: [
        { id: 1, title: "Business Law", imageUrl: "assets/business-law-notes.png" },
        { id: 2, title: "Business Mathematics", imageUrl: "assets/business-mathematics-notes.png" },
        { id: 3, title: "Financial Accounting", imageUrl: "assets/financial-accounting-notes.png" },
        { id: 4, title: "Financial Management", imageUrl: "assets/financial-management-notes.png" },
        { id: 5, title: "Marketing", imageUrl: "assets/marketing-notes.png" }
    ]
};

// --- STATE ---
let currentPosterIndex = 0;
let currentSampleIndex = 0;
let posterIntervalId = null;

function getCurrentYear() {
    return new Date().getFullYear();
}

// --- RENDERERS ---
function renderHeader() {
    return `
        <header class="shadow-lg bg-purple-700 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    
                    <div class="flex items-center space-x-3">
                        <img 
                            src="assets/favicon.jpg" 
                            alt="${APP_DATA.appName} Logo" 
                            class="h-16 w-16 rounded-full" 
                        />
                        <h1 class="text-3xl font-bold tracking-wider">${APP_DATA.appName}</h1>
                    </div>
                    <nav class="hidden md:flex space-x-6 text-sm font-medium">
                        <a href="#posters" class="hover:text-indigo-200 transition">Features</a>
                        <a href="#samples" class="hover:text-indigo-200 transition">Samples</a>
                    </nav>
                </div>
            </div>
        </header>
    `;
}

function renderHero() {
    return `
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 pt-16">
            <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tighter">
                Your All-in-One Course Notes Solution
            </h2>
            <p class="text-xl text-gray-600 mb-10">${APP_DATA.appSlogan}</p>

            <a href="${APP_DATA.apkDownloadUrl}" target="_blank" rel="noopener"
                class="inline-flex items-center justify-center space-x-4 
                       px-10 py-4 text-xl font-bold text-white bg-secondary-green rounded-full 
                       shadow-2xl shadow-secondary-green/50 hover:bg-green-700 transition 
                       transform hover:scale-105 active:scale-95 duration-200 focus:ring-4 focus:ring-green-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <span>Download APK Now & Start Learning</span>
            </a>
            <p class="mt-3 text-sm text-gray-500">Available for Android Devices. Secure & Fast Download.</p>
        </section>
    `;
}

function renderPosterSlider() {
    const postersHtml = APP_DATA.posters.map((poster) => `
        <div class="min-w-full flex-shrink-0" style="flex: 0 0 100%;">
            <div class="relative w-full max-w-4xl mx-auto pb-[56.25%] 
                         xl:max-h-[50vh] xl:mt-4 xl:mb-4"> 
                <img src="${poster.imageUrl}" alt="${poster.title || 'Poster'}"
                    class="absolute top-0 left-0 w-full h-full object-contain rounded-none"
                    onerror="this.onerror=null;this.src='https://placehold.co/1200x675/cccccc/333333?text=Poster+Unavailable';" />
            </div>
        </div>
    `).join('');

    return `
        <section id="posters" class="px-4 py-12 bg-gray-100/70 border-y border-gray-200">
            <h2 class="text-3xl font-bold text-center text-primary-indigo mb-6">Why Choose ${APP_DATA.appName}?</h2>
            <div class="relative w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white">
                <div id="poster-track" class="slider-track flex" style="transform: translateX(-${currentPosterIndex * 100}%)">
                    ${postersHtml}
                </div>
                </div>
        </section>
    `;
}

function renderNotesCarousel() {
    const samplesHtml = APP_DATA.sampleNotes.map(sample => `
        <div class="min-w-full flex-shrink-0 p-4 bg-white" style="flex: 0 0 100%;">
            <img src="${sample.imageUrl}" alt="${sample.title}"
                 class="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-inner ring-1 ring-gray-200"
                 onerror="this.onerror=null;this.src='https://placehold.co/800x450/cccccc/333333?text=Note+Image+Unavailable';" />
            <p class="text-center mt-4 text-xl font-semibold text-gray-700">${sample.title}</p>
        </div>
    `).join('');

    return `
        <section id="samples" class="px-4 py-20">
            <h2 class="text-3xl font-bold text-center text-primary-indigo mb-10">Sneak Peek: Quality Notes You Can Trust</h2>
            <div class="relative w-full max-w-6xl mx-auto">
                <div class="overflow-hidden rounded-xl shadow-2xl border-4 border-gray-100">
                    <div id="sample-track" class="carousel-track flex" style="transform: translateX(-${currentSampleIndex * 100}%)">
                        ${samplesHtml}
                    </div>
                </div>

                <button onclick="prevSample()" class="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-xl transition duration-300 z-10 border border-gray-200" aria-label="Previous Sample">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-indigo"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onclick="nextSample()" class="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-xl transition duration-300 z-10 border border-gray-200" aria-label="Next Sample">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-indigo"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
            </div>
        </section>
    `;
}

function renderFooter() {
    return `
        <footer class="py-6 bg-gray-900 text-white text-center text-sm">
            <p>&copy; ${getCurrentYear()} ${APP_DATA.appName}. All rights reserved.</p>
            <p class="text-xs text-gray-400 mt-1">Download the app for the full learning experience.</p>
        </footer>
    `;
}

// --- SLIDER UPDATES ---
function updateSlider(index, total, trackId, indicatorId, stateVar) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    window[stateVar] = index;

    const indicators = document.getElementById(indicatorId);
    if (indicators) {
        indicators.innerHTML = APP_DATA.posters.map((_, i) => `
            <button onclick="setPoster(${i})" 
                class="h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-primary-indigo w-5' : 'bg-gray-300 w-3'}"
                aria-label="Go to slide ${i + 1}">
            </button>
        `).join('');
    }
}

// --- CONTROLS ---
function startPosterAutoSlide() {
    if (posterIntervalId) clearInterval(posterIntervalId);
    posterIntervalId = setInterval(nextPoster, 5000);
}

function setPoster(index) {
    clearInterval(posterIntervalId);
    currentPosterIndex = index;
    updateSlider(currentPosterIndex, APP_DATA.posters.length, 'poster-track', 'poster-indicators', 'currentPosterIndex');
    startPosterAutoSlide();
}

function nextPoster() {
    const nextIndex = (currentPosterIndex + 1) % APP_DATA.posters.length;
    setPoster(nextIndex);
}

function prevPoster() {
    const prevIndex = (currentPosterIndex - 1 + APP_DATA.posters.length) % APP_DATA.posters.length;
    setPoster(prevIndex);
}

function nextSample() {
    currentSampleIndex = (currentSampleIndex + 1) % APP_DATA.sampleNotes.length;
    updateSlider(currentSampleIndex, APP_DATA.sampleNotes.length, 'sample-track', null, 'currentSampleIndex');
}

function prevSample() {
    currentSampleIndex = (currentSampleIndex - 1 + APP_DATA.sampleNotes.length) % APP_DATA.sampleNotes.length;
    updateSlider(currentSampleIndex, APP_DATA.sampleNotes.length, 'sample-track', null, 'currentSampleIndex');
}

// Expose functions/vars globally for buttons to call
window.nextPoster = nextPoster;
window.prevPoster = prevPoster;
window.setPoster = setPoster;
window.nextSample = nextSample;
window.prevSample = prevSample;
window.currentPosterIndex = currentPosterIndex;
window.currentSampleIndex = currentSampleIndex;

// --- INITIALIZATION ---
function initializeApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    appRoot.innerHTML = `
        ${renderHeader()}
        <main>
            ${renderHero()}
            ${renderPosterSlider()}
            ${renderNotesCarousel()}
        </main>
        ${renderFooter()}
    `;

    // Create indicators and start auto slide
    updateSlider(currentPosterIndex, APP_DATA.posters.length, 'poster-track', 'poster-indicators', 'currentPosterIndex');
    startPosterAutoSlide();
}

window.onload = initializeApp;

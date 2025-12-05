// script.js

// --- DATA DEFINITION ---
const APP_DATA = {
    appName: "ApniNotes",
    appSlogan: "Unlock your courses with expert notes.",
    apkDownloadUrl: "https://your-app-store-link.com/download-apk",
    posters: [
        {
            id: 1,
            title: "Comprehensive Notes for All Courses!",
            subtitle: "Stop summarizing, start studying.",
            items: ["Math, Science, History, Languages", "Programming & Technology", "Business & Economics", "Art & Philosophy"],
            bgColor: "bg-primary-indigo",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
        },
        {
            id: 2,
            title: "Flexible Pricing Plans!",
            subtitle: "Affordable access to quality education.",
            items: ["Monthly Subscription: $5.99", "Per Course Access: $3.99", "Annual Premium: $49.99 (Best Value!)"],
            bgColor: "bg-secondary-green",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
        },
    ],
    sampleNotes: [
        { id: 1, title: "Calculus I: Integration", imageUrl: "https://placehold.co/800x600/6366f1/ffffff?text=Math+Notes" },
        { id: 2, title: "World History: Cold War", imageUrl: "https://placehold.co/800x600/ef4444/ffffff?text=History+Timeline" },
        { id: 3, title: "Python: Asynchronous Code", imageUrl: "https://placehold.co/800x600/10b981/ffffff?text=Programming+Snippet" },
        { id: 4, title: "Economics: Supply & Demand", imageUrl: "https://placehold.co/800x600/f59e0b/ffffff?text=Economics+Graph" },
    ],
};

// --- STATE & UTILITIES ---
let currentPosterIndex = 0;
let currentSampleIndex = 0;
let posterIntervalId = null;

function getCurrentYear() {
    return new Date().getFullYear();
}

// --- RENDER FUNCTIONS ---

function renderHeader() {
    return `
        <header class="shadow-lg bg-primary-indigo text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold tracking-wider">${APP_DATA.appName}</h1>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <span>Download APK Now & Start Learning</span>
            </a>
            <p class="mt-3 text-sm text-gray-500">Available for Android Devices. Secure & Fast Download.</p>
        </section>
    `;
}

function renderPosterSlider() {
    const postersHtml = APP_DATA.posters.map(poster => `
        <div class="min-w-full flex-shrink-0 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between" style="flex: 0 0 100%;">
            <div class="w-full md:w-1/2 p-6 rounded-xl shadow-2xl bg-white ring-1 ring-gray-100 text-center md:text-left h-full flex flex-col justify-center">
                <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">${poster.title}</h3>
                <ul class="text-left space-y-3 text-gray-700 font-medium">
                    ${poster.items.map(item => `
                        <li class="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary-indigo mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                            <span>${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="hidden md:flex w-1/2 h-full rounded-2xl p-8 ml-8 shadow-inner ${poster.bgColor} text-white flex-col justify-center items-center">
                ${poster.iconSvg}
                <p class="text-xl font-semibold italic text-center mt-4">${poster.subtitle}</p>
            </div>
        </div>
    `).join('');

    return `
        <section id="posters" class="px-4 py-12 bg-gray-100/70 border-y border-gray-200">
            <h2 class="text-3xl font-bold text-center text-primary-indigo mb-10">Why Choose ${APP_DATA.appName}?</h2>
            <div class="relative w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white">
                <div id="poster-track" class="slider-track flex h-96" style="transform: translateX(-${currentPosterIndex * 100}%)">
                    ${postersHtml}
                </div>

                <button onclick="prevPoster()" class="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition duration-300 z-10 ring-1 ring-gray-200" aria-label="Previous Feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button onclick="nextPoster()" class="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition duration-300 z-10 ring-1 ring-gray-200" aria-label="Next Feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><polyline points="9 18 15 12 9 6"/></svg>
                </button>

                <div id="poster-indicators" class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
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
                 onerror="this.onerror=null;this.src='https://placehold.co/800x450/cccccc/333333?text=Note+Image+Unavailable';"
            />
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

function updateSlider(index, total, trackId, indicatorId, stateVar) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    window[stateVar] = index; // Update the global state

    const indicators = document.getElementById(indicatorId);
    if (indicators) {
        // Re-render indicators to show the active one
        indicators.innerHTML = APP_DATA.posters.map((_, i) => `
            <button onclick="setPoster(${i})" 
                class="h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-primary-indigo w-5' : 'bg-gray-300 w-3'}"
                aria-label="Go to slide ${i + 1}">
            </button>
        `).join('');
    }
}

// --- CONTROL FUNCTIONS ---

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

// Expose functions to the global scope for event handlers in the generated HTML
window.nextPoster = nextPoster;
window.prevPoster = prevPoster;
window.setPoster = setPoster;
window.nextSample = nextSample;
window.prevSample = prevSample;
// Expose state variables globally for updateSlider (since it relies on them being global for the onclicks)
window.currentPosterIndex = currentPosterIndex;
window.currentSampleIndex = currentSampleIndex;


// --- INITIALIZATION ---
function initializeApp() {
    const appRoot = document.getElementById('app-root');
    if (appRoot) {
        appRoot.innerHTML = `
            ${renderHeader()}
            <main>
                ${renderHero()}
                ${renderPosterSlider()}
                ${renderNotesCarousel()}
            </main>
            ${renderFooter()}
        `;
    }
    // Set initial indicators and start the auto-slide only after the content is loaded
    updateSlider(currentPosterIndex, APP_DATA.posters.length, 'poster-track', 'poster-indicators', 'currentPosterIndex');
    startPosterAutoSlide();
}

window.onload = initializeApp;

import { ChangeDetectionStrategy, Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- INTERFACES AND DATA STRUCTURES ---

interface Poster {
  id: number;
  title: string;
  subtitle: string;
  items: string[];
  bgColor: string; // Tailwind class
  iconPath: string; // SVG path for icon
}

interface SampleNote {
  id: number;
  title: string;
  imageUrl: string;
}

interface AppData {
  appName: string;
  appSlogan: string;
  apkDownloadUrl: string;
  posters: Poster[];
  sampleNotes: SampleNote[];
}

// Data Definition (Mocking a Service or Store)
const APP_DATA: AppData = {
  appName: "ApniNotes", // UPDATED NAME
  appSlogan: "Unlock your courses with expert notes.",
  apkDownloadUrl: "https://your-app-store-link.com/download-apk",
  posters: [
    {
      id: 1,
      title: "Comprehensive Notes for All Courses!",
      subtitle: "Stop summarizing, start studying.",
      items: ["Math, Science, History, Languages", "Programming & Technology", "Business & Economics", "Art & Philosophy"],
      bgColor: "bg-indigo-600",
      iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" // Book icon path
    },
    {
      id: 2,
      title: "Flexible Pricing Plans!",
      subtitle: "Affordable access to quality education.",
      items: ["Monthly Subscription: $5.99", "Per Course Access: $3.99", "Annual Premium: $49.99 (Best Value!)"],
      bgColor: "bg-teal-600",
      iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.41L12 15.82l-1.41 1.59L8 14.24l4 4 4-4-2.59 2.17zM12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-2.5 4c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5S13.38 7.5 12 7.5 9.5 8.62 9.5 10z" // Dollar sign path
    },
  ],
  sampleNotes: [
    { id: 1, title: "Calculus I: Integration", imageUrl: "https://placehold.co/800x600/6366f1/ffffff?text=Math+Notes" },
    { id: 2, title: "World History: Cold War", imageUrl: "https://placehold.co/800x600/ef4444/ffffff?text=History+Timeline" },
    { id: 3, title: "Python: Asynchronous Code", imageUrl: "https://placehold.co/800x600/10b981/ffffff?text=Programming+Snippet" },
    { id: 4, title: "Economics: Supply & Demand", imageUrl: "https://placehold.co/800x600/f59e0b/ffffff?text=Economics+Graph" },
  ],
};


// --- ANGULAR COMPONENT ---

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">

      <!-- Header: Material Design App Bar -->
      <header class="shadow-lg sticky top-0 z-50 bg-indigo-700 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold tracking-wider">{{ appData.appName }}</h1>
            <!-- Menu for mobile/desktop -->
            <nav class="hidden md:flex space-x-6 text-sm font-medium">
              <a href="#posters" class="hover:text-indigo-200 transition">Features</a>
              <a href="#samples" class="hover:text-indigo-200 transition">Samples</a>
            </nav>
          </div>
        </div>
      </header>

      <main class="py-16">

        <!-- Hero Section & CTA (Call to Action) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tighter">
            Your All-in-One Course Notes Solution
          </h2>
          <p class="text-xl text-gray-600 mb-10">{{ appData.appSlogan }}</p>

          <a [href]="appData.apkDownloadUrl" target="_blank" rel="noopener"
            class="inline-flex items-center justify-center space-x-4 
                   px-10 py-4 text-xl font-bold text-white bg-green-600 rounded-full 
                   shadow-2xl shadow-green-400/50 hover:bg-green-700 transition 
                   transform hover:scale-105 active:scale-95 duration-200 focus:ring-4 focus:ring-green-300"
          >
            <!-- Download Icon (from Lucide set) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            <span>Download APK Now & Start Learning</span>
          </a>
          <p class="mt-3 text-sm text-gray-500">Available for Android Devices. Secure & Fast Download.</p>
        </section>

        <!-- Promotional Poster Slider -->
        <section id="posters" class="px-4 py-12 bg-gray-100/70 border-y border-gray-200">
          <h2 class="text-3xl font-bold text-center text-indigo-700 mb-10">Why Choose ApniNotes?</h2>
          <div class="relative w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white">
            <!-- Slider Track -->
            <div class="flex transition-transform duration-700 ease-in-out h-96"
                 [style.transform]="'translateX(-' + (currentPosterIndex() * 100) + '%)'">
              @for (poster of appData.posters; track poster.id) {
                <div class="min-w-full flex-shrink-0 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between"
                     style="flex: 0 0 100%;">

                  <!-- Content Card (Left) -->
                  <div class="w-full md:w-1/2 p-6 rounded-xl shadow-2xl bg-white ring-1 ring-gray-100 text-center md:text-left h-full flex flex-col justify-center">
                    <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{{ poster.title }}</h3>
                    <ul class="text-left space-y-3 text-gray-700 font-medium">
                      @for (item of poster.items; track item) {
                        <li class="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-500 mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>{{ item }}</span>
                        </li>
                      }
                    </ul>
                  </div>

                  <!-- Visual Background (Right) -->
                  <div class="hidden md:flex w-1/2 h-full rounded-2xl p-8 ml-8 shadow-inner"
                       [ngClass]="poster.bgColor + ' text-white flex-col justify-center items-center'">
                    <svg viewBox="0 0 24 24" width="80" height="80" fill="white" class="opacity-90 mb-4">
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path [attr.d]="poster.iconPath"/>
                    </svg>
                    <p class="text-xl font-semibold italic text-center">{{ poster.subtitle }}</p>
                  </div>

                </div>
              }
            </div>

            <!-- Navigation Buttons -->
            <button (click)="prevPoster()" class="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition duration-300 z-10 ring-1 ring-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button (click)="nextPoster()" class="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/70 hover:bg-white rounded-full shadow-lg transition duration-300 z-10 ring-1 ring-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700"><polyline points="9 18 15 12 9 6"/></svg>
            </button>

            <!-- Indicators -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              @for (poster of appData.posters; track poster.id; let i = $index) {
                <button (click)="currentPosterIndex.set(i)"
                        [ngClass]="{'bg-indigo-600 w-5': i === currentPosterIndex(), 'bg-gray-300 w-3': i !== currentPosterIndex()}"
                        class="h-3 rounded-full transition-all duration-300"
                        [attr.aria-label]="'Go to slide ' + (i + 1)"
                ></button>
              }
            </div>
          </div>
        </section>

        <!-- Notes Sample Carousel -->
        <section id="samples" class="px-4 py-20">
          <h2 class="text-3xl font-bold text-center text-indigo-700 mb-10">Sneak Peek: Quality Notes You Can Trust</h2>
          <div class="relative w-full max-w-6xl mx-auto">
            <div class="overflow-hidden rounded-xl shadow-2xl border-4 border-gray-100">
              <!-- Slider Track -->
              <div class="flex transition-transform duration-500 ease-in-out"
                   [style.transform]="'translateX(-' + (currentSampleIndex() * 100) + '%)'">
                @for (sample of appData.sampleNotes; track sample.id) {
                  <div class="min-w-full flex-shrink-0 p-4 bg-white" style="flex: 0 0 100%;">
                    <img [src]="sample.imageUrl" [alt]="sample.title" 
                         class="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-inner ring-1 ring-gray-200"
                         onerror="this.onerror=null;this.src='https://placehold.co/800x450/cccccc/333333?text=Note+Image+Unavailable';"
                    />
                    <p class="text-center mt-4 text-xl font-semibold text-gray-700">{{ sample.title }}</p>
                  </div>
                }
              </div>
            </div>
            
            <!-- Navigation Buttons -->
            <button (click)="prevSample()" class="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-xl transition duration-300 z-10 border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button (click)="nextSample()" class="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-xl transition duration-300 z-10 border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </section>

      </main>

      <!-- Footer: Simple and clean -->
      <footer class="py-6 bg-gray-900 text-white text-center text-sm">
        <p>&copy; {{ currentYear() }} {{ appData.appName }}. All rights reserved.</p>
        <p class="text-xs text-gray-400 mt-1">Download the app for the full learning experience.</p>
      </footer>
    </div>
  `,
  // Minimal internal styles, relying primarily on Tailwind CSS
  styles: [`
    /* Ensures smooth transitions for the sliders */
    .transition-transform {
      transition-property: transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  // --- STATE MANAGEMENT (SIGNALS) ---
  readonly appData: AppData = APP_DATA;
  currentYear = signal(new Date().getFullYear());
  
  // Slider State
  currentPosterIndex = signal(0);
  currentSampleIndex = signal(0);

  // Auto-Slide Logic
  private posterIntervalId: any;

  // --- LIFECYCLE HOOKS ---
  ngOnInit(): void {
    // Start automatic poster sliding
    this.startPosterAutoSlide();
  }

  ngOnDestroy(): void {
    // Clear interval when component is destroyed
    if (this.posterIntervalId) {
      clearInterval(this.posterIntervalId);
    }
  }

  // --- SLIDER LOGIC ---

  startPosterAutoSlide(): void {
    this.posterIntervalId = setInterval(() => {
      this.currentPosterIndex.update(prev => (prev + 1) % this.appData.posters.length);
    }, 5000); // Auto-slide every 5 seconds
  }

  nextPoster(): void {
    // Clear interval on manual interaction and restart it,
    // so the user has time to view the poster before it slides again.
    clearInterval(this.posterIntervalId);
    this.currentPosterIndex.update(prev => (prev + 1) % this.appData.posters.length);
    this.startPosterAutoSlide();
  }

  prevPoster(): void {
    clearInterval(this.posterIntervalId);
    this.currentPosterIndex.update(prev => 
      (prev - 1 + this.appData.posters.length) % this.appData.posters.length
    );
    this.startPosterAutoSlide();
  }

  nextSample(): void {
    this.currentSampleIndex.update(prev => (prev + 1) % this.appData.sampleNotes.length);
  }

  prevSample(): void {
    this.currentSampleIndex.update(prev => 
      (prev - 1 + this.appData.sampleNotes.length) % this.appData.sampleNotes.length
    );
  }
}

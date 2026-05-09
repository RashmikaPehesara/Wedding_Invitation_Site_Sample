export const clientData = {
  // General Info
  weddingDate: "2026-12-15T09:00:00", // ISO Format
  weddingDateFormatted: "December 15, 2026",
  weddingTime: "09:00 AM",
  whatsappNumber: "94768638725", // Used for RSVP submission

  // Couple Info
  couple: {
    groom: {
      name: "Kasun",
      fullName: "Kasun Perera",
      phoneLocal: "077 686 3872",
      phoneTel: "+94776863872",
      role: "The Groom",
      description: "With love and deep gratitude, I look forward to a lifetime of standing beside you sharing dreams, building a home, and growing together through every season of life.",
      image: "https://i.pinimg.com/736x/07/7e/b0/077eb0d57dba17ca3892ad7c47874390.jpg", // Placeholder
      socials: {
        instagram: "https://instagram.com/kasun",
        facebook: "https://facebook.com/kasun"
      }
    },
    bride: {
      name: "Nethmi",
      fullName: "Nethmi Silva",
      phoneLocal: "071 234 5678",
      phoneTel: "+94712345678",
      role: "The Bride",
      description: "With all my heart, I look forward to a lifetime of love, laughter, and gentle moments walking hand in hand with my best friend and forever partner.",
      image: "https://i.pinimg.com/736x/f8/e5/ad/f8e5ad85f42656d7f338437a55d11b72.jpg", // Placeholder
      socials: {
        instagram: "https://instagram.com/nethmi",
        facebook: "https://facebook.com/nethmi"
      }
    }
  },

  // Hero Section
  hero: {
    heroImages: {
      mobile: "https://images.pexels.com/photos/36813779/pexels-photo-36813779.jpeg",
      desktop: "https://images.pexels.com/photos/36813782/pexels-photo-36813782.jpeg"
    },
    welcomeText: "We are getting married",
  },

  // Story Section
  story: {
    title: "Our Love Story",
    description: "It all started with a simple hello. Over the years, our bond grew stronger through countless adventures, shared dreams, and endless laughter. Now, we are ready to take the next step together.",
  },

  // Timeline
  timeline: [
    {
      time: "08:30 AM",
      title: "Guest Arrival",
      description: "Welcome drinks and finding your seats."
    },
    {
      time: "09:15 AM",
      title: "Ceremony",
      description: "The exchange of vows and rings."
    },
    {
      time: "11:00 AM",
      title: "Cocktail Hour",
      description: "Light refreshments and photography."
    },
    {
      time: "12:30 PM",
      title: "Lunch",
      description: "A grand feast to celebrate the occasion."
    },
    {
      time: "02:30 PM",
      title: "Party",
      description: "Music, dancing, and making memories."
    },
    {
      time: "05:00 PM",
      title: "Going Away",
      description: "The couple departs for their honeymoon."
    }
  ],

  // Location
  location: {
    venueName: "The Grand Hotel",
    address: "123 Wedding Lane, Colombo",
    lat: "6.927079",
    lng: "79.861244",
    duration: "09:00 AM - 05:00 PM",
    googleMapsUrl: "https://maps.google.com/?q=The+Grand+Hotel+Colombo",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162584166!2d79.77380313880625!3d6.921833527637841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1714732644265!5m2!1sen!2slk",
  },

  gallery: [
    // Set 1
    "https://i.pinimg.com/1200x/63/bd/e5/63bde5d2d866f990192cb12ecf576128.jpg",
    "https://i.pinimg.com/1200x/c7/2c/f8/c72cf80f9f782c1b7306aa8d952ea4a3.jpg",
    "https://i.pinimg.com/1200x/24/c0/47/24c047cc66fc9be947d29091de000c07.jpg",
    "https://i.pinimg.com/1200x/c9/9d/f2/c99df2d61d085bf4ca15715f0270bc1c.jpg",
    // Set 2
    "https://i.pinimg.com/1200x/e0/c5/9b/e0c59bfd773a27b1d979b7f5f540bd50.jpg",
    "https://i.pinimg.com/1200x/41/59/84/4159843aa177ee6dfe24d63a3eeb4afb.jpg",
    "https://i.pinimg.com/1200x/28/f8/22/28f822c6ff638c29f983298105409fcb.jpg",
    "https://i.pinimg.com/1200x/0f/99/86/0f9986e739743629c25c928651cfca8f.jpg",
    // Set 3
    "https://i.pinimg.com/1200x/35/0a/2b/350a2b1fd1917f5dc8f37b97786810f9.jpg",
    "https://i.pinimg.com/1200x/c1/67/e2/c167e20158244e77795e4bdbb5647f3c.jpg",
    "https://i.pinimg.com/736x/43/86/81/4386810ca7d46fecbc1e533d194de40f.jpg",
    "https://i.pinimg.com/1200x/27/e9/62/27e96229be371eb73eba43cfaafa070a.jpg",
    // Set 4
    "https://i.pinimg.com/736x/49/24/07/49240708c09d7b8043833103b8f82430.jpg",
    "https://i.pinimg.com/736x/cf/0f/4c/cf0f4c6fbd50bfbee3e369dfde1bf52e.jpg",
    "https://i.pinimg.com/736x/15/57/92/155792c754998dcd42d7a66319b7e6bf.jpg",
    "https://i.pinimg.com/736x/91/51/57/915157bff376e1a1f85d13a7937143b1.jpg",
  ],

  // Toggles
  toggles: {
    showRSVP: true,
    showSocialLinks: true,
    showMusic: true,
    showLoveStory: true,
    showCountdown: true,
    showTimeline: true,
    showGallery: true,
  },

  // Contact Info
  contact: {
    showPhones: true,
  },

  // Design Theme Variables (used to inject CSS custom properties)
  theme: {
    primary: "#1E2D2B",    // Primary text
    secondary: "#F8F7F4",  // Soft white background
    accent: "#C9A13B",     // Gold
    text: "#1E2D2B",       // Primary text
    background: "#F8F7F4", // Soft white
  },

  // Music (if toggle is true)
  musicFile: "/audio/romantic-bg.mp3", // Place an audio file in public/audio/
};

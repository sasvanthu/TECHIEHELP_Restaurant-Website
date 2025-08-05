import React, { useState, useEffect } from 'https://unpkg.com/react@18/umd/react.development.js';
import ReactDOM from 'https://unpkg.com/react-dom@18/umd/react-dom.development.js';

// Hero Component with 3D Animation
const Hero = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, 400);
    document.getElementById('hero-canvas').appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xd4a017, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.domElement.remove();
  }, []);

  return (
    <section className="relative h-[400px] bg-[url('https://source.unsplash.com/1600x400/?indian-spices')] parallax">
      <div id="hero-canvas" className="absolute inset-0"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold text-[var(--accent)]">The Royal Tandoor</h1>
        <p className="text-xl md:text-2xl mt-4">Savor the Essence of India</p>
        <button className="mt-6 px-6 py-3 bg-[var(--secondary)] text-[var(--text)] rounded-full hover:bg-[var(--primary)] transition">Reserve a Table</button>
      </div>
    </section>
  );
};

// Menu Component with Search and Filter
const Menu = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const menuItems = [
    { name: 'Butter Chicken', category: 'Main', price: 18, image: 'https://source.unsplash.com/300x200/?butter-chicken' },
    { name: 'Paneer Tikka', category: 'Starter', price: 12, image: 'https://source.unsplash.com/300x200/?paneer-tikka' },
    { name: 'Biryani', category: 'Main', price: 20, image: 'https://source.unsplash.com/300x200/?biryani' },
    { name: 'Naan', category: 'Bread', price: 4, image: 'https://source.unsplash.com/300x200/?naan' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All' || item.category === category)
  );

  return (
    <section className="py-16 px-4 bg-[var(--bg-dark)] text-[var(--accent)]">
      <h2 className="text-4xl font-bold text-center mb-8">Our Menu</h2>
      <div className="flex flex-col md:flex-row justify-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search dishes..."
          className="p-2 rounded-lg bg-[var(--bg-light)] text-[var(--text)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 rounded-lg bg-[var(--bg-light)] text-[var(--text)]"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Starter</option>
          <option>Main</option>
          <option>Bread</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div key={index} className="floating-card bg-[var(--bg-light)] p-4 rounded-lg fade-in">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-4">{item.name}</h3>
            <p className="text-[var(--text)]">{item.category}</p>
            <p className="text-[var(--secondary)] font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Gallery Component
const Gallery = () => {
  const images = [
    'https://source.unsplash.com/400x300/?indian-food',
    'https://source.unsplash.com/400x300/?indian-spices',
    'https://source.unsplash.com/400x300/?indian-decor',
    'https://source.unsplash.com/400x300/?tandoor',
  ];

  return (
    <section className="py-16 px-4 bg-[var(--bg-light)]">
      <h2 className="text-4xl font-bold text-center mb-8">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="floating-card fade-in">
            <img src={src} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
};

// Chef’s Story Timeline
const ChefStory = () => {
  const timeline = [
    { year: '2010', event: 'Trained at Culinary Institute of India' },
    { year: '2015', event: 'Head Chef at Mumbai Spice' },
    { year: '2020', event: 'Founded The Royal Tandoor' },
  ];

  return (
    <section className="py-16 px-4 bg-[var(--bg-dark)] text-[var(--accent)]">
      <h2 className="text-4xl font-bold text-center mb-8">Chef’s Story</h2>
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[var(--secondary)]"></div>
        {timeline.map((item, index) => (
          <div key={index} className={`mb-8 flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} fade-in`}>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
              <div className="bg-[var(--bg-light)] p-4 rounded-lg floating-card">
                <h3 className="text-xl font-bold">{item.year}</h3>
                <p>{item.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Testimonials Slider
const Testimonials = () => {
  const testimonials = [
    { name: 'Amit P.', text: 'The best Indian food I’ve ever had!' },
    { name: 'Sarah K.', text: 'The ambiance and flavors are unforgettable.' },
    { name: 'Raj S.', text: 'A true taste of royalty!' },
  ];

  return (
    <section className="py-16 px-4 bg-[var(--bg-light)]">
      <h2 className="text-4xl font-bold text-center mb-8">Testimonials</h2>
      <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory">
        {testimonials.map((item, index) => (
          <div key={index} className="floating-card bg-[var(--bg-dark)] text-[var(--accent)] p-6 rounded-lg min-w-[300px] snap-center">
            <p className="italic">"{item.text}"</p>
            <p className="mt-4 font-bold">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Reservation Form
const Reservation = () => {
  return (
    <section className="py-16 px-4 bg-[var(--bg-dark)] text-[var(--accent)]">
      <h2 className="text-4xl font-bold text-center mb-8">Book a Table</h2>
      <div className="max-w-lg mx-auto bg-[var(--bg-light)] p-6 rounded-lg floating-card">
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-2 rounded-lg" />
          <input type="email" placeholder="Email" className="p-2 rounded-lg" />
          <input type="date" className="p-2 rounded-lg" />
          <input type="time" className="p-2 rounded-lg" />
          <button className="p-2 bg-[var(--secondary)] text-[var(--text)] rounded-lg hover:bg-[var(--primary)] transition">Reserve</button>
        </div>
      </div>
    </section>
  );
};

// Location with Google Map
const Location = () => {
  return (
    <section className="py-16 px-4 bg-[var(--bg-light)]">
      <h2 className="text-4xl font-bold text-center mb-8">Visit Us</h2>
      <div className="max-w-4xl mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019059285602!2d-122.4194156846813!3d37.77492977975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c5d6e3b7b%3A0x1f6b6e6e6e6e6e6e!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1631234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <p className="mt-4 text-center">123 Royal Street, San Francisco, CA</p>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  const [theme, setTheme] = useState('light');
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleAudio = () => {
    const audio = document.getElementById('bg-audio');
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [theme]);

  return (
    <div>
      <nav className="fixed top-0 w-full bg-[var(--bg-dark)] text-[var(--accent)] p-4 flex justify-between items-center z-50">
        <h1 className="text-2xl font-bold">The Royal Tandoor</h1>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-[var(--secondary)]">
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          <button onClick={toggleAudio} className="p-2 rounded-full bg-[var(--secondary)]">
            {isPlaying ? 'Pause' : 'Play'} Music
          </button>
        </div>
      </nav>
      <button className="fixed bottom-8 right-8 bg-[var(--primary)] text-[var(--accent)] p-4 rounded-full shadow-lg hover:bg-[var(--secondary)] transition">
        Reserve Now
      </button>
      <Hero />
      <Menu />
      <Gallery />
      <ChefStory />
      <Testimonials />
      <Reservation />
      <Location />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

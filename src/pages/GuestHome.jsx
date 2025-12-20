import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHotel } from '../context/HotelContext';

const GuestHome = () => {
  const { rooms } = useHotel();
  const navigate = useNavigate();

  // Helper to find available rooms of a type
  const getAvailability = (type) => {
    const available = rooms.filter(r => r.type === type && r.status === 'Available').length;
    return available > 0 ? `${available} rooms left` : 'Fully Booked';
  };

  const handleBook = (type) => {
    const availableRoom = rooms.find(r => r.type === type && r.status === 'Available');
    if (availableRoom) {
      navigate(`/book/${availableRoom.id}`);
    } else {
      alert('Sorry, this room type is fully booked.');
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full">
        <div 
          className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 relative" 
          style={{backgroundImage: 'linear-gradient(rgba(16, 25, 34, 0.4) 0%, rgba(16, 25, 34, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuASk_XdzJdYBYLxY_HOOo79Gy_aGoVfttJHKKqlCUBAYk-Bgyi5xh9-dwWPKJAMQNRSilfPrUcaKbwesttpvaIwz4oWkfUYen3Argrkkrhm-qvaBp8-fhpDGqfbHm2rJU0N068tpHmRG2lY3NVsFsFOROozB79Uush30YmbvfU6iHMjDC__ZZVpusfIGIx_kwWVt_NN20_Jd5eJfb7Z9lfduQfnkmlHhLav-HKDJ8dK4aCmPcHqrUaOquMOErJvql4G3bgAYZPXocjj")'}}
        >
          <div className="flex flex-col gap-3 text-center z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold w-fit mx-auto backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              New Modern Experience in Bueng Kan
            </div>
            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-[-0.033em]">
              Relaxation Meets<br />Modern Comfort
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-normal max-w-xl mx-auto">
              Experience our newly renovated rooms designed for the modern traveler. High-speed Wi-Fi, smart check-in, and premium amenities.
            </p>
          </div>

          {/* Booking Search Widget */}
          <div className="w-full max-w-[800px] z-10 mt-8 p-1 rounded-2xl bg-surface-dark/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center w-full gap-2 p-2">
              <div className="flex-1 w-full bg-surface-dark rounded-xl border border-border-dark px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">date_range</span>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Dates</span>
                  <input type="text" placeholder="Check-in - Check-out" className="bg-transparent border-none p-0 text-white text-sm focus:ring-0 placeholder:text-gray-500 font-medium w-full" />
                </div>
              </div>
              <div className="flex-1 w-full md:w-1/3 bg-surface-dark rounded-xl border border-border-dark px-4 py-3 flex items-center gap-3">
                <span className="material-symbols-outlined text-text-secondary">group</span>
                <div className="flex flex-col w-full">
                  <span className="text-[10px] uppercase font-bold text-text-secondary tracking-wider">Guests</span>
                  <select className="bg-transparent border-none p-0 text-white text-sm focus:ring-0 w-full cursor-pointer bg-surface-dark">
                    <option>2 Adults, 0 Children</option>
                    <option>1 Adult</option>
                    <option>Family (4 Guests)</option>
                  </select>
                </div>
              </div>
              <button className="w-full md:w-auto h-14 md:h-full px-8 bg-primary hover:bg-primary/90 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25">
                <span className="material-symbols-outlined">search</span>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Promotions & Features Grid */}
        <div className="px-4 md:px-10 py-12 flex justify-center w-full">
          <div className="max-w-7xl w-full flex flex-col gap-12">
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: 'wifi', title: 'Free 5G Wi-Fi', subtitle: 'Fiber optic speed' },
                { icon: 'location_on', title: 'Prime Location', subtitle: 'Heart of Bueng Kan' },
                { icon: 'local_parking', title: 'Secure Parking', subtitle: '24/7 Surveillance' },
                { icon: 'support_agent', title: '24/7 Service', subtitle: 'Always here to help' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-surface-dark border border-border-dark p-5 rounded-2xl flex flex-col gap-3 hover:border-primary/50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{feature.title}</h3>
                    <p className="text-text-secondary text-xs mt-1">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rooms Section */}
            <div id="rooms" className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Available Rooms</h2>
                <a href="#" className="text-primary text-sm font-bold hover:underline">View All Rooms</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Room Card 1 */}
                <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                  <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJbVHyGYOEkQpEmdY-P1hFxj1ByMuG5mEoVLtg2_OsnROohmACxm7Jk9DPdDW0mbFm4E0X9tXmjSemXkWYhdHVsyaUzaVOMZMUdTHW0VHd-O1fJEKm0G_DeJ-pQwSg21C9ZpB7Tbu-OqJIv2yn0qpZU2dniR1NslI0P_x7vMZIAa8yQ1Ek7Jokgq9qBelSWW3ov_5SCy429sDmXJPwxvvrpUrYiZMVVEAuf2AhdphN5riOtMaRhv1EXbXrbujOdimq389BaMZLxq8I")'}}>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-yellow-400">star</span> 4.9
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Deluxe King Suite</h3>
                        <p className="text-primary font-bold">฿1,200</p>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">1 King Bed • 32 sqm • {getAvailability('Deluxe King')}</p>
                    </div>
                    <div className="flex gap-2 text-text-secondary">
                      <span className="material-symbols-outlined text-[18px]">wifi</span>
                      <span className="material-symbols-outlined text-[18px]">tv</span>
                      <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                      <span className="material-symbols-outlined text-[18px]">shower</span>
                    </div>
                    <button 
                      onClick={() => handleBook('Deluxe King')}
                      className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Room Card 2 */}
                <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                  <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAS_aGJO9cJsPLgFf6FR0fmQaCE2krrdHv15eme2CKdrwLG3XYYP7xHDJ4nOYmW95J0KZTjwviEKg4CH4AV2GWX1r98KY14sCGuWyMely-KlshuENemt3J1nK8z-NEysklr0N9vHM_25GbYSqZyR5Vh7SZvEi3mejUu5q6wr3pCiP86EFYeJShJY4vh9Qmxt-NBtsw15PMiDJldew-gZ5m-XG2E0SrfE3LjShW5wTtdERTcNukFKLHdKp6iliLdnK-VDyw1GZOA88F8")'}}>
                    <div className="absolute top-3 right-3 bg-red-500 px-2 py-1 rounded-lg text-xs font-bold text-white">Promo -10%</div>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Standard Twin</h3>
                        <div className="flex flex-col items-end">
                          <p className="text-primary font-bold">฿800</p>
                          <p className="text-xs text-text-secondary line-through">฿890</p>
                        </div>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">2 Single Beds • 24 sqm • {getAvailability('Standard Twin')}</p>
                    </div>
                    <div className="flex gap-2 text-text-secondary">
                      <span className="material-symbols-outlined text-[18px]">wifi</span>
                      <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                    </div>
                    <button 
                       onClick={() => handleBook('Standard Twin')}
                       className="w-full py-2.5 rounded-xl bg-surface-dark border border-border-dark text-white hover:bg-white hover:text-black text-sm font-bold transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Room Card 3 */}
                <div className="bg-surface-dark rounded-2xl overflow-hidden border border-border-dark hover:shadow-2xl hover:shadow-primary/5 transition-all group">
                  <div className="h-48 bg-cover bg-center relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARTW3mheULqD-vAN1DvwOw-K15OSnqHWLOydvKwIKpBEs1b4iBUtLMho7f8NY4wX1kDhhZLj4w7x7hy2PbkTKhdhKv7cLgwlPG6ccWw2LnF2fDsOJii3aJt4PbytoBoJeaXoh3jtLoFF3_ZeKPhwHL1m_22dbLyzAI8xcuG9VjuxQSnffD_wc7L7TBpnlhm6G9NEEirr-3Rty3-nOFKlZb8pBKcRAURHZXI3jhYorGmD6reVzClxsUD3Ta-0mPEqeqS48HjNntGLyJ")'}}>
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">Family Suite</h3>
                        <p className="text-primary font-bold">฿1,800</p>
                      </div>
                      <p className="text-text-secondary text-sm mt-1">2 Queen Beds • 4 Guests • {getAvailability('Family Suite')}</p>
                    </div>
                    <div className="flex gap-2 text-text-secondary">
                       <span className="material-symbols-outlined text-[18px]">wifi</span>
                       <span className="material-symbols-outlined text-[18px]">tv</span>
                       <span className="material-symbols-outlined text-[18px]">kitchen</span>
                       <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                    </div>
                    <button 
                       onClick={() => handleBook('Family Suite')}
                       className="w-full py-2.5 rounded-xl bg-surface-dark border border-border-dark text-white hover:bg-white hover:text-black text-sm font-bold transition-colors"
                    >
                       View Details
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map */}
            <div className="w-full h-80 rounded-2xl overflow-hidden relative border border-border-dark">
              <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZmzE_F6oC6i8LwzjKUDokm99jyNkJQ9RKO8bMSWMzhig_rGyENN0h5PmbjSef-s192YqbDZLHAXhn_dXq24Rk72E8NHhmP10j2Sv8Scx5NqpzXuVWI2_M7CNxj5ix1Zbi4KHtyrpmkUKgkjgYbwWyBZdwsZ2WjZL-Mc6fqTv2qKhReHnKgjRXHREd9j7AmveoxCoKgc-bikySIdA-xat5d7ePE7mHxX7S2e7SxUFB2PzlgSbzqNj22D_8ES3kInb-cCGhmCoqSahA" alt="Map" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
              <div className="absolute bottom-6 left-6 max-w-sm">
                <h3 className="text-white text-xl font-bold">Wipatkanjak Hotel</h3>
                <p className="text-text-secondary text-sm mb-4">123 Mekong Road, Bueng Kan City, 38000</p>
                <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg flex items-center gap-2 hover:bg-gray-200">
                  <span className="material-symbols-outlined text-[18px]">directions</span> Get Directions
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuestHome;

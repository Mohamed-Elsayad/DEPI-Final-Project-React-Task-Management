import { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Users, BarChart3, Clock, ArrowRight, Menu, X, User, ArrowUp } from 'lucide-react';
import AuthModal from '../components/Auth/AuthModal';
import Logo from '../Graphics/Logo4.svg';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';

export default function PlanifyLandingPage({ onLogin }) {
  const navigate = useNavigate();
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Scroll effect for navbar and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth handlers
  const handleLogin = async (formData) => {
    try {
      setError('');
      const response = await authApi.login({
        username: formData.email,
        password: formData.password
      });
      
      if (response.user) {
        setCurrentUser(response.user);
        onLogin(response.user);
        setAuthModal(null);
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (formData) => {
    try {
      setError('');
      const response = await authApi.register({
        username: formData.email,
        password: formData.password
      });
      
      if (response.user) {
        setCurrentUser(response.user);
        onLogin(response.user);
        setAuthModal(null);
        navigate('/home');
      }
    } catch (err) {
      // Show more detailed error if available
      let message = err.message;
      if (err.response && err.response.data) {
        message = err.response.data.message || JSON.stringify(err.response.data);
      }
      setError(message || 'Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    onLogin(null);
    navigate('/landing');
  };

  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-emerald-600" />,
      title: "Smart Calendar",
      description: "Visualize your schedule with our intelligent calendar that adapts to your workflow patterns."
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Team Collaboration",
      description: "Connect with teammates in real-time with shared workspaces and project tracking."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-emerald-600" />,
      title: "Productivity Analytics",
      description: "Gain insights into your productivity patterns with detailed metrics and suggestions."
    },
    {
      icon: <Clock className="h-8 w-8 text-emerald-600" />,
      title: "Time Tracking",
      description: "Automatically track time spent on tasks to improve your focus and efficiency."
    }
  ];
  
  const testimonials = [
    {
      text: "Planify transformed how our design team collaborates. We've reduced meeting time by 40% while improving our project delivery rates.",
      name: "Sarah Chen",
      role: "Design Director, Artwave"
    },
    {
      text: "As a freelancer juggling multiple clients, Planify helps me stay organized and focused. The time tracking feature is a game-changer for billing.",
      name: "Marcus Johnson",
      role: "Independent Developer"
    },
    {
      text: "Our remote team struggled with coordination until we found Planify. Now our workflow is seamless despite being across five time zones.",
      name: "Elena Rodriguez",
      role: "Project Manager, TechFlow"
    },
    {
      text: "The analytics dashboard helped us identify bottlenecks in our process that we didn't even know existed. Our productivity has increased by 25%.",
      name: "David Park",
      role: "Operations Lead, StartupX"
    },
    {
      text: "Planify's intuitive interface meant our team needed minimal training. Everyone was up and running within a day, which was impressive.",
      name: "Aisha Washington",
      role: "Team Lead, InnovateCorp"
    },
    {
      text: "The custom workflow templates saved us countless hours. We now onboard new team members in half the time it used to take.",
      name: "Thomas Schmidt",
      role: "HR Manager, GlobalTech"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-400 to-emerald-500">
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-emerald-600 shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2 group">
                <img src={Logo} alt="Planify Logo" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-white font-bold text-2xl group-hover:text-emerald-100 transition-colors">Planify</span>
              </a>
              
              <div className="hidden md:flex ml-12 space-x-8">
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="text-white hover:text-emerald-100 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-100 after:transition-all">Home</a>
                <a href="#about-planify" onClick={(e) => { e.preventDefault(); scrollToSection('about-planify'); }} className="text-white hover:text-emerald-100 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-100 after:transition-all">About Planify</a>
                <a href="#why-us" onClick={(e) => { e.preventDefault(); scrollToSection('why-us'); }} className="text-white hover:text-emerald-100 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-100 after:transition-all">Why Us</a>
                <a href="#feedbacks" onClick={(e) => { e.preventDefault(); scrollToSection('feedbacks'); }} className="text-white hover:text-emerald-100 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-emerald-100 after:transition-all">Feedbacks</a>
              </div>
            </div>
            
            {/* Auth buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <div className="flex items-center space-x-2 text-white">
                    <User className="h-5 w-5" />
                    <span>{currentUser.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-emerald-600 px-5 py-2 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => setAuthModal('login')}
                    className="text-white hover:text-emerald-100 font-medium"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => setAuthModal('register')}
                    className="bg-white text-emerald-600 px-5 py-2 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-md"
                  >
                    Register
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-3">
              <div className="flex flex-col space-y-3">
                <a href="#product" className="text-white hover:bg-emerald-600 px-3 py-2 rounded-md font-medium">Product</a>
                <a href="#company" className="text-white hover:bg-emerald-600 px-3 py-2 rounded-md font-medium">Company</a>
                <a href="#blog" className="text-white hover:bg-emerald-600 px-3 py-2 rounded-md font-medium">Blog</a>
                <a href="#resources" className="text-white hover:bg-emerald-600 px-3 py-2 rounded-md font-medium">Resources</a>
                
                {currentUser ? (
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-emerald-600 px-3 py-2 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-md mt-2 self-start"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setAuthModal('login');
                        setMobileMenuOpen(false);
                      }}
                      className="text-white hover:bg-emerald-600 px-3 py-2 rounded-md font-medium"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        setAuthModal('register');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-white text-emerald-600 px-3 py-2 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-md mt-2 self-start"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal 
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(mode) => setAuthModal(mode)}
          onSubmit={authModal === 'login' ? handleLogin : handleRegister}
          error={error}
        />
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
            YOUR WORKFLOW IS UNIQUE, SIMPLIFY IT IN ONE PLACE
          </h1>
          <p className="text-white text-xl mb-10 max-w-2xl mx-auto animate-slide-up delay-100">
            Boosting Productivity and Achieving Goals Through Smart Workflow Management
          </p>
          <button 
            onClick={() => currentUser ? navigate('/home') : setAuthModal('register')}
            className="bg-white text-emerald-600 px-8 py-3 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-lg text-lg flex items-center mx-auto group animate-slide-up delay-200"
          >
            {currentUser ? 'Go to Dashboard' : 'Get Started'}
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="about-planify" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-emerald-600 bg-opacity-90 rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">About Planify</h2>
            <p className="text-emerald-50 text-lg mb-6">
              Planify is more than just a task manager. It's a comprehensive workflow solution designed to adapt to your unique needs, whether you're a solo freelancer or managing enterprise teams.
            </p>
            <p className="text-emerald-50 text-lg mb-8">
              Our platform combines powerful scheduling tools, collaborative workspaces, and insightful analytics to help you work smarter, not harder.
            </p>
            <button className="bg-white text-emerald-600 px-5 py-3 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-md flex items-center">
              Learn More
              <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-3 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <img 
              src={require('../Graphics/1.png')}
              alt="Planify calendar interface" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-emerald-50 bg-opacity-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Powerful Features For Your Workflow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section id="why-us" className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Why Teams Choose Planify</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-white mb-2">95%</span>
                <p className="text-emerald-100">Report improved team coordination</p>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-white mb-2">32%</span>
                <p className="text-emerald-100">Average productivity increase</p>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-5xl font-bold text-white mb-2">5hrs</span>
                <p className="text-emerald-100">Saved per week per team member</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="feedbacks" className="px-4 sm:px-6 lg:px-8 py-16 bg-emerald-50 bg-opacity-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                    <span className="text-emerald-600 font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 group-hover:text-emerald-600 transition-colors">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-white text-xl mb-8">
              Join thousands of teams already using Planify to streamline their productivity.
            </p>
            <button 
              onClick={() => currentUser ? navigate('/home') : setAuthModal('register')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-md font-medium hover:bg-emerald-50 transition-all shadow-lg text-lg flex items-center mx-auto group"
            >
              {currentUser ? 'Go to Dashboard' : 'Get Started'}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-500 transition-all duration-300 transform hover:-translate-y-1 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-black text-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6 group">
                <img src={Logo} alt="Planify Logo" className="h-7 w-7 mr-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-emerald-400 font-bold text-2xl group-hover:text-emerald-300 transition-colors">Planify</span>
              </div>
              
              <p className="text-gray-300 mb-6">
                Simplify your workflow, increase productivity, and achieve your goals with our all-in-one platform.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Planify Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
              <a href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
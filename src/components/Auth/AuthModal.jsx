import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgetPasswordForm from './ForgetPasswordForm';

export default function AuthModal({ mode, onClose, onSwitchMode, onSubmit, error }) {
  const getTitle = () => {
    switch (mode) {
      case 'login':
        return 'Welcome Back';
      case 'register':
        return 'Create Account';
      case 'forget-password':
        return 'Reset Password';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-600 transition-all duration-300 transform">
            {getTitle()}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <div className="relative overflow-hidden">
          <div 
            className={`transition-all duration-500 ease-in-out transform ${
              mode === 'login' 
                ? 'translate-x-0 opacity-100' 
                : '-translate-x-full opacity-0 absolute inset-0'
            }`}
          >
            <LoginForm 
              onSubmit={onSubmit}
              onSwitchMode={onSwitchMode}
            />
          </div>
          <div 
            className={`transition-all duration-500 ease-in-out transform ${
              mode === 'register' 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0 absolute inset-0'
            }`}
          >
            <RegisterForm 
              onSubmit={onSubmit}
              onSwitchMode={onSwitchMode}
            />
          </div>
          <div 
            className={`transition-all duration-500 ease-in-out transform ${
              mode === 'forget-password' 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-full opacity-0 absolute inset-0'
            }`}
          >
            <ForgetPasswordForm 
              onSubmit={onSubmit}
              onSwitchMode={onSwitchMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect } from 'react';

export default function AuthCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const onboarding = params.get('onboarding');
    
    if (token) {
      localStorage.setItem('fitoglobe_token', token);
      // Try to open app via deep link
      window.location.href = `com.fitoglobe.app://oauth?token=${token}&onboarding=${onboarding}`;
      // Fallback for web — redirect to home after 1s
      setTimeout(() => { window.location.href = '/'; }, 1000);
    }
  }, []);

  return (
    <div style={{ background:'#07070E', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'DM Sans' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
        <div>Signing you in...</div>
      </div>
    </div>
  );
}
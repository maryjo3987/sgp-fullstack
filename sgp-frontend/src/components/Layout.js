import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
      paddingTop: '20px'
    }}>

      <div className="container">

        <Navbar />

        <div
          className="card shadow p-4"
          style={{
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;
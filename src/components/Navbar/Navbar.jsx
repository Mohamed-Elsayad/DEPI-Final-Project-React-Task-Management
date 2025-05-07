import React, { useState, useEffect } from 'react';
import { Navbar, Form, Button, InputGroup, Dropdown, Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { BiSearch, BiUserCircle, BiPlusCircle, BiLogOut } from 'react-icons/bi';

const CustomNavbar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const currentDate = format(new Date(), 'EEEE, d MMMM yyyy');

 
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    setSearchQuery(searchTerm);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };

  return (
    <Navbar bg="white" fixed="top" expand="lg" className={`shadow-sm ${styles.navbar}`}>
      <Container fluid>
        <Navbar.Brand 
          href="/" 
          className={`fw-bold text-primary ${styles.brand}`}
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          Planify
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" className={styles.navbarToggle} />

        <Navbar.Collapse id="navbar-content" className="justify-content-between">
          <Form onSubmit={handleSearch} className={`mx-lg-3 my-2 my-lg-0 flex-grow-1 ${styles.searchForm}`}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search tasks, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`rounded-pill ${styles.searchInput}`}
                aria-label="Search tasks"
              />
              <Button 
                variant="outline-primary" 
                type="submit"
                className={`rounded-pill ${styles.searchButton}`}
                aria-label="Search"
              >
                <BiSearch className="me-1" /> Search
              </Button>
            </InputGroup>
          </Form>

          <div className={`d-flex align-items-center ${styles.rightSection}`}>
            <span className={`me-3 d-none d-lg-block ${styles.dateText}`}>{currentDate}</span>
            
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="light" 
                  id="dropdown-user" 
                  className={`d-flex align-items-center ${styles.userDropdown}`}
                  aria-label="User menu"
                >
                  <span className={`me-2 ${styles.username}`}>{user.name}</span>
                  <BiUserCircle size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item 
                    onClick={() => navigate('/add-task')}
                    className={styles.dropdownItem}
                  >
                    <BiPlusCircle className="me-2" /> Add Task
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                    onClick={handleLogout}
                    className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  >
                    <BiLogOut className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate('/register')}
                  className={`me-2 ${styles.authButton}`}
                >
                  Register
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/login')}
                  className={styles.authButton}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
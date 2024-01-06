import { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';

import './style.scss';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/movix-logo.svg';

const Header = () => {
  const [show, setShow] = useState('top');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    // console.log(currentScrollY);
    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !mobileMenu) {
        setShow('hide');
      } else {
        setShow('show');
      }
    } else {
      setShow('top');
    }
    setLastScrollY(currentScrollY);
    // console.log(lastScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const searchQueryHandler = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 500);
    }
  };
  const navigationHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie');
    }
    if (type === 'tv') {
      navigate('/explore/tv');
    }
    setMobileMenu(false);
  };

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <header className={`header ${mobileMenu && 'mobileView'} ${show}`}>
      <ContentWrapper>
        <div
          className='logo'
          onClick={handleLogoClick}>
          <img
            src={logo}
            alt='logo'
          />
        </div>
        <ul className='menuItems'>
          <li
            className='menuItem'
            onClick={() => navigationHandler('movie')}>
            Movies
          </li>
          <li
            className='menuItem'
            onClick={() => navigationHandler('tv')}>
            Tv Shows
          </li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className='mobileMenuItems'>
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className='searchBar'>
          <ContentWrapper>
            <div className='searchInput'>
              <input
                type='text'
                placeholder='Search for a movie or tv show...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
            </div>
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoImage from './pngwing.com.png';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='logo'>
				<Link to='/'>
					<img className='logo-img' src={logoImage} alt='Logo' />{' '}
				</Link>
			</div>
			<ul className='nav-links'>
				<li>
					<Link to='/'>Главная</Link>
				</li>
				<li>
					<Link to='/game'>Карточки</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;

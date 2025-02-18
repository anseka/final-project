import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>My App</Link>
			</div>
			<nav>
				<ul className='nav-links'>
					<li>
						<Link to='/'>Главная</Link>
					</li>
					<li>
						<Link to='/game'>Карточки</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

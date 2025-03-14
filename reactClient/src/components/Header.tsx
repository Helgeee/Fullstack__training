import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'
import { logout } from '../store/user/userSlice'

const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutHandler = async () => {
		dispatch(logout())
		removeTokenFromLocalStorage('token')
		toast.success('Logged out successfully')
		navigate('/')
	}

	return (
		<header className="flex items-center bg-slate-800 px-4 py-2 shadow-sm backdrop-blur-sm">
			<Link to="/" aria-label="Home">
				<FaBtc size={20} />
			</Link>
			{/* Menu */}
			{isAuth && (
				<nav className="ml-auto mr-10">
					<ul className="flex items-center gap-5">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/transactions"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/categories"
								className={({ isActive }) =>
									isActive ? 'text-white' : 'text-white/50'
								}
							>
								Categories
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button
					className="btn btn-red"
					onClick={logoutHandler}
					aria-label="Log Out"
				>
					<span>Log Out</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="py-2 text-white/50 hover:text-white ml-auto mr-10"
					to="/auth"
					aria-label="Log In / Sign In"
				>
					Log In / Sign In
				</Link>
			)}
		</header>
	)
}
export default Header

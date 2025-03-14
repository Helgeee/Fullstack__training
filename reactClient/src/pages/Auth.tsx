import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/user/userSlice'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(false)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	interface ApiError {
		response?: {
			data: {
				message: string
			}
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.login({ email, password })
			if (data) {
				setTokenToLocalStorage('token', data.token)
				dispatch(login(data))
				toast.success('Вы вошли в аккаунт')
				navigate('/')
			}
		} catch (err) {
			// Используйте тип ApiError
			const error =
				(err as ApiError).response?.data.message || 'Ошибка регистрации'
			toast.error(error)
		}
	}

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()
			const data = await AuthService.registration({ email, password })
			if (data) {
				toast.success('Аккаунт создан.')
				setIsLogin(!isLogin)
			}
		} catch (err) {
			// Используйте тип ApiError
			const error =
				(err as ApiError).response?.data.message || 'Ошибка регистрации'
			toast.error(error)
		}
	}

	return (
		<div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
			<h1 className="text-center text-xl mb-10">
				{isLogin ? 'Login' : 'Registration'}
			</h1>

			<form
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className="mx-auto flex w-1/3 flex-col  gap-5"
			>
				<input
					type="text"
					className="input"
					placeholder="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className=" btn btn-green mx-auto">Submit</button>
			</form>

			<div className=" flex justify-center mt-5">
				{isLogin ? (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						You don't have an account
					</button>
				) : (
					<button
						onClick={() => setIsLogin(!isLogin)}
						className="text-slate-300 hover:text-white"
					>
						Already have an account
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth

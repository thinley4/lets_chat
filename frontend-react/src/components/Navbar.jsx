const Navbar = () => {
    return (
        <nav className="bg-black text-white fixed w-full">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <a href="/" className="text-white">Chat</a>
                </div>
                <div>
                    <a href="/login" className="text-white">Login</a>
                    <a href="/register" className="text-white ml-4">Register</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
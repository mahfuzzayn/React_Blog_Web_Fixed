import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
    const authStatus = useSelector((state) => state.auth.status);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!authStatus);
    }, [authStatus, isAuthenticated]);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !isAuthenticated,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isAuthenticated,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: isAuthenticated,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: isAuthenticated,
        },
    ];

    return (
        <header className="py-3 shadow bg-blue-600">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    <ul className="flex ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li className="mr-4" key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {isAuthenticated && (
                            <li className="bg-red-600 text-white rounded-full">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Navbar;

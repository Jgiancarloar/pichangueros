import { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar className="bg-green-400" shadow="lg">
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-bold text-black">PICHANGUEROS</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="white" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link color="white" href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="white" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
            </NavbarContent>

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link
                        color="white"
                        className="w-full"
                        href="/"
                        size="lg"
                    >
                        Inicio
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};

export default NavBar;

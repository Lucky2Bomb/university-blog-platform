import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavbarItemProps {
    href: string;
    text: string;
    className: string;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ href, text, className }) => {
    const router = useRouter();
    return (
        <Link href={href}>
            <a className={className}>{text}</a>
        </Link>
    )
}

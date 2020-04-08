import * as React from 'react';

export interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {

    return (
        <div className="header-container">
            <h1 className="text-primary">HEADER: {props.title}</h1>
        </div>
    )
}
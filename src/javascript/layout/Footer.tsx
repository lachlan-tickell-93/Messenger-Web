import * as React from 'react';

export interface FooterProps {
    title: string
}

export default function Footer(props: FooterProps) {

    return (
        <div className="footer-container">
            <h1>{props.title}</h1>
        </div>
    )
}
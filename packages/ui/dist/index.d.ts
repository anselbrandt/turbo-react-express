import * as React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
    href: string;
}
declare function Link(props: LinkProps): JSX.Element;

export { Link };

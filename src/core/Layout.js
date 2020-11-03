import React from "react";
import Menu from "./Menu";
import "../styles.css";

// we create a component with props that we can pass values to
// from any other pages that we use it to dynamically display contents
// here, we give it default values
const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;

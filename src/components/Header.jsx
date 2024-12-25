import React from "react";
import "./style.css";


const Header = () => {
    return (
        <>
            <div className="head">
                <div className="main">
                    <img src="/favicon.ico" alt="" className="logo" />
                    <h2 className="text">TodoApp</h2>
                </div>
                <ul className="head-zone">
                    <a href="/">
                        <li>Home</li>
                    </a>
                    <a href="https://github.com/Susmita-Maity" target="_blank">
                        <li>Github</li>
                    </a>
                    <a href="https://linkedin.com/in/susmita-maity-9b7b58286" target="_blank">
                        <li>Linkedin</li>
                    </a>
                </ul>
            </div>
        </>
    );
};

export default Header;
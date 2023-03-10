import "./Iterations.scss";

// libraries
import React, { useState } from "react";

export default function Iterations({ iterations, setIterations }) {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [hover, setHover] = useState(false);

    // arr of numbers to iterate through
    const allNumbers = [{ amount: 1 }, { amount: 2 }, { amount: 3 }, { amount: 4 }, { amount: 5 }];

    // filter out the current iteration
    const filteredNumbers = allNumbers.filter((item) => {
        return item.amount !== iterations;
    });

    return (
        <div
            className="iterations"
            onMouseEnter={() => setToggleDropdown(true)}
            onMouseLeave={() => setToggleDropdown(false)}
            onClick={() => setToggleDropdown(false)}
        >
            <p
                className="iterations__current"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {iterations}
            </p>
            {toggleDropdown && (
                <div className="iterations__box">
                    {filteredNumbers.map((item) => {
                        return (
                            <p
                                className="iterations__box-indv"
                                onClick={() => setIterations(item.amount)}
                            >
                                {item.amount}
                            </p>
                        );
                    })}
                </div>
            )}
            {hover && (
                <div className="iterations__hover">
                    <p className="iterations__hover-indv">Iterations</p>
                </div>
            )}
        </div>
    );
}

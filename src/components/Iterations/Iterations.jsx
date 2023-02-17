import "./Iterations.scss";

// libraries
import React, { useState } from "react";

export default function Iterations({ iterations, setIterations }) {
    const [toggleDropdown, setToggleDropdown] = useState(false);

    const allNumbers = [
        {
            amount: 1,
        },
        {
            amount: 2,
        },
        {
            amount: 3,
        },
        {
            amount: 4,
        },
        {
            amount: 5,
        },
    ];

    const filteredNumbers = allNumbers.filter((item) => {
        return item.amount !== iterations;
    });

    return (
        <div className="iterations" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <p className="iterations__current">{iterations}</p>
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
        </div>
    );
}

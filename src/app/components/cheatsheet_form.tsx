'use client'

import React, { ChangeEvent, useState, FormEvent } from 'react';

interface CheatsheetFormProps {
    onSubmit: (title: string, logoImage: string) => void
}

const orientationOptions = ['Vertical', 'Horizontal'];

const pageSizes = [
    "Unlimited", // the default option
    "Letter (US), 8.5 x 11",
    "Legal (US), 8.5 x 14",
    "A4, 8.3 x 11.7",
    "A5, 5.8 x 8.3"
];
const pageSizeOptions = pageSizes.map((size, index) => <option key={index}>{size}</option>);

const CheatsheetForm = (props: CheatsheetFormProps) => {
    const [orientation, setOrientation] = useState('Vertical');
    const [pageSize, setPageSize] = useState(pageSizes[0]);
    const [columnNumber, setColumnNumber] = useState(3);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    const handleOrientationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOrientation(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            {/** Select Horizontal or Vertical */}
            <div className='form-control'>
                <div className="join join-horizontal space-x-4">
                    {orientationOptions.map((opt, idx) => <label key={idx} className="label space-x-2 join-item">
                        <span className="label-text">{opt}</span>
                        <input
                            type="radio"
                            value={opt}
                            checked={orientation === opt}
                            onChange={handleOrientationChange}
                            className="radio-sm text-blue-500"
                        />
                    </label>)}
                </div>
            </div>

            {/** Editor Page Size Dropdown */}
            <div className='form-control'>
                <label className="label space-x-4">
                    <span className="label-text">Layout</span>
                    <select className="select select-sm" defaultValue={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                        {pageSizeOptions}
                    </select>
                </label>
            </div>

            {/** Column Number.
             * TODO: If vertical, only 1~3 should be allowed. Horizontal allows 1-5.*/}
            <div className='form-control'>
                <label className="label space-x-4">
                    <span className="label-text">Columns</span>
                    <select className="select select-sm" defaultValue={columnNumber} onChange={(e) => setColumnNumber(parseInt(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((num, idx) => <option key={idx}>{num}</option>)}
                        <option>Unlimited</option>
                    </select>
                </label>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create
            </button>

            <p>
                {orientation}, {pageSize}, {columnNumber}
            </p>
        </form>
    );
};

export default CheatsheetForm;
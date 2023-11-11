'use client'

import React, { ChangeEvent, useState, FormEvent } from 'react';

const CheatsheetForm = () => {
    const [title, setTitle] = useState('');
    const [logoImage, setLogoImage] = useState('');

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleLogoImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLogoImage(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Perform actions when the "Create" button is clicked.
        // You can access the 'title' and 'logoImage' values here.
        console.log('Title:', title);
        console.log('Logo Image:', logoImage);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder='Enter the title of your cheatsheet'
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Logo</span>
                </label>
                <input
                    type="file"
                    className="file-input file-input-bordered"
                    value={logoImage}
                    onChange={handleLogoImageChange}
                />

                <label className="label">
                    <span className="label-text-alt">Only accept PNG</span>
                </label>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
            >
                Create
            </button>
        </form>
    );
};

export default CheatsheetForm;
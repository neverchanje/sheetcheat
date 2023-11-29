import { LayoutType, PageSizeType, ProjectMetadata, initLayoutType, initPageSizeType } from '@/config';
import Image from 'next/image'
import { RefObject, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import { CgMenuGridR } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { FaMarkdown } from "react-icons/fa";
import MarkdownEditor from './MarkdownEditor';

function ExportToPNGButton(props: {
    sheetRef: RefObject<HTMLDivElement>,
}) {
    const onClickExportToPNG = () => {
        exportComponentAsPNG(props.sheetRef, {
            fileName: 'cheatsheet.png',
            html2CanvasOptions: {
                backgroundColor: null,
                removeContainer: true
            },
        })
    }
    return (
        <button className="btn btn-sm btn-outline normal-case" onClick={onClickExportToPNG}>
            Export to PNG
        </button>
    );
}

export default function NavBar(props: {
    // The ref of the cheatsheet to export.
    sheetRef: RefObject<HTMLDivElement>,
    setPageSizeType: (pageSizeType: string) => void,
    setLayoutType: (layoutType: string) => void,
    setMarkdown: (content: string) => void,
}) {
    const layoutSelect = (
        <div className="tooltip tooltip-bottom" data-tip="Layout">
            <select
                defaultValue={initLayoutType()}
                className="select select-sm select-bordered"
                onChange={(e) => { props.setLayoutType(e.target.value); }}
            >
                {Object.keys(LayoutType).map((layout) => (
                    <option key={layout} value={layout}>{layout}</option>
                ))}
            </select>
        </div>
    );

    const pageSizeSelect = (
        <div className="tooltip tooltip-bottom" data-tip="Page Size">
            <select
                defaultValue={initPageSizeType()}
                className="select select-sm select-bordered"
                onChange={(e) => { props.setPageSizeType(e.target.value); }}
            >
                {Object.keys(PageSizeType).map((pageSize) => (
                    <option key={pageSize} value={pageSize}>{pageSize}</option>
                ))}
            </select>
        </div>
    );

    const githubBadge = (
        <a
            href={ProjectMetadata.githubRepo}
            target="_blank"  // Open the link in a new tab
            rel="noopener noreferrer"  // Recommended for security when using target="_blank"
            className='btn btn-ghost text-2xl'
        >
            {/* <Image
                src={ProjectMetadata.githubRepoBadgeURL}
                alt="Github Repo Stars"
                width={100}
                height={50}
                unoptimized  // Use this prop if you're facing issues with external URLs
            /> */}
            <FaGithub />
        </a>
    );

    const projectTitle = (
        <a className="btn btn-ghost normal-case text-xl">{ProjectMetadata.title}</a>
    );

    const markdownRef = useRef<HTMLDialogElement>(null);
    const markdownToggleButton = (
        <button className='btn btn-outline btn-sm' onClick={() => { markdownRef.current?.showModal() }}>
            <span className='text-2xl'><FaMarkdown /></span>
        </button>
    );
    const markdown = (
        <dialog ref={markdownRef} className='w-screen h-screen inset-0 z-50 p-4 modal'>
            <div className="modal-box w-full h-full max-w-full max-h-full">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-circle btn-ghost absolute right-2 top-2 text-lg z-50">✕</button>
                </form>
                <MarkdownEditor setMarkdown={props.setMarkdown} />
            </div>
        </dialog>
    );

    const menuToggleButton = (
        <label htmlFor="sidebar-toggle" aria-label="open sidebar" className="btn btn-ghost lg:hidden">
            <span className='text-2xl'><CgMenuGridR /></span>
        </label>
    );

    const sidebar = (
        <div className="drawer-side">
            <label htmlFor="sidebar-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
                {/* Sidebar content here */}
                <li><a>{pageSizeSelect}</a></li>
                <li><a>{layoutSelect}</a></li>
            </ul>
        </div>
    );

    return (
        <div className="drawer">
            <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />
            <input id="markdown-toggle" type="checkbox" className="drawer-toggle" />

            <div className='drawer-content'>
                <div className="navbar w-full">
                    <div className="navbar-start gap-1">
                        {menuToggleButton}
                        {projectTitle}
                        {githubBadge}
                    </div>
                    <div className="navbar-center gap-4 hidden lg:flex">
                        {pageSizeSelect}
                        {layoutSelect}
                    </div>
                    <div className="navbar-end gap-4 mr-4">
                        {markdownToggleButton}
                        <ExportToPNGButton sheetRef={props.sheetRef} />
                    </div>
                </div >
            </div>

            {sidebar}
            {markdown}
        </div>
    )
}

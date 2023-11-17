import Config from "@/config";
import Image from 'next/image'
import { RefObject } from "react";
import { exportComponentAsPNG } from "react-component-export-image";

export default function NavBar(props: {
    // The ref of the cheatsheet to export.
    sheetRef: RefObject<HTMLDivElement>,
    setPageSize: (pageSize: string) => void,
}) {
    return (
        <div className="navbar">
            {/** the logo */}
            <div className="navbar-start gap-3">
                <a className="btn btn-ghost normal-case text-xl">{Config.projectMetadata.title}</a>

                <a
                    href={Config.projectMetadata.githubRepo}
                    target="_blank"  // Open the link in a new tab
                    rel="noopener noreferrer"  // Recommended for security when using target="_blank"
                >
                    <Image
                        src={Config.projectMetadata.githubRepoBadgeURL}
                        alt="Github Repo Stars"
                        width={100}
                        height={50}
                        unoptimized  // Use this prop if you're facing issues with external URLs
                    />
                </a>
            </div>

            <div className="navbar-center">
                <label className="label mx-3">
                    <span className="label-text">Page Size</span>
                </label>
                <select
                    defaultValue={Config.defaultPageSize}
                    className="select select-sm select-bordered"
                    onChange={(e) => { props.setPageSize(e.target.value) }}
                >
                    {Object.keys(Config.pageSizes).map((pageSize) => (
                        <option key={pageSize} value={pageSize}>{pageSize}</option>
                    ))}
                </select>
            </div>

            <div className="navbar-end gap-4">
                <button className="btn normal-case" onClick={() => {
                    exportComponentAsPNG(props.sheetRef, {
                        fileName: 'cheatsheet.png',
                        html2CanvasOptions: {
                            backgroundColor: null,
                            removeContainer: true
                        },
                    })
                }}>
                    Export to PNG
                </button>
            </div>

        </div >
    )
}

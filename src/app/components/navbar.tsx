import { LayoutType, PageSizeType, ProjectMetadata, defaultLayoutType, defaultPageSizeType } from '@/config';
import Image from 'next/image'
import { RefObject } from "react";
import { exportComponentAsPNG } from "react-component-export-image";

export default function NavBar(props: {
    // The ref of the cheatsheet to export.
    sheetRef: RefObject<HTMLDivElement>,
    setPageSizeType: (pageSizeType: string) => void,
    setLayoutType: (layoutType: string) => void,
}) {
    return (
        <div className="navbar">
            {/** the logo */}
            <div className="navbar-start gap-3">
                <a className="btn btn-ghost normal-case text-xl">{ProjectMetadata.title}</a>

                <a
                    href={ProjectMetadata.githubRepo}
                    target="_blank"  // Open the link in a new tab
                    rel="noopener noreferrer"  // Recommended for security when using target="_blank"
                >
                    <Image
                        src={ProjectMetadata.githubRepoBadgeURL}
                        alt="Github Repo Stars"
                        width={100}
                        height={50}
                        unoptimized  // Use this prop if you're facing issues with external URLs
                    />
                </a>
            </div>

            <div className="navbar-center gap-4">
                <div className="tooltip tooltip-bottom" data-tip="Page Size">
                    <select
                        defaultValue={defaultPageSizeType()}
                        className="select select-sm select-bordered"
                        onChange={(e) => { props.setPageSizeType(e.target.value); }}
                    >
                        {Object.keys(PageSizeType).map((pageSize) => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="Layout">
                    <select
                        defaultValue={defaultLayoutType()}
                        className="select select-sm select-bordered"
                        onChange={(e) => { props.setLayoutType(e.target.value); }}
                    >
                        {Object.keys(LayoutType).map((layout) => (
                            <option key={layout} value={layout}>{layout}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="navbar-end gap-4 mr-4">
                <button className="btn btn-sm btn-outline normal-case" onClick={() => {
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

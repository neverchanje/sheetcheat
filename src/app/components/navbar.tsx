import { ProjectMetadata } from "@/config";
import Image from 'next/image'

export default function NavBar(props: { exportToPNG: () => void }) {
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

            <div className="navbar-end gap-3">
                <button className="btn btn-ghost normal-case" onClick={props.exportToPNG}>
                    Export to PNG
                </button>
            </div>

        </div >
    )
}

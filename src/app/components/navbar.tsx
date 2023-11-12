import { ProjectMetadata } from "../config";
import Image from 'next/image'

export default function NavBar() {
    const exportTypes = [
        "PDF", // the default option
        "HTML",
        "PNG",
        "Awesome Cheatsheet"
    ];
    const exportOptions = exportTypes.map((size, index) => <option key={index}>{size}</option>);

    return (
        <div className="navbar">
            {/** the logo */}
            <div className="navbar-start">
                <ul className="menu menu-horizontal flex items-center gap-3">

                    {/**TBD: And-more Drawer */}

                    {/** Logo */}
                    <li><a className="btn btn-ghost normal-case text-xl">{ProjectMetadata.title}</a></li>

                    {/** Github Badge */}
                    <li>
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
                    </li>
                </ul>
            </div>

            <div className="navbar-end">
                <ul className="menu menu-horizontal gap-3">
                    {/** Export Dropdown */}
                    <li>
                        <select className="select" defaultValue={exportTypes[0]}>
                            {exportOptions}
                        </select>
                    </li>

                </ul>
            </div>

        </div>
    )
}
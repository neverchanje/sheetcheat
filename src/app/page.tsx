import Image from 'next/image'

export default function Home() {
  const pageSizes = [
    "Vertical, Unlimited",
    "Horizontal, Letter (US), 215.9 x 279.4 mm",
    "Horizontal, Legal (US), 215.9 x 355.6 mm",
    "Horizontal, A4, 210 x 297 mm",
    "Horizontal, A5, 148 x 210 mm"
  ];
  const pageSizeOptions = pageSizes.map((size, index) => <option key={index}>{size}</option>);

  const exportTypes = [
    "PDF",
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
          {/** Logo */}
          <li><a className="btn btn-ghost normal-case text-xl">SheetCheat</a></li>

          {/** Github Badge */}
          <li>
            <a
              href="https://github.com/neverchanje/sheetcheat"  // Replace with your GitHub repository URL
              target="_blank"  // Open the link in a new tab
              rel="noopener noreferrer"  // Recommended for security when using target="_blank"
            >
              <Image
                src="https://img.shields.io/github/stars/neverchanje/sheetcheat?style=for-the-badge&logo=github&labelColor=%230D597F&color=%230096D6"
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

          {/** Editor Page Size Dropdown */}
          <li>
            <select className="select" defaultValue={pageSizes[0]}>
              {pageSizeOptions}
            </select>
          </li>

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

interface ConfigStructure {
    pageSizes: { [key: string]: PageSize };

    defaultPageSize: string;

    projectMetadata: {
        title: string;
        githubRepo: string;
        githubRepoBadgeURL: string;
    }
}

const Config: ConfigStructure = {
    projectMetadata: {
        title: 'SheetCheat',
        githubRepo: 'https://github.com/neverchanje/sheetcheat',
        githubRepoBadgeURL: 'https://img.shields.io/github/stars/neverchanje/sheetcheat?style=for-the-badge&logo=github&labelColor=%230D597F&color=%230096D6',
    },

    pageSizes: {
        'Legal': {
            width: '216mm',
            height: '356mm',
        },
        'Letter': {
            width: '216mm',
            height: '279mm',
        },
        'A3': {
            width: '297mm',
            height: '420mm',
        },
        'A4': {
            width: '210mm',
            height: '297mm',
        },
        'A5': {
            width: '148mm',
            height: '210mm',
        },
    },

    defaultPageSize: 'A4'
}

export type PageSize = {
    width: string;
    height: string;
}

// Function to get page size based on input
export function getPageSize(pageSizeKey: string): PageSize {
    const pageSize = Config.pageSizes[pageSizeKey];

    // Check if the page size exists
    if (pageSize) {
        return pageSize;
    } else {
        throw new Error(`Page size for "${pageSizeKey}" not found.`);
    }
}

export default Config;

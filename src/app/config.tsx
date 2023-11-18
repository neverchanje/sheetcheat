export const ProjectMetadata = {
    title: 'SheetCheat',
    githubRepo: 'https://github.com/neverchanje/sheetcheat',
    githubRepoBadgeURL: 'https://img.shields.io/github/stars/neverchanje/sheetcheat?style=for-the-badge&logo=github&labelColor=%230D597F&color=%230096D6',
}

export type PageSize = {
    width: string;
    height: string;
}

export enum PageSizeType {
    Legal = 'Legal',
    Letter = 'Letter',
    A3 = 'A3',
    A4 = 'A4',
    A5 = 'A5',
}

export class PageSizeStates {
    layoutType: LayoutType;
    pageSizeType: PageSizeType;

    constructor() {
        this.layoutType = initLayoutType();
        this.pageSizeType = initPageSizeType();
    }

    saveToLocal() {
        localStorage.setItem('layoutType', this.layoutType);
        localStorage.setItem('pageSizeType', this.pageSizeType);
    }

    updatePageSizeType(t: string) {
        const newPageSizeType = toPageSizeType(t);
        this.pageSizeType = newPageSizeType;
    }

    updateLayoutType(t: string) {
        const newLayoutType = toLayoutType(t);
        this.layoutType = newLayoutType;
    }

    determinePageSize(): PageSize {
        const pageSize = pageSizeMap[this.pageSizeType];
        switch (this.layoutType) {
            case LayoutType.Portrait:
                return pageSize
            case LayoutType.Landscape:
                return { width: pageSize.height, height: pageSize.width }
        }
    }
}

export function initPageSizeType(): PageSizeType {
    const t = localStorage.getItem('pageSizeType');
    return t ? toPageSizeType(t) : defaultPageSizeType();
}

export function initLayoutType(): LayoutType {
    const t = localStorage.getItem('layoutType');
    return t ? toLayoutType(t) : defaultLayoutType();
}

const pageSizeMap: { [key in PageSizeType]: PageSize } = {
    [PageSizeType.Legal]: { width: '216mm', height: '356mm', },
    [PageSizeType.Letter]: { width: '216mm', height: '279mm', },
    [PageSizeType.A3]: { width: '297mm', height: '420mm', },
    [PageSizeType.A4]: { width: '210mm', height: '297mm', },
    [PageSizeType.A5]: { width: '148mm', height: '210mm', },
}

export function toPageSizeType(value: string): PageSizeType {
    if (Object.values(PageSizeType).map((v) => v as string).includes(value)) {
        return value as PageSizeType;
    }
    throw new Error(`Invalid PageSize: ${value}`);
}

export enum LayoutType {
    Portrait = 'Portrait',
    Landscape = 'Landscape',
}

export function toLayoutType(value: string): LayoutType {
    if (Object.values(LayoutType).map((v) => v as string).includes(value)) {
        return value as LayoutType;
    }
    throw new Error(`Invalid LayoutType: ${value}`);
}

function defaultLayoutType(): LayoutType { return LayoutType.Portrait }
function defaultPageSizeType(): PageSizeType { return PageSizeType.A4 }

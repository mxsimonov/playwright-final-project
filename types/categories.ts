export enum CategoryOptions {
    HAND_TOOLS = 'Hand Tools',
    POWER_TOOLS = 'Power Tools',
    OTHER = 'Other'
}

export enum HAND_TOOLS {
    HAMMER = 'Hammer',
    HAND_SAW = 'Hand Saw',
    WRENCH = 'Wrench',
    SCREWDRIVER = 'Screwdriver',
    PLIERS = 'Pliers',
    CHISELS = 'Chisels',
    MEASURES = 'Measures',
}

export enum POWER_TOOLS {
    GRINDER = 'Grinder',
    SANDER = 'Sander',
    SAW = 'Saw',
    DRILL = 'Drill',
}

export enum OTHER {
    TOOL_BELTS = 'Tool Belts',
    STORAGE_SOLUTIONS = 'Storage Solutions',
    WORKBENCH = 'Workbench',
    SAFETY_GEAR = 'Safety Gear',
    FASTENERS = 'Fasteners',
}

export type CategorySubOptions = HAND_TOOLS | POWER_TOOLS | OTHER;

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    brand: { id: number; name: string };
    category: { id: number; name: string; slug: string };
    in_stock: boolean;
    is_rental: boolean;
    is_location_offer: boolean;
    product_image: {
        file_name: string;
        title: string;
        by_name: string;
        source_name: string;
        source_url: string;
    };
}
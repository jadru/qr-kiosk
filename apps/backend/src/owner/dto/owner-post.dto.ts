export class PostOwnerDto {
    name: string;
    information: {
        address: string;
        openTime: string;
        phoneNumber: string;
        facilities: string;
        website: string;
        photos: string[];
        theme: 'cute' | 'modern' | 'vintage' | 'simple';
    };
    menu: [
        {
            categoryName: string;
            menus: [
                {
                    itemid: string;
                    itemname: string;
                    image: string;
                    itemprice: string;
                },
            ];
        },
    ];
}
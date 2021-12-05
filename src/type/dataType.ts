type nationType =
    "china"
    | "czech"
    | "france"
    | "germany"
    | "italy"
    | "japan"
    | "poland"
    | "sweden"
    | "uk"
    | "usa"
    | "ussr"
type typeType = "AT-SPG" | "heavyTank" | "lightTank" | "mediumTank" | "SPG"
type tierType = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
export type FilterType = 'Technique' | 'Premium' | 'Gold' | 'Provisions'

export interface UserDataType {
    id: string,
    name: string,
    wishlist: Array<string>,
    shoppingList: Array<string>,
}

export interface ProductDataType {
    id: string,
    name: string,
    description: string,
    price: {
        basic: {
            cost: string,
            currency: string,
        },
        actual: {
            cost: string,
            currency: string,
        },
    },
    images: {
        span_1x1: string,
        span_2x1: string,
    },
}

export interface TechniqueDataType extends ProductDataType {
    filter: {
        nation: nationType,
        type: typeType,
        tier: tierType,
    },
}

export interface ProductDtoType{
    type: FilterType,
    span: number,
    data: Array<TechniqueDataType & ProductDataType>
}


//D  =  ProductDtoType  ore UserDataType
export interface ResData<D> {
    resultCode: 0 | 1,
    messages: string[],
    data: D | null
}

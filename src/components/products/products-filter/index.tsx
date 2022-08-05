import { IProductCategory } from '@interfaces/product.interface';
import React, { useCallback, useMemo, useState } from 'react';
import { FilterCategory, FilterCategoryItem, ProductFilterContainer } from './style';

type Props = {
    categories: IProductCategory[]
}

const ProductsFilter: React.FC<Props> = ({categories}) => {
    const [listCategory, setListCategory] = useState<IProductCategory[]>(categories);
    const [filterCategory, setFilterCategory] = useState();

    const renderCategory = listCategory.map((category) => (<FilterCategoryItem key={category.id} className='active'>{category.name}</FilterCategoryItem>))

    return (
        <ProductFilterContainer>
            <FilterCategory className='w-full'>
                
                {
                    renderCategory
                }
            </FilterCategory>
            <div>

            </div>
        </ProductFilterContainer>
    );
};

export default ProductsFilter;
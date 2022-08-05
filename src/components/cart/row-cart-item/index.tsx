import { IItemCart } from "@interfaces/cart.interface";
import React from "react";
import Image from "next/image";
import { FormatCurrency } from "@utils/formatCurrency";
import {
  CountWrapper,
  ImageWrapper,
  InformationWrapper,
  ItemWrapper,
} from "./style";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  countTotal,
  minusItem,
  plusItem,
  removeItem,
} from "@redux/store/cart/cartSlice";
import { useEffect } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  item: IItemCart;
}

const RowCartItem: React.FC<Props> = ({ item }) => {
  const { count, id, itemDetail, totalPrice } = item;
  const [countItem, setCount] = useState(count);
  const ditpatch = useDispatch();
  // console.log(item);

  useEffect(() => {}, [count]);

  const changeCount = (type: string) => {
    if (type === "plus") {
      setCount(count + 1);
      ditpatch(
        plusItem({
          id: item.id,
        })
      );
    } else {
      setCount(count - 1);
      if (count - 1 === 0) {
        ditpatch(
          removeItem({
            id: item.id,
          })
        );
      } else {
        ditpatch(
          minusItem({
            id: item.id,
          })
        );
      }
    }
    ditpatch(countTotal());
  };

  const deleteItem = () => {
    ditpatch(
      removeItem({
        id: item.id,
      })
    );
    ditpatch(countTotal());
  };

  return (
    <ItemWrapper className="flex w-full relative">
      <ImageWrapper>
        <Image
          unoptimized
          layout="fill"
          src={`${process.env.NEXT_PUBLIC_URL_WEB}/${
            JSON.parse(itemDetail.images)[0]
          }`}
          alt={itemDetail.name}
        />
      </ImageWrapper>
      <InformationWrapper>
        <p>{itemDetail.name}</p>
        <p>Size:{itemDetail.size}</p>
        <CountWrapper>
          <div className="col-start-1">
            <span className="hidden md:inline" onClick={deleteItem}>
              <FontAwesomeIcon icon={faTrash as IconProp} />
            </span>

            <button className="px-2" onClick={() => changeCount("minus")}>
              <FontAwesomeIcon icon={faMinus as IconProp} />
            </button>
            {count}
            <button className="px-2" onClick={() => changeCount("plus")}>
              <FontAwesomeIcon icon={faPlus as IconProp} />
            </button>
          </div>
          <div className="col-start-2 flex justify-end">
            <p className="inline md:hidden">{FormatCurrency(item.totalPrice)}</p>
          </div>
        </CountWrapper>
        <span className="absolute top-0 right-0 px-2 md:hidden" onClick={deleteItem}>
          <FontAwesomeIcon icon={faTrash as IconProp} />
        </span>
      <p className="hidden md:inline absolute top-0 right-0 ">{FormatCurrency(item.totalPrice)}</p>
      </InformationWrapper>
    </ItemWrapper>
  );
};

export default RowCartItem;

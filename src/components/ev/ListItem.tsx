"use client";
import { formatPrice } from "@/scripts";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { EVDetails } from "@/types";
import { useSearchParams } from "next/navigation";
import { EV_CURRENT_STATUS } from "@/constants";

const ListItem = ({ item }: { item: EVDetails }) => {
  // Preserving filters & pagination in the URL for navigations
  const searchParams = useSearchParams();
  const queryParams = searchParams.toString();
  const detailsUrl = `/ev/${item.id}${queryParams ? `?${queryParams}` : ""}`;

  return (
    <>
      <li className="bg-white border-[1px] border-gray py-5 px-5 rounded-2xl shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100">
        <div className="relative h-64 sm:h-64 w-full">
          <Image
            src={item.images[0]}
            alt="EV Image"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
        <div className="py-2 flex justify-between">
          <p className="font-bold text-lg">
            {item.brand} - {item.model}
          </p>
          <div
            className={`rounded-lg self-center text-sm px-2 ${
              item.condition === EV_CURRENT_STATUS.USED ? "used-condition" : "new-condition"
            }`}
          >
            {item.condition}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-slate-500">
          <div className="flex gap-1 text-slate-900">
            <p>{item.year} </p>•
            <p>{item.seats} Seater</p>•
            <p>{item.color} </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-xl text-black">
              {formatPrice(item.price)}
            </p>
            <button className="rounded-xl border-[1px]  text-small text-slate-900 px-2">
              <Link href={detailsUrl}>Details</Link>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default ListItem;

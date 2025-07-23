import React from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import Navbar from "@/components/Navbar";
import { getEvById } from "@/mock/getEvData";
import { formatPrice } from "@/scripts";
import EVSpecifications from "@/components/ev/EvSpecifications";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EvDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const ev = await getEvById(id);

  return (
    <>
      <Navbar />
      <div className=" mt-6 max-w-5xl mx-auto p-6 border-2 rounded-lg border-solid border-slate-400">
        {/* EV images Section */}
        <ImageGallery images={ev.images} />
        {/* EV Details Section */}
        <div className="mt-6 grid gap-4">
          <div className="flex w-full items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                {ev.brand} {ev.model} ({ev.year})
              </h2>
              <p className="text-xl font-medium text-gray-500">
                {ev.location}
              </p>
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {formatPrice(ev.price, 'USD')}
            </p>
          </div>

          <EVSpecifications ev={ev} />
        </div>
      </div>
    </>
  );
};

export default EvDetailsPage;

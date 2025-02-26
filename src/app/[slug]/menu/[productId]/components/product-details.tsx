"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-col h-full overflow-hidden rounded-t-3xl p-5">
      <div id="Problema" className="flex flex-col flex-grow overflow-hidden pb-8">
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
        </div>

        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{formatCurrency(product.price)}</h3>
          <div className="flex items-center gap-3 text-center">
            <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
              <MinusIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-grow mt-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          {product.ingredients.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </ScrollArea>
      </div>

      <Button className="w-[85%] rounded-full absolute bottom-2 self-center">Adicionar à sacola</Button>
    </div>
  );
};


export default ProductDetails;
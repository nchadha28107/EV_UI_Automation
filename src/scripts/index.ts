export const formatPrice = (price:number, curreny?:string) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: curreny || 'EUR',
    }).format(price);
  };
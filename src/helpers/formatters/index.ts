const formatPriceToSave = (value: number) => {
  return Number(value.toString().replace(/\B(?=(\d{2})+(?!\d))/g, "."));
}

export { 
  formatPriceToSave
}
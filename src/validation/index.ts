// ** productObj === validationObj (TITLE, DESCRIPTION, IMAGE, PRICE)
export interface IError {
    title: string, 
    description: string,
    imageURL: string,
    price: string,
}
export const porductValidation = (product:IError) => {
    // ** return an obj
    const errors:IError = {
      title: "",
      description: "",
      imageURL: "",
      price: "",
    }
    const rgexUrl = /^(?:https?|ftp):\/\/[^\s]+?\.(?:jpg|jpeg|png|gif|bmp|tiff|webp)$/i.test(product.imageURL);


    if (!product.title.trim() ||  product.title.length > 80 || product.title.length < 10 ) {
        errors.title = "Product title must be between 10 and 80 characters!";
    }
    if (!product.description.trim() ||  product.title.length > 900 || product.description.length < 10 ) {
        errors.description = "Product descrption must be between 10 and 900 characters!";
    }
    if (!product.price.trim() || isNaN(Number(product.price)) ) {
        errors.price = "Product title must be between 10 and 10 characters!";
    }
    if (!product.imageURL.trim() ||  !rgexUrl) {
        errors.imageURL = "Product title must be number between 10 and 10 characters!";
    }
    return errors;
}
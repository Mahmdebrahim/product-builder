import {
  productList,
  formInputsList,
  colors,
  categories,
} from "./components/Data";
import type { IProduct } from "./components/Interfaces";
import ProductCard from "./components/ProductCard";
import Button from "./components/Ui/Button";
import Input from "./components/Ui/Input";
import Modal from "./components/Ui/Model";
// import SelectMenu from "./components/Ui/SelectMenu"
import { useState, type ChangeEvent, type FormEvent } from "react";
import { porductValidation } from "./validation";
import ErrorMsg from "./components/ErrorMsg";
import CircleColors from "./components/CircleColors";
import { v4 as uuid } from "uuid";
import SelectedMenu from "./components/Ui/SelectMenu";
import type { ProductNameTypes } from "./components/Types";

const App = () => {
  //* _________DRY__________ *\\
  ///////////////////////////////////////////////////////
  const DefaultPtoductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  //* ________STATE_________ *\\
  ///////////////////////////////////////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [productsList, setProductsList] = useState<IProduct[]>(productList);
  const [tempColor, setempColor] = useState<string[]>([]);
  const [selectedCate, setSelectedCate] = useState(categories[0]);
  const [productInform, setProductInform] =
    useState<IProduct>(DefaultPtoductObj);
  const [productEdited, setProductEdited] =
    useState<IProduct>(DefaultPtoductObj);
  const [productEditedIdx, setproductEditedIdx] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  // console.log(productEdited)
  // console.log(categories)
  // console.log("err:", errorMsg)
  //* ________HANDLER_________ *\\
  ///////////////////////////////////////////////////////
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  //////
  const openEditModal = () => setIsOpenEditModal(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  //////
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // to assign the value when onChage to the name
    const { value, name } = e.target;
    setProductInform({
      ...productInform,
      [name]: value,
    });
    // to remove errorMsg from form in onChange value
    setErrorMsg({
      ...errorMsg,
      [name]: "",
    });
  };
  const changeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // to assign the value when onChage to the name
    const { value, name } = e.target;
    setProductEdited({
      ...productEdited,
      [name]: value,
    });
    // to remove errorMsg from form in onChange value
    setErrorMsg({
      ...errorMsg,
      [name]: "",
    });
  };
  //////
  const onCancel = () => {
    console.log("cansle");
    setProductInform(DefaultPtoductObj);
    close();
  };
  //////
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = porductValidation({
      title: productInform.title,
      description: productInform.description,
      imageURL: productInform.imageURL,
      price: productInform.price,
    });
    const errorMsg = Object.values(errors).some((val) => val !== "");
    if (errorMsg) {
      setErrorMsg(errors);
      return;
    }
    setProductsList((prev) => [
      {
        ...productInform,
        id: uuid(),
        colors: tempColor,
        category: selectedCate,
      },
      ...prev,
    ]);
    setProductInform(DefaultPtoductObj);
    setempColor([]);
    close();
    console.log(productsList);
  };
  const submitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const errors = porductValidation({
      title: productEdited.title,
      description: productEdited.description,
      imageURL: productEdited.imageURL,
      price: productEdited.price,
    });
    const errorMsg = Object.values(errors).some((val) => val !== "");
    if (errorMsg) {
      setErrorMsg(errors);
      return;
    }
    const updatedProducts = [...productList]
    updatedProducts[productEditedIdx] = productEdited
    setProductsList(updatedProducts) 
    setProductEdited(DefaultPtoductObj);
    setempColor([]);
    closeEditModal();
    console.log(productsList);
  };

  //* ________RENDER_________ *\\
  ///////////////////////////////////////////////////////
  const products = productsList.map((product,idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductEdited={setProductEdited}
      openEditModal={openEditModal}
      index={idx}
      setproductEditedIdx={setproductEditedIdx}
    />
  ));
  const Inputs = formInputsList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        htmlFor={input.id}
        className="mb-1 text-sm font-medium  text-indigo-80"
      >
        {input.label}
      </label>
      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={productInform[input.name]}
        onChange={changeHandler}
      />
      <ErrorMsg msg={errorMsg[input.name]} />
    </div>
  ));
  const renderProductEditModal = (id:string, label:string, name: ProductNameTypes, ) => {
     return(
        <div className="flex flex-col">
            <label
              htmlFor={id}
              className="mb-1 text-sm font-medium  text-indigo-80"
            >
              {label}
            </label>
            <Input
              type={"text"}
              name={name}
              id={id}
              value={productEdited[name]}
              onChange={changeEditHandler}
            />
            <ErrorMsg msg={errorMsg[name]} />
          </div>
     )
  }
  const circleColorsList = colors.map((color) => (
    <CircleColors
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setempColor(tempColor.filter((col) => col !== color));
          return;
        }
        setempColor((prev) => [...prev, color]);
      }}
    />
  ));
  ///////////////////////////////////////////////////////////////////////////
  //! START POINT !\\
  return (
    <main className=" container mx-auto px-4 py-4">
      <Button
        className="bg-indigo-800 p-2 block mx-auto font-medium hover:bg-indigo-700 cursor-pointer transition duration-300 ease-in-out "
        width="w-fit"
        onClick={open}
      >
        build product
      </Button>

      <Modal close={close} isOpen={isOpen} title="ADD A NEW PRODUCT">
        <form className="flex flex-col gap-3 " onSubmit={submitHandler}>
          {Inputs}
          <SelectedMenu selected={selectedCate} setSelected={setSelectedCate} />
          <div className="flex items-center my-1 flex-wrap">
            {tempColor.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mp-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 my-2">{circleColorsList}</div>
          <div className="flex flex-co gap-4 items-center">
            <Button className="bg-indigo-800 " onClick={() => {}}>
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-600         duration-300 ease-out "
              onClick={onCancel}
            >
              Cansle
            </Button>
          </div>
        </form>
      </Modal>

      {/*  EDIT MODAL */}

      <Modal
        close={closeEditModal}
        isOpen={isOpenEditModal}
        title="EDIT THE PRODUCT"
      >
        <form className="flex flex-col gap-3 " onSubmit={submitEditHandler}>
         {renderProductEditModal("title", "Product title", "title")}
         {renderProductEditModal("description", "Product Descriotion", "description")}
         {renderProductEditModal("price", "Product Price", "price")} 
         {renderProductEditModal("imageURL", "Product ImageURL", "imageURL")}
          <SelectedMenu selected={selectedCate} setSelected={setSelectedCate} />
          <div className="flex items-center my-1 flex-wrap">
            {productEdited.colors.map((color) => (
              <span
                key={color}
                className="p-1 mr-1 mp-1 text-sm rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 my-2">{circleColorsList}</div>
          <div className="flex flex-co gap-4 items-center">
            <Button className="bg-indigo-800 " onClick={() => {}}>
              Submit
            </Button>
            <Button
              className="bg-gray-400 hover:bg-gray-600         duration-300 ease-out "
              onClick={closeEditModal}
            >
              Cansle
            </Button>
          </div>
        </form>
      </Modal>

      <div className=" p-2 m-5 grid grid-cols-1  sm:grid-cols-2       md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products}
      </div>
    </main>
  );
};
export default App;


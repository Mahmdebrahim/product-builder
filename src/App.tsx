import ProductCard from "./components/ProductCard"

const App = () => {
    return (
       <main className="container mx-auto">
          <div className=" p-2 m-5 grid grid-cols-1  sm:grid-cols-2       md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
       </main>
    )
}
export default App
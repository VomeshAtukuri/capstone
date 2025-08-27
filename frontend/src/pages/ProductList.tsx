import { Link } from "react-router";

const mockProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
    { id: 5, name: "Product 5" },
]
export default function ProductList() {
    return(
        <div>
            <h2>Product List</h2>
            <ul>
                {mockProducts.map((product) => (
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                ))}
            </ul>
        </div>
    );
}
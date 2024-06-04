import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import ProductList from "../data/ProductList";
import CurrentUser from "../data/CurrentUser";
import ProductCounter from "../components/ProductCounter";
import './../App.css';

export default function Cart() {
    // Cart array containing products with quantity > 0
    const [cart, setCart] = useState(ProductList.filter((product) => product.quantity > 0));
    // Total for setting total cost state
    var initialTotal = 0;
    // Navigation object
    const navigate = useNavigate();

    // Initialize total cost
    cart.map((product) => {
        initialTotal += product.quantity * product.price;
    })
    const [total, setTotal] = useState(initialTotal);

    // Remove product from cart
    const removeFromCart = (product) => {
        setTotal(total - (product.quantity * product.price));
        cart.splice(cart.indexOf(product), 1);
        setCart([...cart]);
        product.removeFromCart();
    }

    // Clear cart and navigate to "done" page
    const finalizePurchase = () => {
        cart.map((product) => {
            product.removeFromCart();
        })
        navigate("/done/purchase");
    }

    // Set total cost state (to be passed to counter component)
    const changeTotalCost = (costChange) => {
        setTotal(total + costChange);
    }

    return (
        <div className="page-content">
            <h1>Cart</h1>

            {CurrentUser.getStatus() ?
                // If user logged in, display table of cart products and purchase button
                total > 0 ?
                    // If total cost is greater than 0, display cart items
                    <>
                        <Table bordered>
                            {cart.map((product) => {
                                if (product.quantity > 0) {
                                    const subtotal = product.quantity * product.price;
                                    initialTotal += subtotal;
                
                                    return (
                                        <tr key={product.id}>
                                            <td>
                                                <h2>{product.name}</h2>
                                            </td>
                                            <td>
                                                <p>${Number(subtotal).toFixed(2)}</p>
                                            </td>
                                            <td>
                                                <ProductCounter product={product} setter={changeTotalCost} />
                                            </td>
                                            <td>
                                                <Button className="remove-product" onClick={() => removeFromCart(product)}>&times;</Button>
                                            </td> 
                                        </tr>
                                    );
                                }
                            })}  
                        </Table>
                        
                        <p className="product-price">
                            Total: ${Math.abs(Number(total).toFixed(2))}
                        </p>
                        
                        <div className="shipping-info">
                            <p>To be delivered to:</p>
                            <p>{CurrentUser.address}, {CurrentUser.city}, {CurrentUser.province}</p>
                            <Button onClick={() => navigate("/account")}>Change</Button>
                        </div>

                        <Button onClick={finalizePurchase}>Finalize purchase</Button>
                    </>
                    :
                    // If total cost 0, display empty cart message
                    <>
                        <div className="shipping-info">
                            <p>To be delivered to:</p>
                            <p>{CurrentUser.address}, {CurrentUser.city}, {CurrentUser.province}</p>
                            <Button onClick={() => navigate("/account")}>Change</Button>
                        </div>
                        <p>Your cart is currently empty.</p>
                    </>  
                :
                <p>Please log in to access your cart.</p>
            }
        </div>
    );
}
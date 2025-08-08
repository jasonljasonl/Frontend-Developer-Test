import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { FaCartPlus } from 'react-icons/fa';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./customcss.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CustomProductUI = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    const variants = [
      { id: 1, name: "Rouge", in_stock: true },
      { id: 2, name: "Bleu", in_stock: false },
      { id: 3, name: "Vert", in_stock: true },
    ];
    return (
      <>
        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-3 col-sm-6 col-xs-8 col-12 mb-4 customProductDiv"
            >
              <div className="CustomCard text-center h-100" key={product.id}>
                <Link to={"/product/" + product.id}>
                  <img
                    className="customCardImg"
                    src={product.image}
                    alt="Card"
                    height={300}
                  />
                  <div className="customCardBody">
                    <h5 className="card-title customCardTitle">
                      {product.title.substring(0, 24)}...
                    </h5>
                    <li className="list-group-item lead customCardPrice">
                      $ {product.price}
                    </li>
                  </div>
                </Link>

                <div className="card-body">
                  <div className="CustomProduct-variant-selector">
                    <select id={`product-color-select-${product.id}`} name="product-color">
                      <option value="">Choose a variant</option>
                      {variants.map((variant) => (
                        <option
                          key={variant.id}
                          value={variant.id}
                          disabled={!variant.in_stock}
                        >
                          {variant.name} {!variant.in_stock && "(Out of Stock)"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="customCardButton"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >

                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default CustomProductUI;
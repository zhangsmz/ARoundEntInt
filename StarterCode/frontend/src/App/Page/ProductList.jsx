import { useState, useEffect } from "react";
import "./productList.css";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [severity,setSeverity]=useState("success")
  const [open, setOpen] = useState(false);
  const [message,setMessage]=useState("")
  //implement the get products function
  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products").then((res)=>{
      if(res.data.status){
        setProducts(res.data.data)
      }
    })
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`).then((res)=>{
      if(res.data.status){
        setSeverity("success");
        setMessage(res.data.message)
        fetchProducts()
      }else{
        setSeverity("error")
        setMessage(res.data.message)
      }
        setOpen(true);
    })
  };
  const handleClose=()=>{
    setOpen(false)
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Container className="product-list">
      {products.map((item) => {
        return (
          <div className="product-item" key={item.id}>
            <div className="product-image">
              <img src={item.imageUrl} alt="" />
              <DeleteIcon
                className="delete-icon"
                onClick={() => handleDelete(item.id)}
                sx={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div className="product-info">
              <div className="product-name">{item.name}</div>
              <div className="product-price">${item.price}</div>
              <div className="product-desc">{item.description}</div>
            </div>
          </div>
        );
      })}
      <Snackbar
        anchorOrigin={{ vertical:'top',horizontal:'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList;

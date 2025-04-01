import express, { Request, Response } from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 5000;

const corsOptions = {
    origin: "http://localhost:21175", // Replace with your frontend's URL
    credentials: true,               // Allow credentials (cookies, auth headers)
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Path to the JSON file
const dataFilePath = path.resolve(__dirname, "mock/profile.json");
const cartFilePath = path.resolve(__dirname, "mock/cart.json");
const orderFilePath = path.resolve(__dirname, "mock/order.json");
const productFilePath = path.resolve(__dirname, "mockData/product.json");

// API to read data from the JSON file
app.get("/read-data", (req: Request, res: Response) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }
        res.json(JSON.parse(data || "[]")); // Return an empty array if file is empty
    });
});

// API to write data to the JSON file
app.post("/saveuserOld", (req: Request, res: Response) => {
    const newData = req.body;

    // Read existing data
    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).send("Error reading file");
        }

        // Parse existing data and add new data
        let jsonData: any[] = [];
        if (fileData) {
            jsonData = JSON.parse(fileData);
        }
        jsonData.push(newData);

        // Write updated data back to the file
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                return res.status(500).send("Error writing file");
            }
            res.send("Data written successfully");
        });
    });
});

app.post("/saveuser", (req: Request, res: Response) => {
    const { name, mailid, mobile, address } = req.body;

    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Check if mobile number already exists
        
        // if (jsonData.some(user => user.mobile === mobile)) {
        //     return res.status(200).json({ message: "User already exists" });
        // }

        const existingUser = jsonData.find(user => user.mobile === mobile);
        if (existingUser) {
            return res.json({
                message: "User already exists",
                user: existingUser // Return existing user details for context
            });
        }

        // Generate new ID
        const newId = jsonData.length ? Math.max(...jsonData.map(user => user.id)) + 1 : 1;

        const newUserData = {
            id: newId,
            name,
            mailid,
            mobile,
            address: address.map((addr: any, index: number) => ({
                id: index + 1,
                address: {
                    name:name,
                    street: addr.street,
                    area: addr.area,
                    addressType: addr.addressType
                }
            }))
        };

        jsonData.push(newUserData);
        const existingUserFromProfile = jsonData.find(user => user.mobile === mobile);

        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            res.json({ message: "User added successfully",user:existingUserFromProfile });
        });
    });
});

app.post("/login", (req: Request, res: Response) => {
    const { mobile } = req.body;
    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }
        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        const existingUser = jsonData.find(user => user.mobile === mobile);
        if (existingUser) {
            return res.json({
                status:"success",
                user: existingUser // Return existing user details for context
            });
        }else{
            return res.json({
                status:"new",
                user: [] // Return existing user details for context
            });
        }
    });
});

app.post("/addcartold", (req: Request, res: Response) => {
    const { mobile, item } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Find if the user already exists based on mobile
        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if (existingUserIndex !== -1) {
            // Update the existing user's item
            //jsonData[existingUserIndex].product = item;
                        // Update the existing user's items
                       // item.forEach((newItem: any) => {
                            console.log("newItem",item);
                            const existingItemIndex = jsonData[existingUserIndex].product.findIndex(
                                (product: any) => {
                                    console.log("product",product);
                                    return product.product.code === item.product.code
                                }
                            );
                            console.log("existingItemIndex",existingItemIndex);
            
                            if (existingItemIndex !== -1) {
                                // Increment quantity if the item already exists
                                console.log("incerment",jsonData[existingUserIndex]);
                                jsonData[existingUserIndex].product[existingItemIndex].quantity += item.quantity;
                            } else {
                                // Add the new item to the product array
                                jsonData[existingUserIndex].product.push(item);
                            }
                       // });

            // Write updated data back to the file
            fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ message: "Error writing file" });
                }
                return res.json({ message: "Item updated successfully" });
            });
        } else {
            // Generate new ID
            const newId = jsonData.length ? Math.max(...jsonData.map(user => user.id)) + 1 : 1;

            const newUserData = {
                id: newId,
                mobile: mobile,
                product: item
            };

            jsonData.push(newUserData);

            // Write new data to the file
            fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ message: "Error writing file" });
                }
                return res.json({ message: "Item added successfully" });
            });
        }
    });
});


app.post("/updatefee", (req: Request, res: Response) => {
    const {mobile, handlingfee, deliveryfee, productTotalAmount, payableAmount } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) =>{
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if(existingUserIndex !== -1) {
            jsonData[existingUserIndex].handlingfee = handlingfee;
            jsonData[existingUserIndex].deliveryfee = deliveryfee;
            jsonData[existingUserIndex].productTotalAmount = productTotalAmount;
            jsonData[existingUserIndex].payableAmount = payableAmount;
            jsonData[existingUserIndex].paymentMode = 'online';
        }

        fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            return res.json({ message: "Item processed successfully" });
        });

    })
});

app.post("/updateaddress", (req: Request, res: Response) => {
    const {mobile, address } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) =>{
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if(existingUserIndex !== -1) {
            jsonData[existingUserIndex].shippingAddress = address; 
        }

        fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            return res.json({ message: "Item processed successfully" });
        });

    })
});

// app.post("/updatePaymentMode", (req: Request, res: Response) => {
//     const {mobile, mode } = req.body;
    
//     fs.readFile(cartFilePath, "utf8", (err, fileData) =>{
//         if (err) {
//             return res.status(500).json({ message: "Error reading file" });
//         }

//         let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

//         const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

//         if(existingUserIndex !== -1) {
//             jsonData[existingUserIndex].paymentMode = mode; 
//         }

//         fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
//             if (writeErr) {
//                 return res.status(500).json({ message: "Error writing file" });
//             }
//             return res.json({ message: "Item processed successfully" });
//         });

//     })
// });


app.post("/addcart", (req: Request, res: Response) => {
    const { mobile, item } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Find if the user already exists based on mobile
        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if (existingUserIndex !== -1) {
            const user = jsonData[existingUserIndex];
            const existingItemIndex = user.product.findIndex(
                (product: any) => product.product.code === item.product.code
            );

            if (existingItemIndex !== -1) {
                // Increment quantity if the item already exists
                user.product[existingItemIndex].quantity += 1;
            } else {
                // Add the new item to the product array
                user.product.push(item);
            }
        } else {
            // Generate new ID and add a new user
            const newId = jsonData.length ? Math.max(...jsonData.map(user => user.id)) + 1 : 1;

            const newUserData = {
                id: newId,
                mobile: mobile,
                product: [item], // Add the item in an array
            };

            jsonData.push(newUserData);
        }

        // Write updated data back to the file
        fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            return res.json({ message: "Item processed successfully" });
        });
    });
});


app.post("/removecartold", (req: Request, res: Response) => {
    const { mobile, item } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Find if the user already exists based on mobile
        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if (existingUserIndex !== -1) {
            const user = jsonData[existingUserIndex];
            const existingItemIndex = user.product.findIndex(
                (product: any) => product.product.code === item.product.code
            );

            if (existingItemIndex !== -1) {
                // Increment quantity if the item already exists
                user.product[existingItemIndex].quantity -= 1;
            } else {
                // Add the new item to the product array
                //user.product.push(item);
            }
        } else {
            // Generate new ID and add a new user
            // const newId = jsonData.length ? Math.max(...jsonData.map(user => user.id)) + 1 : 1;

            // const newUserData = {
            //     id: newId,
            //     mobile: mobile,
            //     product: [item], // Add the item in an array
            // };

            // jsonData.push(newUserData);
        }

        // Write updated data back to the file
        fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            return res.json({ message: "Item processed successfully" });
        });
    });
});
app.post("/removecart", (req: Request, res: Response) => {
    const { mobile, item } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Find if the user already exists based on mobile
        const existingUserIndex = jsonData.findIndex(user => user.mobile === mobile);

        if (existingUserIndex !== -1) {
            const user = jsonData[existingUserIndex];
            const existingItemIndex = user.product.findIndex(
                (product: any) => product.product.code === item.product.code
            );

            if (existingItemIndex !== -1) {
                // Decrement quantity if the item already exists
                user.product[existingItemIndex].quantity -= 1;

                // Remove the item if the quantity is zero
                if (user.product[existingItemIndex].quantity <= 0) {
                    user.product.splice(existingItemIndex, 1);
                }
            }
        }

        // Write updated data back to the file
        fs.writeFile(cartFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Error writing file" });
            }
            return res.json({ message: "Item processed successfully" });
        });
    });
});

app.post("/getcart", (req: Request, res: Response) => {
    const { mobile } = req.body;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        // console.log("jsondata",jsonData);
        // Find if the user already exists based on mobile
        if(jsonData.length>0){
            const existingUser:any = jsonData.find(user => user.mobile === mobile);
            // console.log("existingUser",existingUser);
            // console.log("existingUser?.length",existingUser?.length);
            if(existingUser === undefined){
                return res.json({ message: "Cart Empty", cartitems:[] });
            }
            else if(existingUser != null){
                return res.json({ message: "Cart Item Exist", cartitems:existingUser });
            }else{
                return res.json({ message: "Cart Empty", cartitems:[] });
            }
        }else{
            return res.json({ message: "Cart Empty", cartitems:[] });
        }
    });
});

app.post("/placeOrder",(req: Request, res: Response) => {
    const { mobile,transactionId,amount,date } = req.body;
    const today = new Date();
const orderID = `${today.getDate().toString().padStart(2, "0")}${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}${today.getFullYear()}${today.getHours().toString().padStart(2, "0")}${today.getMinutes().toString().padStart(2, "0")}${today.getSeconds().toString().padStart(2, "0")}${today.getMilliseconds()
  .toString()
  .padStart(3, "0")}`;

    fs.readFile(cartFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading Cart file" });
        }

        let cartjsondata: any[] = fileData ? JSON.parse(fileData) : [];

        // Find if the user already exists based on mobile
        const userCartData = cartjsondata.find(user => user.mobile === mobile);

        if(!userCartData || userCartData.product.length === 0){
            return res.json({ message: "Cart is empty" });
        }

        const newOrderData = {
            orderID: orderID,
            mobile: mobile,
            transactionId:transactionId,
            transactionDate:date,
            transAmount:amount,
            product: userCartData.product,
            handlingfee: userCartData.handlingfee,
            deliveryfee: userCartData.deliveryfee,
            productTotalAmount: userCartData.productTotalAmount,
            payableAmount: userCartData.payableAmount,
            shippingAddress: userCartData.shippingAddress,
            paymentMode: userCartData.paymentMode
        };

        fs.readFile(orderFilePath, "utf8", (err, fileData) => {
            if (err) {
                return res.status(500).json({ message: "Error reading order file" });
            }

            let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
            jsonData.push(newOrderData);

            // Write new data to the file
            fs.writeFile(orderFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json({ message: "Error writing file" });
                }

                // Clear the cart
                const updatedCartData = cartjsondata.filter(user => user.mobile !== mobile);
                // const updatedCartData = cartjsondata.map(user => {
                //     if (user.mobile === mobile) {
                //         return { ...user, product: [] }; // Clear only the product property
                //     }
                //     return user;
                // });
                fs.writeFile(cartFilePath, JSON.stringify(updatedCartData, null, 4), (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ message: "Error writing file" });
                    }
                }
                );
               
                return res.status(200).json({ message: "Order placed successfully" });
            });
        });
       

    }
    );
});

app.post("/getOrderold", (req: Request, res: Response) => {
    const { mobile } = req.body;

    fs.readFile(orderFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        // console.log("jsondata",jsonData);
        // Find if the user already exists based on mobile
        if(jsonData.length>0){
            const existingOrder:any[] = jsonData.find(user => user.mobile === mobile);
            console.log("existingOrder",existingOrder);
            console.log("existingOrder?.length",existingOrder?.length);
            if(existingOrder === undefined){
                return res.status(300).json({ message: "Order Empty", orderitems:[] });
            }
            else if(existingOrder != null){
                const latestOrder = existingOrder.sort((a, b) => b.orderID.localeCompare(a.orderID))[0];
            console.log("latestOrder", latestOrder);
                return res.status(200).json({ message: "Order Item Exist", orderitems:latestOrder });
            }else{
                return res.status(300).json({ message: "Order Empty", orderitems:[] });
            }
        }else{
            return res.status(300).json({ message: "Order Empty", orderitems:[] });
        }
    });
});

app.post("/getOrderold2", (req: Request, res: Response) => {
    const { mobile } = req.body;

    fs.readFile(orderFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        // console.log("jsondata", jsonData);

        if (jsonData.length > 0) {
            // Retrieve all orders for the given mobile number
            const userOrders = jsonData.filter(order => order.mobile === mobile);
            console.log("userOrders", userOrders);

            if (userOrders.length === 0) {
                return res.status(300).json({ message: "Order Empty", orderitems: [] });
            }

            // Sort orders by orderId to get the latest order
            const latestOrder = userOrders.sort((a, b) => b.orderID.localeCompare(a.orderID))[0];
            console.log("latestOrder", latestOrder);

            return res.status(200).json({ message: "Order Item Exist", orderitems: latestOrder });
        } else {
            return res.status(300).json({ message: "Order Empty", orderitems: [] });
        }
    });
});

app.post("/getOrder", (req: Request, res: Response) => {
    const { mobile } = req.body;

    fs.readFile(orderFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        if (jsonData.length > 0) {
            // Retrieve all orders for the given mobile number
            const userOrders = jsonData
                .filter(order => order.mobile === mobile)
                .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

            if (userOrders.length === 0) {
                return res.status(300).json({ message: "Order Empty", orderitems: [] });
            }

            return res.status(200).json({ message: "Order Items Exist", orderitems: userOrders });
        } else {
            return res.status(300).json({ message: "Order Empty", orderitems: [] });
        }
    });
});


app.post("/addAddress", (req: Request, res: Response): void => {
    const { mobile, address } = req.body;

    if (!mobile || !address) {
        res.status(400).json({ message: "Mobile number and address are required" });
        return;
    }

    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).json({ message: "Error reading file" });
            return;
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        const existingUser = jsonData.find(user => user.mobile === mobile);
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Generate a new address ID
        const newAddressId = existingUser.address.length
            ? Math.max(...existingUser.address.map((addr: any) => addr.id)) + 1
            : 1;

        // Add the new address in the correct format
        existingUser.address.push({
            id: newAddressId,
            address: {
                name: address.fullName,
                street: address.addressLine1,
                area: address.addressLine2,
                addressType: address.addressType
            }
        });

        // Write back to the file
        fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 4), (writeErr) => {
            if (writeErr) {
                console.error("Error writing file:", writeErr);
                res.status(500).json({ message: "Error writing file" });
                return;
            }
            res.json({ message: "Address added successfully", user: existingUser });
        });
    });
});


app.get("/getAddress", (req: Request, res: Response): void => {
    const { mobile } = req.query; // Get mobile from query params

    if (!mobile) {
        res.status(400).json({ message: "Mobile number is required" });
        return;
    }

    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).json({ message: "Error reading file" });
            return;
        }

        const jsonData: any[] = fileData ? JSON.parse(fileData) : [];

        // Find the user by mobile number
        const existingUser = jsonData.find(user => user.mobile === mobile);

        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({
            name: existingUser.name,
            addresses: existingUser.address, // Return only the address list
        });
    });
});

app.post("/getAddressForCart", (req: Request, res: Response): void => {
    let { mobile } = req.body;

    if (!mobile) {
        res.status(400).json({ error: "Mobile number is required" });
        return;
    }

    fs.readFile(dataFilePath, "utf8", (err, fileData) => {
        if (err) {
            console.error("Error reading file:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        try {
            const jsonData = fileData ? JSON.parse(fileData) : [];
            
            const existingUser = jsonData.find((user: { mobile: { toString: () => string; }; }) => 
                user.mobile && user.mobile.toString().trim() === mobile
            );

            if (!existingUser) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            if (!existingUser.address || !Array.isArray(existingUser.address)) {
                res.status(404).json({ error: "No addresses found" });
                return;
            }

            // Transform address data to match frontend expectations
            const addresses = existingUser.address.map((addr: { id: number; }) => ({
                ...addr,
                preference: addr.id === 1 ? 'primary' : 'secondary' // Assuming first address is primary
            }));

            res.json({
                success: true,
                addresses: addresses,
                name: existingUser.name
            });

        } catch (parseError) {
            console.error("Error:", parseError);
            res.status(500).json({ error: "Invalid data format" });
        }
    });
});

app.post("/getProductByHcode", (req: Request, res: Response) => {
    const { code } = req.body;

    fs.readFile(productFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        // console.log("jsondata",jsonData);
        // Find if the user already exists based on mobile
        if(jsonData.length>0){
            const product:any = jsonData.find(prod => prod.hcategory === code);
            console.log("product",product);
            console.log("product?.length",product?.data?.length);
            if(product === undefined){
                return res.json({ message: "No Product Available", productlist:[] });
            }
            else if(product != null){
                return res.json({ message: "success", productlist:product });
            }else{
                return res.json({ message: "No Product Available", productlist:[] });
            }
        }else{
            return res.json({ message: "No Product Available", productlist:[] });
        }
    });
});

app.post("/getProductBySearchQuery", (req: Request, res: Response) => {
    const { code } = req.body;

    fs.readFile(productFilePath, "utf8", (err, fileData) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }

        let jsonData: any[] = fileData ? JSON.parse(fileData) : [];
        let filteredData: any[] = [];

        // If code is null, undefined, or empty, return all products
        const isCodeEmpty = !code || code.trim() === "";

        if (jsonData.length > 0) {
            jsonData.forEach((prod: any) => {
                if (prod.data && Array.isArray(prod.data)) {
                    const matchedProducts = isCodeEmpty
                        ? prod.data // Return all products
                        : prod.data.filter((item: any) =>
                            item.name.toLowerCase().includes(code.toLowerCase())
                        );
                    filteredData.push(...matchedProducts);
                }
            });
        }

        return res.json({
            message: filteredData.length > 0 ? "success" : "No Product Available",
            productlist: filteredData
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
